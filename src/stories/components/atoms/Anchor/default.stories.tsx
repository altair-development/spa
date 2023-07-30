import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Anchor from '../../../../components/atoms/Anchor/index'

export default {
  title: 'components/atoms/Anchor/default',
  component: Anchor,
} as ComponentMeta<typeof Anchor>


const child = 'hoge'
const Template1: ComponentStory<typeof Anchor> = (args) => <Anchor {...args} />
export const Pt001 = Template1.bind({})
const classNamePt001 = 'test'
Pt001.args = {
  className: classNamePt001,
  children: child
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const anchor = canvas.getByTestId('anchor')
  
  // No.001
  expect(anchor).toHaveClass('test')
}

const Template2: ComponentStory<typeof Anchor> = (args) => <Anchor>{child}</Anchor>
export const Pt002 = Template2.bind({})
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const anchor = canvas.getByTestId('anchor')
  
  // No.002
  expect(anchor.textContent).toBe(child)
}