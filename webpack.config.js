// 1. Import tools needed for the config file itself
// path: helps us work with file paths safely across different operating systems
import path from "path";
// HtmlWebpackPlugin: helps generate the final HTML file in the 'dist' folder
import HtmlWebpackPlugin from "html-webpack-plugin";
// CleanWebpackPlugin: helps clear the 'dist' folder before each new build
// import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // We'll use 'clean: true' in output instead, it's simpler

// This is the main configuration object. Webpack reads this object to know what to do.
export default {
  // 2. Mode: Tells Webpack whether to optimize for development (fast, easier debugging) or production (slow, heavily optimized).
  //    Here we set the default mode. We can override this when running commands (like `npm run build`).
  mode: "development", // Or 'production' - 'development' is good for setting up

  // 3. Entry: The starting point of your application's code. Webpack begins reading here and follows all imports/dependencies.
  entry: "./src/index.js", // <-- Tells Webpack to start with index.js inside the src folder

  // 4. Output: Where Webpack should put the final bundled files it creates.
  output: {
    filename: "bundle.js", // <-- The main JavaScript file Webpack creates will be named bundle.js
    // path: Where to put the output folder. __dirname is the current directory (my-web-starter).
    // path.resolve combines paths safely. It points to the 'dist' folder relative to the current directory.
    path: path.resolve(process.cwd(), "dist"), // <-- Put the finished files inside the 'dist' folder
    clean: true, // <-- Automatically clean out the 'dist' folder before making a new build. Nice and tidy!
  },

  // 5. Module Rules (Loaders): How Webpack should process different *types* of files it finds during bundling (not just JS).
  module: {
    rules: [
      // Rule 1: Process JavaScript files (.js)
      {
        test: /\.js$/, // A test (regular expression) to find all files ending with .js
        exclude: /node_modules/, // EXCEPT files in the node_modules folder (we don't need to process those)
        use: {
          loader: "babel-loader", // <-- Use babel-loader for JS files. This is common even if you don't use Babel config yet.
          // If you decide NOT to install Babel (babel-core, @babel/preset-env etc.), you might remove this 'use' property
          // or use a different loader if needed. For a template, including it is common.
        },
      },
      // Rule 2: Process CSS files (.css)
      {
        test: /\.css$/, // Find files ending with .css
        use: [
          "style-loader", // <-- Loader 1: Takes the processed CSS string and puts it into <style> tags in your HTML
          "css-loader", // <-- Loader 2: Reads the CSS file and allows CSS imports (@import) in CSS itself.
          // Loaders run from RIGHT to LEFT (or bottom to top in the array). So css-loader runs first, then style-loader.
        ],
      },
      // Add more rules here for other file types you might use (images, fonts, etc.)
      // Example rule for images (you'd add this and install necessary loaders if your template needed images):
      // Rule 3: Process image files (like .png, .jpg, etc.)
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Built-in Webpack 5 type to handle assets like images
      },
    ],
  },

  // 6. Plugins: Perform broader tasks on the bundled code or the build process itself.
  plugins: [
    // HtmlWebpackPlugin: Generates the final index.html in 'dist' and automatically links the bundled JS ('bundle.js').
    new HtmlWebpackPlugin({
      template: "./src/template.html", // <-- Use this HTML file as a base template
      filename: "template.html", // <-- The output HTML file in 'dist' will be named index.html
    }),
    // Add other plugins here if needed (e.g., MiniCssExtractPlugin for separate CSS files, CopyWebpackPlugin for static assets)
  ],

  // 7. DevServer Configuration: Settings for the quick development server (`npm start`).
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "dist"), // <-- Tell the dev server to serve files from the 'dist' folder
    },
    port: 5500, // <-- Run the server on port 8080 (you can use a different number)
    open: true, // <-- Automatically open a browser tab when the server starts
    hot: true, // <-- Enable Hot Module Replacement (tries to update code in browser without full page refresh)
  },

  // 8. Devtool (Source Maps): Helps with debugging in the browser.
  //    It links the code running in the browser back to your original source files even after bundling.
  devtool: "eval-source-map", // <-- A good setting for development debugging
};
