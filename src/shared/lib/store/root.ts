import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from '../../../essence/counter/index'
import { userReducer } from '../../../essence/user/index'
import { MyNavigate, ReducerManager, StateSchema } from './types'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'

interface createReduxStoreProps {
  initialState?: StateSchema
  asyncReducers?: ReducersMapObject<StateSchema>
  navigate?: MyNavigate
}

export function createReduxStore({ initialState, asyncReducers, navigate }: createReduxStoreProps) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
  }

  const reducerManager: ReducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: { api: $api, navigate: navigate } } }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
