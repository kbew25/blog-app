const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'index.js',
    publicPath: '/',
  },
  devServer: {
    allowedHosts: [
      '.docksal.site'
    ],
    historyApiFallback: true,
    port: 3000,
  },
  watchOptions: {
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
      favicon: path.join(__dirname, "favicon.ico")
    }),
    new Dotenv({
      path: path.resolve('../', '.docksal', 'docksal-local.env')
    }),
    new CopyPlugin({
      patterns: [
        { from: "robots.txt", to: "robots.txt" },
      ],
    }),
  ]
}
