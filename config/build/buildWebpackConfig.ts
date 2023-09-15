import * as webpack from "webpack";
import { IBuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoader";
import { buildResolvers } from "./buildResolvers";

// ф-ция для сборки конфига
export function buildWebpackConfig(
  options: IBuildOptions
): webpack.Configuration {
  return {
    mode: options.mode,
    entry: options.paths.entry, // стартовая точка приложения
    output: {
      filename: "[name].[contenthash].js", // [contenthash] от кеша
      path: options.paths.build, // путь
      clean: true, // очистка ненужных файлов
    },
    module: {
      rules: buildLoaders(), // обрабатываем файлы за рамки js (png css scss svg ts...)
    },
    resolve: buildResolvers(),
    plugins: buildPlugins(),
  };
}
