import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import';

// Import the dynamic architectural rules map from your infra folder
import { importRules } from './infra/eslint-import-rules.mjs';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  
  {
    plugins: {
      'check-file': checkFile,
      'import': importPlugin,
    },
    rules: {
      // Basic Cleanliness Guardrails
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-cycle': ['error', { maxDepth: Infinity }],
      
      // Enforce File Naming Standard (Kebab Case)
      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.{js,jsx,ts,tsx}': 'KEBAB_CASE' },
      ],

      // Enforce Feature Architecture (Cleanly pulled from infra map)
      'import/no-restricted-paths': [
        'error',
        {
          zones: importRules,
        },
      ],

      // Strict Naming Conventions
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        { selector: ['objectLiteralProperty', 'typeProperty'], format: null },
      ],
    },
  },

  eslintConfigPrettier,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;