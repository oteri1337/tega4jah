const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const pwa_name = process.env.NODE_NAME.replace(/"/g, ""); // space
const app_name = pwa_name.toLowerCase().replace(/ /g, "-");

function rp(apath) {
  return path.resolve(__dirname, apath);
}

const rules = [
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
  entry: "./src/javascript/index.js",
  mode: "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../public_html"),
    publicPath: "/",
    filename: `app.js`,
  },
  module: {
    rules,
  },
  resolve: {
    alias: {
      styles: rp("src/styles/"),

      javascript: rp("src/javascript/"),

      providers: rp("src/javascript/providers/"),

      components: rp("src/javascript/pages/components/"),

      hooks$: path.resolve(__dirname, "src/javascript/hooks.js"),

      functions$: path.resolve(__dirname, "src/javascript/functions.js"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `app.css`,
    }),
    new webpack.DefinePlugin({
      NODE_NAME: JSON.stringify(pwa_name),

      NODE_ENV: JSON.stringify(process.env.NODE_ENV),

      NODE_DOMAIN: JSON.stringify(btoa(process.env.NODE_DOMAIN)),
    }),
    new HtmlWebpackPlugin({
      minify: false,
      title: pwa_name,
      app_name: app_name,
      filename: "index.twig",
      start_url: "/signin",
      scriptLoading: "blocking",
      template: "./src/html/index.html",
    }),

    new FaviconsWebpackPlugin({
      inject: false,
      logo: "../logo.png",
      prefix: "assets/images/pwa/",
      favicons: {
        appName: pwa_name,
        start_url: "/signin",
        appShortName: pwa_name,
      },
    }),
  ],
};

module.exports = [entryOne];
