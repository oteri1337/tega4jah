const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pwa_name = process.env.NODE_NAME.replace(/"/g, "");
const app_name = pwa_name.toLowerCase().replace(/ /g, "-");

function rp(apath) {
  return path.resolve(__dirname, apath);
}

const appRules = [
  {
    test: /\.js$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: ["react-app"],
        },
      },
    ],
    exclude: /(node_modules)/,
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  },
  {
    test: /\.(gif|png|jpe?g|webp)$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/images/site/[name][ext]",
    },
  },
  {
    test: /\.mp4$/,
    // loader: "file-loader",
    type: "asset/resource",
    generator: {
      filename: "assets/videos/[name][ext]",
    },
  },
  {
    test: /\.svg$/,
    type: "asset/resource",
    generator: {
      filename: "assets/images/site/[name][ext]",
    },
  },
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    type: "asset/resource",
    generator: {
      filename: "assets/fonts/[name][ext]",
    },
  },
];

const entryOne = {
  mode: "development",
  bail: false,
  entry: "./src/javascript/index.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../public_html/"),
    publicPath: "/",
    filename: `app.js`,
  },
  module: {
    rules: appRules,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `app.css`,
    }),
    new webpack.DefinePlugin({
      NODE_NAME: JSON.stringify(pwa_name),

      NODE_ENV: JSON.stringify(process.env.NODE_ENV),

      NODE_DOMAIN: JSON.stringify(process.env.NODE_DOMAIN),
    }),
  ],
  resolve: {
    alias: {
      styles: rp("src/styles/"),

      javascript: rp("src/javascript/"),

      // user: rp("src/javascript/pages/userpages/"),

      providers: rp("src/javascript/providers/"),

      components: rp("src/javascript/pages/components/"),

      // assets: path.resolve(__dirname, "src/others/assets/"),

      hooks$: path.resolve(__dirname, "src/javascript/hooks.js"),

      functions$: path.resolve(__dirname, "src/javascript/functions.js"),
    },
  },
};

module.exports = [entryOne];
