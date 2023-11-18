import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { createReduxStore } from './root'
import { CounterSchema } from 'essence/counter/index'
import { UserSchema } from 'essence/user/index'
import { LoginSchema } from 'features/AuthByUsername/index'
import { ProfileSchema } from 'essence/profile'
import { AxiosInstance } from 'axios'
import { NavigateOptions, To } from 'react-router-dom'
import { ArticleDetailsSchema } from 'essence/article'
import { articleDetailsCommentsSchema } from 'features/ArticleCommentsList'

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// export type RootStore = ReturnType<typeof store.getState>

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema

  // async
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: articleDetailsCommentsSchema
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

export type MyNavigate = (to: To, options?: NavigateOptions) => void
export interface thunkExtraArg {
  api: AxiosInstance
  navigate?: MyNavigate
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: thunkExtraArg
  state: StateSchema
}
