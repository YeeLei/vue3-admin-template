module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['vue'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  overrides: [],

  rules: {
    // "off" or 0 - 关闭规则
    // "warn" or 1 - 将规则视为一个警告
    // "error" or 2 - 将规则视为一个错误
    // 强制使用 === 和 !==
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off',
  },
}
