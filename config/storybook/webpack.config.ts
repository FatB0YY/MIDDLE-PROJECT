import webpack, { RuleSetRule } from 'webpack'
import path from 'path'
import { buildScssLoaderSB } from '../build/loaders/buildScssLoaderSB'
import { BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  }
  // @ts-ignore
  config.resolve.modules.push(paths.src)
  // @ts-ignore
  config.resolve.extensions.push('.ts', '.tsx')

  // @ts-ignore
  config.module.rules.push(buildScssLoaderSB(true))

  // @ts-ignore
  config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }
    }

    return rule
  })

  config.module?.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })

  return config
}
