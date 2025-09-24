// eslint.config.mjs
import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // Базовые правила ESLint
  js.configs.recommended,

  // TypeScript правила
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.browser, // Добавляем браузерные глобальные переменные
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs.recommended.rules,
    },
  },

  // Игнорируемые файлы
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
