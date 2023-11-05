import { DeepPartial } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { StoreProvider } from 'shared/lib/store/StateProvider'
import { StateSchema } from 'shared/lib/store/types'

export const StoreDecorator = (state: DeepPartial<StateSchema>) => (StoryComponent: Story) => {
  return (
    <StoreProvider initialState={state}>
      <StoryComponent />
    </StoreProvider>
  )
}
