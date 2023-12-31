/**
 * @fileoverview desc
 * @author fatB0YY
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const { isPathRelative } = require('../helpers/index')

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'desc',
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

    const checkingLayers = {
      entities: 'entities',
      essence: 'essence',
      pages: 'pages',
      widgets: 'widgets',
      features: 'features'
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        if (isPathRelative(importTo)) {
          return
        }

        // [entities, article, model, types ...]
        const segments = importTo.split('/')
        const layers = segments[0]

        if (!checkingLayers[layers]) {
          return
        }

        const isImportNotFromPuplicApi = segments.length > 2

        if (isImportNotFromPuplicApi) {
          context.report(
            node,
            'Абсолютный импорт разрешен только из Public API (index.ts)'
          )
        }
      }
    }
  }
}
