import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator'

import LoginForm from './LoginForm'

export default {
  title: 'FEATURES/LoginForm',
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: '123',
      error: null,
      isLoading: false
    }
  })
]

export const Error = Template.bind({})
Error.args = {}
Error.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: '123',
      error: 'Неверный логин или пароль',
      isLoading: false
    }
  })
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
  StoreDecorator({
    loginForm: {
      username: 'admin',
      password: '123',
      error: null,
      isLoading: true
    }
  })
]
