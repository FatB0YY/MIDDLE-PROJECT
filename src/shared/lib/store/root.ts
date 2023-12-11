/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'

import { counterReducer } from 'essence/counter/index'
import { userReducer } from 'essence/user/index'
import { SidebarReducer } from 'widgets/Sidebar'

import { $api } from 'shared/api/api'

import { saveScrollReducer } from 'features/ScrollSave/models/slice/SaveScrollSlice'

import { ReducerManager, StateSchema, ThunkExtraArg } from './types'
import { createReducerManager } from './reducerManager'

interface createReduxStoreProps {
  initialState?: StateSchema
  asyncReducers?: ReducersMapObject<StateSchema>
}

export function createReduxStore({
  initialState,
  asyncReducers
}: createReduxStoreProps) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    saveScroll: saveScrollReducer,
    sidebar: SidebarReducer
    // не добавляем async reducers
  }

  const reducerManager: ReducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } })
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
