import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '../../../const/theme'

import { Button, ButtonSize, ThemeButton } from './Button'

export default {
  title: 'SHARED/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Text'
}

export const Clear = Template.bind({})
Clear.args = {
  children: 'Text',
  theme: ThemeButton.CLEAR
}

export const Accent = Template.bind({})
Accent.args = {
  children: 'Text',
  theme: ThemeButton.ACCENT
}

export const Outline = Template.bind({})
Outline.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE
}

export const OutlineSizeL = Template.bind({})
OutlineSizeL.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE,
  size: ButtonSize.L
}

export const OutlineSizeXL = Template.bind({})
OutlineSizeXL.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE,
  size: ButtonSize.XL
}

export const OutlineDark = Template.bind({})
OutlineDark.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE
}
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)]

export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Text',
  theme: ThemeButton.OUTLINE,
  disabled: true
}
