import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off"
    }
  }
];

export default eslintConfig;
