// eslint-disable-next-line @typescript-eslint/no-unused-vars
import webpack, { ModuleOptions } from 'webpack'

// import ReactRefreshTypescript from 'react-refresh-typescript'

import { buildCssLoader } from './loaders/buildCssLoader'
import { IBuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/babelLoader'

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                // позволяет упростить работу с color для svg иконок
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }

  const cssLoader = buildCssLoader(options.isDev)

  const babelLoader = buildBabelLoader(options)

  // Если не используем тайпскрипт - нужен babel-loader
  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   // transpileOnly только сборка, без проверки типов (отдельно npm typecheck)
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         getCustomTransformers: () => ({
  //           before: [options.isDev && ReactRefreshTypescript()].filter(Boolean)
  //         }),
  //         transpileOnly: options.isDev
  //       }
  //     }
  //   ],
  //   exclude: /node_modules/
  // }

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  const fontsLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource'
  }

  return [
    assetLoader,
    fontsLoader,
    svgrLoader,
    // tsLoader,
    babelLoader,
    cssLoader
  ]
}
