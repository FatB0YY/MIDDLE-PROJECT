import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
import '@/app/styles/index.scss'

export const StyleDecorator = (story: () => StoryFnReactReturnType) => story()
