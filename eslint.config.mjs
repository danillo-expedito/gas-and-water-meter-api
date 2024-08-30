import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tsEslintPlugin.configs.recommended.rules,
    },
    ignores: [
      "build/**/*"
    ]
  },
];
