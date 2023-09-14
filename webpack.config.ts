import * as path from "path";
import * as webpack from "webpack";

const HtmlWebpackPlugin = require("html-webpack-plugin");

const config: webpack.Configuration = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.ts"), // стартовая точка приложения
  module: {
    rules: [
      // обрабатываем файлы за рамки js (png css scss svg ts...)
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js", // [contenthash] от кеша
    path: path.resolve(__dirname, "dist"), // путь
    clean: true, // очистка ненужных файлов
  },
  plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
};

export default config;
