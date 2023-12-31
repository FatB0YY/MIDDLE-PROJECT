/* eslint-disable */

import { Story } from '@storybook/react'

import { profileReducer } from '@/features/EditableProfileCard/model/slice/profileSlice'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { StoreProvider } from '@/shared/lib/store/StateProvider'
import { StateSchema } from '@/shared/lib/store/index'

import { loginReducer } from '@/features/AuthByUsername/testing'
import { articleDetailsCommentsReducer } from '@/features/ArticleCommentsList/testing'
import { addNewCommentReducer } from '@/features/addNewComment/testing'
import { articleDetailsReducer } from '@/essence/article/testing'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsComments: articleDetailsCommentsReducer
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) => (
    <StoreProvider
      initialState={state}
      asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
      <StoryComponent />
    </StoreProvider>
  )
