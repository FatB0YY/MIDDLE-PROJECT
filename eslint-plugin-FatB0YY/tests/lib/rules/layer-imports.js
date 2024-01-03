const rule = require('../../../lib/rules/layer-imports'),
  RuleTester = require('eslint').RuleTester

const aliasOptions = [
  {
    alias: '@'
  }
]
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' }
})
ruleTester.run('layer-imports', rule, {
  valid: [
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\features\\article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\features\\article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/Article'",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\features\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/article'",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: aliasOptions
    },
    {
      filename: 'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ]
    }
    // {
    //   filename:
    //     'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article.tsx',
    //   code: "import { StateSchema } from '@/app/providers/StoreProvider'",
    //   errors: [],
    //   options: [
    //     {
    //       alias: '@',
    //       ignoreImportPatterns: ['**/StoreProvider']
    //     }
    //   ]
    // }
  ],

  invalid: [
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [
        {
          message:
            'Слой может импортировать в себя только нижележащие слои (shared, entities, features, widgets, pages, app)'
        }
      ],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [
        {
          message:
            'Слой может импортировать в себя только нижележащие слои (shared, entities, features, widgets, pages, app)'
        }
      ],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [
        {
          message:
            'Слой может импортировать в себя только нижележащие слои (shared, entities, features, widgets, pages, app)'
        }
      ],
      options: aliasOptions
    }
  ]
})
