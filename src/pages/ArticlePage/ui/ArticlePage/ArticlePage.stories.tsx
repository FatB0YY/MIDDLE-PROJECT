import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticlePage from './ArticlePage'
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

export default {
  title: 'PAGES/ArticlePage',
  component: ArticlePage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ArticlePage>

const Template: ComponentStory<typeof ArticlePage> = (args) => (
  <ArticlePage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
