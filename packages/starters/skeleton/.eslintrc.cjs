module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	settings: {
		'svelte3/typescript': true
	},
	ignorePatterns: ['node_modules', 'build', 'dist', 'package', '.svelte-kit', 'svelte.config.js'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 'error'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
