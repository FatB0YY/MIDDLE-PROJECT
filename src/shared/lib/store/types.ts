import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { store } from './root'
import { CounterSchema } from 'entities/Counter/index'
import { UserSchema } from 'entities/User/index'
import { LoginSchema } from 'features/AuthByUsername/index'

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema

  // async
  loginForm?: LoginSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
