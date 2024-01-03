import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import '@/app/styles/index.scss'

export const StyleDecorator = (story: () => StoryFnReactReturnType) => story()
