import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { getComputedStyle, getFontColorAtHex, getCssCustomPropValue } from '../../../../utils'
import Success from '../../../../components/atoms/Success/index'

export default {
  title: 'components/atoms/Success/default',
  component: Success,
} as ComponentMeta<typeof Success>

const Template1: ComponentStory<typeof Success> = (args) => <Success {...args} />
const className = 'test-clss'
let click = false
let ref = false
const onClick = () => {
  click = true
}
const setRef = () => {
  ref = true
}
export const Pt001 = Template1.bind({})
Pt001.args = {
  active: true,
  onClick: onClick,
  ref: setRef,
  className
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const success = canvas.getByTestId('success')

  // No.001
  expect(success).toBeInTheDocument()
  
  // No.003
  await userEvent.click(success)
  expect(click).toBe(true)

  // No.004
  expect(ref).toBe(true)

  // No.005
  expect(getComputedStyle(success, 'width')).toBe('22px')
  expect(getComputedStyle(success, 'height')).toBe('22px')

  // No.006
  const color = getFontColorAtHex(success)
  const definedColor = getCssCustomPropValue('--color-success')
  expect(color.toUpperCase()).toBe(definedColor)

  // No.008
  expect(success).toHaveClass(className)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  active: false,
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.002
  expect(canvas.queryByTestId('success')).toBeNull()
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  active: true,
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const success = canvas.getByTestId('success')
  
  // No.005
  expect(success).toBeInTheDocument()
}