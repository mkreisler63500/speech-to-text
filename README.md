# SpeechToText React Application

This is a simple React application that allows speech recognition in several languages. The application is structured with TypeScript and consists of the following main files:

## Project Structure

```
speech-to-text
├── src
│   ├── App.tsx
│   ├── index.tsx
│   └── components
│       └── HelloWorld.tsx
├── public
│   ├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Description of Files

- **src/App.tsx**: The main component of the application that imports and renders the `SpeechToText` component.
- **src/index.tsx**: The entry point of the application that renders the `App` component into the DOM.
- **src/components/SpeechToText.tsx**: Exports the `SpeechToText` component, which allows to select languages and starts/stops speech recognition 
- **public/index.html**: The HTML document that hosts the React application, containing a `div` with the ID `root` for rendering.
- **tsconfig.json**: TypeScript configuration file that specifies compiler options and files to include in the compilation.
- **package.json**: npm configuration file that lists dependencies and scripts for the project.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd speech-to-text
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

You should now be able to view the application in your browser at `http://localhost:3000`. Enjoy coding!