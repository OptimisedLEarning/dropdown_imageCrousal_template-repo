// 1. Import modules needed for the config file
import js from "@eslint/js"; // ESLint's built-in recommended rules
import { defineConfig, globalIgnores } from "eslint/config"; // Helpers for the new flat config format
import eslintPluginPrettier from "eslint-plugin-prettier"; // The plugin that adds the "prettier/prettier" rule

// This is the main configuration. It's an array of config objects (think of them as layers or sections).
export default defineConfig([
  // Section 1: Global Ignores (Files and folders ESLint should NEVER look at)
  // This object uses the `globalIgnores` helper, making its `ignores` apply to all other sections.
  globalIgnores([
    "node_modules/", // <-- Always ignore the folder where packages are installed
    ".git/", // <-- Ignore Git files
    "dist/", // <-- IMPORTANT: Tell ESLint to ignore the folder Webpack builds into!
    "build/", // Other common build folder name to ignore
    ".vscode/", // Ignore VS Code editor settings folder
    ".idea/", // Ignore IntelliJ IDEA editor settings folder
    // Add other folders or files you want ESLint to completely skip here
  ]),

  // Section 2: Base JavaScript Rules & Prettier Integration (Applies to most of your source code)
  // This object defines rules and settings for specific files.
  {
    // files: Which files this section applies to. This pattern covers standard JS extensions.
    // Because of the globalIgnores above, this WILL NOT apply to files inside node_modules or dist.
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], // Apply to any .js, .mjs, or .cjs file anywhere (unless ignored globally)

    // languageOptions: Configure how ESLint understands the JS language version and environment.
    languageOptions: {
      ecmaVersion: "latest", // Allow the newest JavaScript syntax (like async/await, classes, etc.)
      sourceType: "module", // Tell ESLint you are using `import`/`export` syntax
      // Add browser globals so ESLint knows about things like `window`, `document`, `console`, etc.
      globals: {
        // This line conveniently pulls in the common browser globals that eslint-plugin-prettier recommends
        ...eslintPluginPrettier.configs.recommended.languageOptions.globals,
      },
    },

    // plugins: Make additional rule sets available to use by name.
    plugins: {
      // We need this line to be able to use rules like "prettier/prettier" later.
      prettier: eslintPluginPrettier, // Makes the plugin available under the name 'prettier'
    },

    // extends: Inherit rules and settings from other popular configurations.
    // Configurations listed later in the array override those listed earlier.
    extends: [
      // js.configs.recommended: A set of basic code quality rules ESLint recommends everyone use.
      js.configs.recommended,
      // 'prettier': This special string tells ESLint to use eslint-config-prettier.
      // It TURNS OFF any ESLint rules that conflict with Prettier's formatting rules.
      // It MUST be the LAST config in the 'extends' array to ensure it overrides everything before it.
      "prettier",
    ],

    // rules: Customize inherited rules or add new ones.
    // You can change severity ("off", "warn", "error") or add options in an array.
    rules: {
      // --- Examples of overriding or adding standard ESLint rules ---
      // Override a rule from js.configs.recommended: Change 'no-unused-vars' from 'error' to 'warn'.
      "no-unused-vars": "warn",
      // Add a new rule: Enforce using '===' instead of '=='.
      eqeqeq: "error",
      // Add a new rule: Warn if functions don't consistently return values.
      "consistent-return": "warn", // Changed to warn for slightly less strictness in a template

      // --- Add the rule that checks against Prettier's formatting ---
      // This rule (from eslint-plugin-prettier) checks if your code matches your .prettierrc.json.
      // If it doesn't, ESLint reports it as an error (because we set severity to "error").
      "prettier/prettier": "error",
    },

    // settings: (Optional) Share data with plugins. Less common for basic setups.
    // settings: { },

    // linterOptions: (Optional) Configure the linting process itself (e.g., disallow inline comments).
    // linterOptions: { noInlineConfig: true }, // Example: Disallow `/* eslint-disable */` comments
  },

  // Section 3: Test File Specific Settings (Example: Add settings ONLY for test files)
  // This is another object in the array. Its rules/settings apply *in addition* to any previous sections that match the file.
  {
    // files: Tell this section to ONLY apply to files matching these patterns (common for test files).
    files: ["test/**/*.js", "test/**/*.mjs", "test/**/*.cjs", "**/*.test.js"],

    // languageOptions: Specifically for these files, add globals provided by testing frameworks.
    languageOptions: {
      globals: {
        // Add test globals here so ESLint doesn't report them as undefined variables
        it: "readonly", // Common test global (e.g., Mocha, Jest)
        describe: "readonly", // Common test global (e.g., Mocha, Jest)
        // Add others like: expect, jest, cy (Cypress), etc., if your template includes specific testing tools
      },
    },

    // rules: Override or add rules specifically for test files if needed.
    rules: {
      // Example: Allow "unused expressions" which are common in test assertion libraries (like `expect(value).toBe(true);`).
      // "no-unused-expressions": "off",
    },

    // You could also extend test-specific rule sets from plugins here (e.g., 'plugin:jest/recommended')
    // plugins: { jest: await import('eslint-plugin-jest') }, // Requires installing eslint-plugin-jest separately
    // extends: ['plugin:jest/recommended'],
  },

  // Add more configuration objects (sections) here if you need different rules/settings
  // for other specific file types or folders in your template (e.g., Node.js backend code, build scripts).
]);
