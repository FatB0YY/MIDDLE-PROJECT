import React from 'react'
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator = (story: () => StoryFnReactReturnType) => (
  <BrowserRouter>{story()}</BrowserRouter>
)
