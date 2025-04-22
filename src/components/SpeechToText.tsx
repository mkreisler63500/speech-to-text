import React, { useState, useEffect, useRef } from 'react';

export function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState('en-US');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('SpeechRecognition wird von diesem Browser nicht unterstützt.');
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;
  
    recognition.onresult = (event) => {
        console.log('onresult ausgelöst:', event);
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          console.log(`Zwischenergebnis [${i}]:`, event.results[i][0].transcript);
          finalTranscript += event.results[i][0].transcript;
        }
        console.log('Finales Transkript:', finalTranscript);
        setTranscript(finalTranscript);
      };
  
    recognition.onerror = (event) => {
      console.error('Spracherkennungsfehler:', event.error);
    };
  
    recognition.onstart = () => {
      console.log('Spracherkennung gestartet');
    };
  
    recognition.onend = () => {
      console.log('Spracherkennung beendet');
    };
  
    recognitionRef.current = recognition;
  
    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, [lang]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript('');
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">🎤 Spracheingabe (Web Speech API)</h2>

      <div className="mb-4">
        <label htmlFor="language-select" className="block text-sm font-medium mb-1">
          Sprache wählen:
        </label>
        <select
          id="language-select"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="tr-TR">Türkisch</option>
          <option value="en-US">Englisch</option>
          <option value="fr-FR">Französisch</option>
          <option value="ro-RO">Rumänisch</option>
          <option value="bg-BG">Bulgarisch</option>
          <option value="pt-PT">Portugiesisch (EU)</option>
          <option value="pt-BR">Portugiesisch (BR)</option>
          <option value="el-GR">Griechisch</option>
          <option value="ar-SA">Arabisch</option>
        </select>
      </div>

      <button
        onClick={toggleListening}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isListening ? '⏹️ Stoppen' : '🎙️ Starten'}
      </button>

      <div className="mt-4">
        <label htmlFor="transcript-output" className="block text-sm font-medium mb-1">
          Erkannt:
        </label>
        <div
          id="transcript-output"
          className="p-3 border rounded bg-gray-50 min-h-[100px] whitespace-pre-wrap"
        >
          {transcript || '...'}
        </div>
      </div>
    </div>
  );
}

export default SpeechToText;
