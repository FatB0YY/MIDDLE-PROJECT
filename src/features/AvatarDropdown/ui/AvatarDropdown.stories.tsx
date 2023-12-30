import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator'
import { UserRole } from '@/essence/user'

import { AvatarDropdown } from './AvatarDropdown'

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof AvatarDropdown>

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
  StoreDecorator({
    user: {
      authData: {
        id: '1',
        roles: [UserRole.ADMIN]
      }
    }
  })
]
