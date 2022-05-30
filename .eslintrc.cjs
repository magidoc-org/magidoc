module.exports = {
  env: {
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['svelte3', '@typescript-eslint', 'es'],
  parserOptions: {
    project: ['packages/**/tsconfig.json'],
    extraFileExtensions: ['.svelte', '.cjs', '.mjs'],
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/typescript': true,
  },
  ignorePatterns: [
    '**/build',
    '**/dist',
    '**/package',
    '**/.svelte-kit',
    '**/.vscode',
    '**/coverage',
    '**/svelte.config.js',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'es/no-regexp-lookbehind-assertions': 'error', // This fails in Safari
    'es/no-regexp-s-flag': 'error',
    'es/no-regexp-unicode-property-escapes': 'error',
  },
}
