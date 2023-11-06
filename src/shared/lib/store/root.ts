import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from '../../../entities/Counter/index'
import { userReducer } from '../../../entities/User/index'
import { ReducerManager, StateSchema } from './types'
import { createReducerManager } from './reducerManager'

const rootReducers: ReducersMapObject<StateSchema> = {
  counter: counterReducer,
  user: userReducer,
}

const reducerManager: ReducerManager = createReducerManager(rootReducers)

const store = configureStore({
  reducer: reducerManager.reduce,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: __IS_DEV__,
})

// @ts-ignore
store.reducerManager = reducerManager

export { store }
