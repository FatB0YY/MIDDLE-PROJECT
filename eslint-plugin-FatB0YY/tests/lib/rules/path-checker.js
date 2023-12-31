/**
 * @fileoverview feature sliced relative path checker
 * @author FatB0YY
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/path-checker'),
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
ruleTester.run('path-checker', rule, {
  valid: [
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article',
      code: 'import {articleDetailsActions, articleDetailsReducer} from "../../model/slice/articleDetailsSlice"',
      errors: []
    }
  ],

  invalid: [
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article',
      code: 'import {articleDetailsActions, articleDetailsReducer} from "essence/article/model/slice/articleDetailsSlice"',
      errors: [
        {
          message: 'В рамках одного слайса все пути должны быть относительными.'
        }
      ]
    },
    {
      filename:
        'C:\\Users\\Ramazanov\\Desktop\\MIDDLE-PROJECT\\src\\essence\\article',
      code: 'import {articleDetailsActions, articleDetailsReducer} from "@/essence/article/model/slice/articleDetailsSlice"',
      errors: [
        {
          message: 'В рамках одного слайса все пути должны быть относительными.'
        }
      ],
      options: [
        {
          alias: '@'
        }
      ]
    }
  ]
})
