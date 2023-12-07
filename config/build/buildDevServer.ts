import { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import { IBuildOptions } from './types/config'

export function buildDevServer(options: IBuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    hot: true,
    // если раздавать статику через ngnix, то надо делать проксирование на Index.html
    historyApiFallback: true
  }
}
