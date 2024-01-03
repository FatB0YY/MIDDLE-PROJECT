/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'

import { userReducer } from '@/essence/user'

import { SidebarReducer } from '@/widgets/Sidebar'
import { saveScrollReducer } from '@/features/ScrollSave'

import { $api } from '../../api/api'
import { rtkApi } from '../../api/rtkApi'

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
    user: userReducer,
    saveScroll: saveScrollReducer,
    sidebar: SidebarReducer,
    // rtk
    [rtkApi.reducerPath]: rtkApi.reducer
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
      getDefaultMiddleware({ thunk: { extraArgument: extraArg } }).concat(
        rtkApi.middleware
      )
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
