module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-alert': 'off',
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],
    'no-restricted-globals': 'off',
    'prefer-const': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    '@typescript-eslint/no-unsafe-return': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-props-no-spreading': 'off',

    'react/prop-types': 'off',
    'react/require-default-props': 0,
    'prettier/prettier': 0,
    '@typescript-eslint/restrict-template-expressions': ['off'],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-underscore-dangle': ['error', { allow: ['__isNew__'] }],
    'jsx-a11y/no-static-element-interactions': 'off',
  },
};
