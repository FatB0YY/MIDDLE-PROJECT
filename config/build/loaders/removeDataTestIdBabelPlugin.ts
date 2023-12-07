import * as Babel from '@babel/core'

interface RemoveDataTestIdBabelPluginState {
  opts: {
    props?: string[]
  }
}

export function removeDataTestIdBabelPlugin(): Babel.PluginObj<RemoveDataTestIdBabelPluginState> {
  return {
    visitor: {
      Program(path, state) {
        const forbiddenProps = (state.opts.props || []) as string[]

        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name
            if (forbiddenProps.includes(nodeName)) {
              current.parentPath.remove()
            }
          }
        })
      }
    }
  }
}
