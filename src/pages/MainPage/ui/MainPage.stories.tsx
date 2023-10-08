import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MainPage from './MainPage'
import 'app/styles/index.scss' // вроде есть декоратор, но переменные нихуя не видит

export default {
  title: 'PAGES/MainPage',
  component: MainPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MainPage>

const Template: ComponentStory<typeof MainPage> = (args) => <MainPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
