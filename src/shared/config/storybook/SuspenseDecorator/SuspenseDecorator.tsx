import React, { Suspense } from 'react'
import { Story } from '@storybook/react'

export const SuspenseDecorator = (StoryComponent: Story) => (
  <Suspense fallback='Loading...'>
    <StoryComponent />
  </Suspense>
)
