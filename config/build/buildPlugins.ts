import * as webpack from "webpack";
const HtmlWebpackPlugin = require("html-webpack-plugin");

export function buildPlugins(): webpack.WebpackPluginInstance[] {
  return [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()];
}
