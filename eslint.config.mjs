import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 🚫 Ignoriši build fajlove i direktorijume
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'out/**',
      '.cache/**',
      'coverage/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'public/**',
      '**/*.d.ts',
      'drizzle/**',
    ],
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // 🧹 Brisanje nekorišćenih importova i varijabli
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // 📦 Sortiranje importova
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // React i Next.js
            ['^react', '^next'],
            // Eksterni paketi
            ['^@?\\w'],
            // Interni importovi
            ['^(@|components|lib|utils|hooks|types|styles)(/.*|$)'],
            // Relatvni importovi
            ['^\\.'],
            // Type importovi
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // 🎯 Dodatna pravila za kvalitet koda
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'warn',

      // 🔧 Relaksacija nekih pravila za development
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
    },
  },

  // 🎨 Prettier integracija - MORA biti poslednja!
  prettierConfig,
];

export default eslintConfig;
