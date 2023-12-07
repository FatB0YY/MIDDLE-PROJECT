import * as webpack from 'webpack'

import { IBuildOptions } from './types/config'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoader'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'

// ф-ция для сборки конфига
export function buildWebpackConfig(
  options: IBuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options

  return {
    mode: mode,
    entry: paths.entry, // стартовая точка приложения
    output: {
      filename: '[name].[contenthash].js', // [contenthash] от кеша
      path: paths.build, // путь
      clean: true, // очистка ненужных файлов
      publicPath: '/'
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options) // обрабатываем файлы за рамки js (png css scss svg ts...)
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
    stats: {
      warningsFilter: /export .* was not found in/
    }
  }
}
