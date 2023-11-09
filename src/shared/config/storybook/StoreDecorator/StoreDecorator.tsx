import { Story } from '@storybook/react'
import { profileReducer } from 'essence/profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'
import { StoreProvider } from 'shared/lib/store/StateProvider'
import { StateSchema } from 'shared/lib/store/index'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
}

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) => (StoryComponent: Story) =>
    (
      <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
      </StoreProvider>
    )
