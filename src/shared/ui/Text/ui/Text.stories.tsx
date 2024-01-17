import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '../../../const/theme'

import { Text } from './Text'

export default {
  title: 'SHARED/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description'
}

export const Error = Template.bind({})
Error.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description',
  theme: 'error'
}

export const AlignedRight = Template.bind({})
AlignedRight.args = {
  text: 'This text is aligned to the right',
  align: 'right'
}

export const onlyTitle = Template.bind({})
onlyTitle.args = {
  title: 'Title lorem ipsun'
}

export const onlyText = Template.bind({})
onlyText.args = {
  text: 'Description Description Description Description'
}

export const PrimaryDark = Template.bind({})
PrimaryDark.args = {
  title: 'Title lorem ipsun',
  text: 'Description Description Description Description'
}
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTitleDark = Template.bind({})
onlyTitleDark.args = {
  title: 'Title lorem ipsun'
}
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)]

export const onlyTextDark = Template.bind({})
onlyTextDark.args = {
  text: 'Description Description Description Description'
}
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)]

export const SmallSize = Template.bind({})
SmallSize.args = {
  text: 'This text is small',
  size: 's'
}

export const LargeSize = Template.bind({})
LargeSize.args = {
  text: 'This text is large',
  size: 'l'
}
