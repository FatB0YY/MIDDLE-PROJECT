import { IBuildOptions } from '../types/config'

import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin'

export function buildBabelLoader({ isDev, isProd }: IBuildOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins: any = [
    [
      'i18next-extract',
      {
        locales: ['ru', 'en'],
        keyAsDefaultValue: true
      }
    ]
  ]

  if (isProd) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
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
