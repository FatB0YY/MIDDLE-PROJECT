// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//     jest: true,
//   },
//   extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaFeatures: {
//       jsx: true,
//     },
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks'],
//   rules: {
//     'react/jsx-indent': [2, 2],
//     'react/jsx-indent-props': [2, 2],
//     indent: [2, 2],
//     'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
//     'import/no-unresolved': 'off',
//     'import/prefer-default-export': 'off',
//     'no-unused-vars': 'warn',
//     'react/require-default-props': 'off',
//     'react/react-in-jsx-scope': 'off',
//     'react/jsx-props-no-spreading': 'warn',
//     'react/function-component-definition': 'off',
//     'no-shadow': 'off',
//     'import/extensions': 'off',
//     'import/no-extraneous-dependencies': 'off',
//     'linebreak-style': 'off',
//     'i18next/no-literal-string': [
//       'error',
//       {
//         markupOnly: true,
//         ignoreAttribute: ['data-testid'],
//       },
//     ],
//     'max-len': ['error', { ignoreComments: true, code: 120 }],
//     'react-hooks/rules-of-hooks': 'error',
//     'react-hooks/exhaustive-deps': 'error',
//     'no-underscore-dangle': [
//       'error',
//       {
//         allow: ['__IS_DEV__', '__API__', '__PROJECT__', '_inited'],
//       },
//     ],
//   },
//   globals: {
//     __IS_DEV__: true,
//     __API_URL__: true,
//     __PROJECT__: true,
//   },
//   overrides: [
//     {
//       files: ['**/src/**/*.test.{ts,tsx}'],
//       rules: {
//         'i18next/no-literal-string': 'off',
//       },
//     },
//   ],
// }
