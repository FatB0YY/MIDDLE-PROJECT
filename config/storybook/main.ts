import path from 'path'

import { Configuration, DefinePlugin } from 'webpack'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types/config'

export default {
  stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-addon-themes',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false // 👈 disable the backgrounds addon
      }
    },
    '@storybook/addon-interactions',
    'storybook-addon-mock'
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript-plugin'
  },
  webpackFinal: async (config: Configuration) => {
    const paths: BuildPaths = {
      build: '',
      html: '',
      entry: '',
      src: path.resolve(__dirname, '..', '..', 'src'),
      public: path.resolve(__dirname, '..', '..', 'public')
    }
    config!.resolve!.modules!.push(paths.src)
    config!.resolve!.extensions!.push('.ts', '.tsx')
    config!.resolve!.alias = {
      ...config!.resolve!.alias,
      '@': paths.src
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i }
      }

      return rule
    })

    config!.module!.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })
    config!.module!.rules.push(buildCssLoader(true))

    config!.plugins!.push(
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API_URL__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('sb')
      })
    )

    return config
  }
}
