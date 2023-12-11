module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
		{
			'env': {
				'node': true
			},
			'files': [
				'.eslintrc.{js,cjs}'
			],
			'parserOptions': {
				'sourceType': 'script'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint',
		'@stylistic',
		'sort-keys-fix',
		'sort-imports-es6-autofix'
	],
	'rules': {
		'no-mixed-spaces-and-tabs': 'error',
		'@stylistic/semi': ['error', 'never'],
		'@stylistic/quotes': ['error', 'single'],
		'@stylistic/object-curly-spacing': ['error', 'always'],
		'import/prefer-default-export': 'off',
		'sort-imports-es6-autofix/sort-imports-es6': [
			'error', {
				'ignoreCase': false,
				'ignoreMemberSort': false,
				'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
			}]
	}
}
