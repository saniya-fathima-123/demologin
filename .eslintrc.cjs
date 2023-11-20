module.exports = {
    parser: '@typescript-eslint/parser',
    extends: "standard-with-typescript",
    plugins: [
      '@typescript-eslint'
    ],
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: 'tsconfig.json',
    },
    env: {
      es6: true,
      node: true,
    },
    rules: {
      'no-var': 'error',
      semi: 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
      "@typescript-eslint/semi": "off",
      "@typescript-eslint/object-curly-spacing": "off"
    },
  };
  