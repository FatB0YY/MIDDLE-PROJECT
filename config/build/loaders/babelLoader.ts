import { IBuildOptions } from '../types/config'

import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'

interface BuildBabelLoaderProps extends IBuildOptions {
  isTsx: boolean
}

export function buildBabelLoader({
  isDev,
  isProd,
  isTsx
}: BuildBabelLoaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins: any = [
    [
      'i18next-extract',
      {
        locales: ['ru', 'en'],
        keyAsDefaultValue: true
      }
    ],
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: isTsx
      }
    ],
    '@babel/plugin-transform-runtime'
  ]

  if (isProd && isTsx) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: false
            }
          ],
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              runtime: isDev ? 'automatic' : 'classic'
            }
          ]
        ],
        plugins: plugins
      }
    }
  }
}
