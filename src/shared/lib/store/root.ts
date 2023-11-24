import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'essence/counter/index'
import { userReducer } from 'essence/user/index'
import { ReducerManager, StateSchema, thunkExtraArg } from './types'
import { createReducerManager } from './reducerManager'
import { $api } from 'shared/api/api'
import { saveScrollReducer } from 'features/ScrollSave/models/slice/SaveScrollSlice'

interface createReduxStoreProps {
  initialState?: StateSchema
  asyncReducers?: ReducersMapObject<StateSchema>
}

export function createReduxStore({ initialState, asyncReducers }: createReduxStoreProps) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    saveScroll: saveScrollReducer,
    // не добавляем async reducers
  }

  const reducerManager: ReducerManager = createReducerManager(rootReducers)

  const extraArg: thunkExtraArg = {
    api: $api,
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
