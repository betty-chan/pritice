module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: 'tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
  },
  extends: ['standard-with-typescript', 'plugin:vue/recommended', 'plugin:prettier/recommended'],
  settings: {},
  rules: {
    // base rules
    'prettier/prettier': [
      'error',
      {
        // 未正确使用默认配置 all，这里手动设置一下
        trailingComma: 'all',
      },
    ],

    // js rules
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-useless-escape': 'warn',
    'no-fallthrough': 'warn',

    // ts rules
    // -- ts rules off
    "@typescript-eslint/require-array-sort-compare": "off",
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    // -- ts rules warn
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-base-to-string': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/restrict-plus-operands': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/class-literal-property-style': 'warn',

    // vue rules
    'vue/multi-word-component-names': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/require-prop-type-constructor': 'warn',
  },
};
