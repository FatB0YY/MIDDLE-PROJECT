/**
 * @fileoverview desc
 * @author fatB0YY
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/public-api-imports'),
  RuleTester = require('eslint').RuleTester

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
})
const aliasOptions = [
  {
    alias: '@'
  }
]

ruleTester.run('public-api-imports', rule, {
  valid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '../../model/slice/addCommentFormSlice'",
      errors: []
    },
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article'",
      errors: [],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\file.test.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.test.ts',
            '**/StoreDecorator.tsx'
          ]
        }
      ]
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article/testing'",
      errors: [],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.test.ts',
            '**/StoreDecorator.tsx'
          ]
        }
      ]
    }
  ],

  invalid: [
    {
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article/model/file.ts'",
      errors: [
        {
          message: 'Абсолютный импорт разрешен только из Public API (index.ts)'
        }
      ],
      options: aliasOptions
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article\\StoreDecorator.tsx',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article/testing/file.tsx'",
      errors: [
        {
          message: 'Абсолютный импорт разрешен только из Public API (index.ts)'
        }
      ],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.test.ts',
            '**/StoreDecorator.tsx'
          ]
        }
      ]
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article\\forbidden.ts',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/essence/article/testing'",
      errors: [
        {
          message:
            'Тестовые данные необходимо импортировать из Public API (testing.ts)'
        }
      ],
      options: [
        {
          alias: '@',
          testFilesPatterns: [
            '**/*.test.ts',
            '**/*.test.ts',
            '**/StoreDecorator.tsx'
          ]
        }
      ]
    }
  ]
})
