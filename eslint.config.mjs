import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins:{
      react: pluginReact,
      prettier: pluginPrettier, // register the plugin here
    },
    settings: {
      react: {
        version: "detect", // fixes "React version not specified"
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // allow JSX without importing React
      "react/prop-types": "off",        // turn off PropTypes checks if you don’t use them
      "prettier/prettier": "error",  // makes prettier errors show up in ESLint
    },
  },
];
