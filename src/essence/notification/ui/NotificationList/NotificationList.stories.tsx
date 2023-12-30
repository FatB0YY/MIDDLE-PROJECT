import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '@/app/providers/ThemeProvider'

import { NotificationList } from './NotificationList'

export default {
  title: 'Entities/notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof NotificationList>

const Template: ComponentStory<typeof NotificationList> = () => (
  <NotificationList />
)

export const Default = Template.bind({})
Default.decorators = [StoreDecorator({})]
Default.parameters = {
  mockData: [
    {
      url: `${__API_URL__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Уведомление',
          description: 'Что-то очень интересное'
        },
        {
          id: '2',
          title: 'Уведомление 2',
          description: 'Что-то очень интересное'
        },
        {
          id: '3',
          title: 'Уведомление 3',
          description: 'Что-то очень интересное'
        }
      ]
    }
  ]
}

export const DefaultDark = Template.bind({})
DefaultDark.decorators = [StoreDecorator({}), ThemeDecorator(Theme.DARK)]
DefaultDark.parameters = {
  mockData: [
    {
      url: `${__API_URL__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Уведомление',
          description: 'Что-то очень интересное'
        },
        {
          id: '2',
          title: 'Уведомление 2',
          description: 'Что-то очень интересное'
        },
        {
          id: '3',
          title: 'Уведомление 3',
          description: 'Что-то очень интересное'
        }
      ]
    }
  ]
}
