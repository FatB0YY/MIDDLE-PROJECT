import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AboutPage from './AboutPage'
import 'app/styles/index.scss' // вроде есть декоратор, но переменные нихуя не видит

export default {
  title: 'PAGES/AboutPage',
  component: AboutPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AboutPage>

const Template: ComponentStory<typeof AboutPage> = (args) => <AboutPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
