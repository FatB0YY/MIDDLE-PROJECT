import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from './Dropdown'

export default {
  title: 'SHARED/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' }
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100, width: '250px' }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof Dropdown>

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  trigger: <span>Open</span>,
  items: [
    {
      content: 'first',
      onClick: () => {},
      buttonTheme: 'outline'
    },
    {
      content: 'second',
      onClick: () => {},
      buttonTheme: 'outline'
    },
    {
      content: 'third',
      onClick: () => {},
      buttonTheme: 'outline'
    }
  ]
}
