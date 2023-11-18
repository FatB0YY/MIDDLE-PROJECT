import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'essence/counter/index'
import { userReducer } from 'essence/user/index'
import { MyNavigate, ReducerManager, StateSchema, thunkExtraArg } from './types'
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
    // не добавляем async reducers
  }

  const reducerManager: ReducerManager = createReducerManager(rootReducers)

  const extraArg: thunkExtraArg = {
    api: $api,
    navigate: navigate,
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: extraArg } }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
