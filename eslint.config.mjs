import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import react from "eslint-plugin-react";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Netlify build artifacts
    ".netlify/**",
  ]),
  // Custom rule overrides
  {
    plugins: {
      react,
    },
    rules: {
      // Allow unescaped apostrophes and quotes in JSX (common in prose content)
      "react/no-unescaped-entities": "off",
      // Allow setState in useEffect for hydration patterns
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
