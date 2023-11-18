import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Code } from './Code'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { Theme } from 'app/providers/ThemeProvider'

export default {
  title: 'SHARED/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Code>

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />

export const Normal = Template.bind({})
Normal.args = {
  text:
    'export default {\n' +
    "    title: 'SHARED/Code',\n" +
    '    component: Code,\n' +
    '    argTypes: {\n' +
    "        backgroundColor: { control: 'color' },\n" +
    '    },\n' +
    '} as ComponentMeta<typeof Code>;\n' +
    '\n' +
    'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n' +
    '\n' +
    'export const Normal = Template.bind({});',
}

export const Dark = Template.bind({})
Dark.args = {
  text:
    'export default {\n' +
    "    title: 'SHARED/Code',\n" +
    '    component: Code,\n' +
    '    argTypes: {\n' +
    "        backgroundColor: { control: 'color' },\n" +
    '    },\n' +
    '} as ComponentMeta<typeof Code>;\n' +
    '\n' +
    'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n' +
    '\n' +
    'export const Dark = Template.bind({});',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
