import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from '@/shared/const/theme'

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'

import { NotificationItem } from './NotificationItem'

export default {
  title: 'Entities/notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotificationItem>

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  item: {
    description: 'Some description',
    id: '1',
    title: 'Title'
  }
}

export const DefaultDark = Template.bind({})
DefaultDark.args = {
  item: {
    description: 'Some description',
    id: '1',
    title: 'Title'
  }
}
DefaultDark.decorators = [ThemeDecorator(Theme.DARK)]
