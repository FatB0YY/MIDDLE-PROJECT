import {
  AnyAction,
  Reducer,
  ReducersMapObject,
  combineReducers
} from '@reduxjs/toolkit'

import { ReducerManager, StateSchema, StateSchemaKey } from './types'

// принимаем на вход дефолтные редьюсеры
export function createReducerManager(
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager {
  const reducers = { ...initialReducers }

  // создаем корневой редьюсер
  let combinedReducer = combineReducers(reducers)

  // название редьюсеров, которые мы хотим удалить
  let keysToRemove: StateSchemaKey[] = []

  return {
    // возвращает редьюсеры
    getReducerMap: () => reducers,
    // ф-ция есть редьюсер, удаляем ключи из стейта если они есть (кусочек стейта)
    reduce: (state: StateSchema, action: AnyAction) => {
      if (keysToRemove.length > 0) {
        state = { ...state }

        for (const key of keysToRemove) {
          delete state[key]
        }
        keysToRemove = []
      }

      return combinedReducer(state, action)
    },

    // добавляет в редьюсеры по ключу новый редьюсер
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }

      reducers[key] = reducer

      combinedReducer = combineReducers(reducers)
    },

    // удаляет
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }

      delete reducers[key]

      keysToRemove.push(key)

      combinedReducer = combineReducers(reducers)
    }
  }
}
