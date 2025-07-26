import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'eslint:recommended',
      'next/core-web-vitals', // Uključuje Core Web Vitals pravila
      'next/typescript', // TypeScript specifična pravila
      'prettier', // Mora biti poslednje da izbegne konflikte
    ],
    plugins: [
      'simple-import-sort', // Za sortiranje importa
      'unused-imports', // Za uklanjanje nekorišćenih importa
    ],
    rules: {
      // Simple Import Sort Plugin pravila
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Unused Imports Plugin pravila
      'no-unused-vars': 'off', // Isključujemo osnovni rule
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Dodatna Next.js/React pravila (opcionalno)
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'warn', // Preporučuje next/image

      '@typescript-eslint/no-explicit-any': 'off',

      // TypeScript pravila (opcionalno)
      '@typescript-eslint/no-unused-vars': 'off', // Koristimo unused-imports umesto ovog
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  }),
];

export default eslintConfig;
