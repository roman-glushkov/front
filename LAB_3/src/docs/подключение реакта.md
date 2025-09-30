0.  Создать папку src
    И файлы: src/index.ts и src/styles.css

1.  Создание package.json
    npm init -y

2.  Установка TypeScript
    npm install --save-dev typescript

3.  Создать tsconfig.json
    {
    "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "lib": ["dom", "es2015"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "jsx": "react-jsx"
    }
    }

4.  Настройка линтеров ESlint
    npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

5.  Создать eslint.config.mjs
    import js from '@eslint/js';
    import typescriptPlugin from '@typescript-eslint/eslint-plugin';
    import typescriptParser from '@typescript-eslint/parser';
    import globals from 'globals';
    export default [
    js.configs.recommended,
    {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
    parser: typescriptParser,
    globals: { ...globals.browser }
    },
    plugins: { '@typescript-eslint': typescriptPlugin },
    rules: { ...typescriptPlugin.configs.recommended.rules }
    },
    { ignores: ['dist/', 'node_modules/'] }
    ];

6.  Prettier
    npm install --save-dev --save-exact prettier

7.  Создать .prettierrc.json
    {
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5"
    }

8.  Stylelint проверка CSS
    npm install --save-dev stylelint stylelint-config-standard stylelint-order

9.  Создать .stylelintrc.json
    {
    "extends": ["stylelint-config-standard"],
    "plugins": ["stylelint-order"]
    }

10. Не менее важный шаг - Проверка
    npx tsc --noEmit
    npx eslint src/index.ts
    npx prettier --check src/index.ts
    npx stylelint "src/styles.css"
    Если все проверки прошли то можно удалять index.ts и styles.css

11. Реакт
    npm install --save-dev vite @vitejs/plugin-react
    npm install react react-dom
    npm install --save-dev @types/react @types/react-dom

12. Создаем vite.config.ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    export default defineConfig({
    plugins: [react()],
    })

13. Добавляем в package.json
    "scripts": {
    "type-check": "tsc --noEmit",
    "lint:js": "eslint src/**/\*.{ts,tsx}",
    "lint:js:fix": "eslint src/**/_.{ts,tsx} --fix",
    "lint:css": "stylelint src/\*\*/_.css",
    "lint:css:fix": "stylelint src/**/\*.css --fix",
    "format:check": "prettier --check src/**/_.{ts,tsx,css}",
    "format:fix": "prettier --write src/\*\*/_.{ts,tsx,css}",
    "lint": "npm run type-check && npm run lint:js && npm run format:check && npm run lint:css",
    "lint:fix": "npm run lint:js:fix && npm run format:fix && npm run lint:css:fix",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
    },

14. Создадим index.html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Presentation Maker</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
    </html>

15. Создадим src/main.tsx
    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import App from './App.tsx'
    ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    )

16. Создадим src/App.tsx
    import React from 'react'

    function App() {
    return (

        <div>
            <h1>Presentation Maker</h1>
            <p>Hello from React!</p>
        </div>
        )

    }

    export default App

17. запуск react
    npm run dev

18. Теория
    TypeScript - проверяет типы данных
    ESLint - ищет ошибки в коде
    Prettier - форматирует код единообразно
    Stylelint - проверяет CSS на ошибки
    Vite - сборщик для запуска React-приложения
