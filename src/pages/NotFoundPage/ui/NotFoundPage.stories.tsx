import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotFoundPage } from './NotFoundPage'
import 'app/styles/index.scss' // вроде есть декоратор, но переменные нихуя не видит

export default {
  title: 'PAGES/NotFoundPage',
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotFoundPage>

const Template: ComponentStory<typeof NotFoundPage> = (args) => (
  <NotFoundPage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
