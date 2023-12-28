import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'

import { AxiosInstance } from 'axios'

import { CounterSchema } from '@/essence/counter/index'
import { UserSchema } from '@/essence/user/index'
import { LoginSchema } from '@/features/AuthByUsername/index'
import { ProfileSchema } from '@/features/EditableProfileCard'

import { ArticleDetailsSchema } from '@/essence/article'
import { articleDetailsCommentsSchema } from '@/features/ArticleCommentsList'
import { SidebarSchema } from '@/widgets/Sidebar'
import { addNewCommentSchema } from '@/features/addNewComment'
import { articlesPageSchema } from '@/pages/ArticlePage'
import { SaveScrollSchema } from '@/features/ScrollSave'
import { ArticleSortSchema } from '@/features/ArticleSort'
import { rtkApi } from '@/shared/api/rtkApi'

import { createReduxStore } from './root'

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// export type RootStore = ReturnType<typeof store.getState>

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  saveScroll: SaveScrollSchema
  sidebar: SidebarSchema

  // rtk
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

  // async
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: articleDetailsCommentsSchema
  addNewComment?: addNewCommentSchema
  articlesPage?: articlesPageSchema
  articleSort?: ArticleSortSchema
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

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
