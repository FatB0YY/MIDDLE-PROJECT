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
import { addNewCommentSchema } from 'features/addNewComment'
import { articlesPageSchema } from 'pages/ArticlePage'
import { SaveScrollSchema } from 'features/ScrollSave'
import { ArticleSortSchema } from 'features/ArticleSort'
import { ArticleDetailsRecommendationsSchema } from 'features/ArticleDetailsRecommendationsList'

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
// export type RootStore = ReturnType<typeof store.getState>

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  saveScroll: SaveScrollSchema

  // async
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  articleDetailsComments?: articleDetailsCommentsSchema
  articleDetailaRecommendations?: ArticleDetailsRecommendationsSchema
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

export interface thunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: thunkExtraArg
  state: StateSchema
}
