/**
 * @fileoverview feature sliced relative path checker
 * @author FatB0YY
 */
'use strict'

const path = require('path')

const { isPathRelative } = require('../helpers/index')
//------------------------------------------------------------------------------

// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'feature sliced relative path checker',
      recommended: false,
      url: null // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ] // Add a schema if the rule has options
  },

  create(context) {
    const alias = context.options[0]?.alias || ''

    return {
      ImportDeclaration(node) {
        // app/entities/Article
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        // example C://Users/MyUser/Desktop/js/middle-project/src/index.tsx
        const fromFilename = context.filename

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report(
            node,
            'В рамках одного слайса все пути должны быть относительными.'
          )
        }
      }
    }
  }
}

const layers = {
  essence: 'essence',
  pages: 'pages',
  shared: 'shared',
  widgets: 'widgets',
  features: 'features'
}

// если совпадает слой и совпадает слайс, то используем относительный импорт, иначе абсолютный.
function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false
  }

  const toArray = to.split('/')
  const toLayer = toArray[0]
  const toSlice = toArray[1]

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false
  }

  const normalizePath = path.toNamespacedPath(from)
  const projectFrom = normalizePath.split('src')[1]
  const fromArray = projectFrom.split('\\')

  const fromLayer = fromArray[1]
  const fromSlice = fromArray[2]

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false
  }

  return fromSlice === toSlice && toLayer === fromLayer
}
