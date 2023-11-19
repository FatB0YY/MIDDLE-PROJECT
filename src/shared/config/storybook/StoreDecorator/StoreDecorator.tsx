import { Story } from '@storybook/react'
import { articleDetailsReducer } from 'essence/article'
import { profileReducer } from 'essence/profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { addNewCommentReducer } from 'features/addNewComment/model/slice/addNewCommentSlice'
import { ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { StoreProvider } from 'shared/lib/store/StateProvider'
import { StateSchema } from 'shared/lib/store/index'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsComments: articleDetailsReducer,
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    )
