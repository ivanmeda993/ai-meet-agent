/** @type {import("prettier").Config} */
module.exports = {
  // 🎯 Osnovne Prettier opcije (bez import sortiranja - to radi ESLint)
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  bracketSameLine: false,
  // 📝 Specifične opcije za različite tipove fajlova
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
};
