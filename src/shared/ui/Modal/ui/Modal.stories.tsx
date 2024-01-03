import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ThemeDecorator } from '../../../config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from '../../../const/theme'

import { Modal } from './Modal'

export default {
  title: 'SHARED/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />

export const Normal = Template.bind({})
Normal.args = {
  isOpen: true,
  children: 'Text modal'
}

export const Dark = Template.bind({})
Dark.args = {
  isOpen: true,
  children: 'Text modal'
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
