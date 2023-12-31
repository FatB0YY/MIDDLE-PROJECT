import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ECurrency } from '@/essence/currency'
import { Country } from '@/shared/const/other'

import { ProfileCard } from './ProfileCard'

export default {
  title: 'ENTITIES/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  data: {
    username: 'Joi',
    age: 21,
    country: Country.ARMENIA,
    lastname: 'Smith',
    first: 'asd',
    city: 'asf',
    currency: ECurrency.USD,
    avatar: ''
  }
}

export const withError = Template.bind({})
withError.args = {
  error: 'true'
}

export const Loading = Template.bind({})
Loading.args = {
  isLoading: true
}
