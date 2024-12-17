module.exports = {
    root: true,
    env: { browser: true, es2020: true, jest: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier', 'jest'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'prettier/prettier': [
            'error',
            {
                semi: true,
                singleQuote: true,
                trailingComma: 'es5',
            },
        ],
        semi: ['error', 'always'],
        'no-magic-numbers': 'off',
    },
};
