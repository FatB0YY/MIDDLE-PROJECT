import path from 'path'

import webpack from 'webpack'

import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildPaths, IBuildEnv } from './config/build/types/config'

export default (env: IBuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    public: path.resolve(__dirname, 'public'),
    src: path.resolve(__dirname, 'src')
  }

  const mode = env.mode || 'development'

  const isDev = mode === 'development'
  const isProd = mode === 'production'
  const PORT = env.port || 3000

  const apiUrl = env.apiUrl || 'http://localhost:8000'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    isProd,
    port: PORT,
    apiUrl,
    project: 'client'
  })

  return config
}
