import eslint from '@eslint/js';
import globals from 'globals';
import typescriptEslint  from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginVue from 'eslint-plugin-vue';

export default typescriptEslint.config(
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    extends: [
      eslint.configs.recommended,
      ...typescriptEslint.configs.recommended,
      ...eslintPluginVue.configs['flat/essential'],
      ...eslintPluginVue.configs['flat/recommended'],
      ...eslintPluginVue.configs['flat/strongly-recommended'],
    ],
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    plugins: {

    },
    rules: {

    },
  },
  eslintConfigPrettier
);
