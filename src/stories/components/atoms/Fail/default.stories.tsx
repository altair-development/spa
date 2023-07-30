import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { getComputedStyle, getFontColorAtHex, getCssCustomPropValue } from '../../../../utils'
import Fail from '../../../../components/atoms/Fail/index'

export default {
  title: 'components/atoms/Fail/default',
  component: Fail,
} as ComponentMeta<typeof Fail>

const Template1: ComponentStory<typeof Fail> = (args) => <Fail {...args} />
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
  const fail = canvas.getByTestId('fail')

  // No.001
  expect(fail).toBeInTheDocument()
  
  // No.003
  await userEvent.click(fail)
  expect(click).toBe(true)

  // No.004
  expect(ref).toBe(true)

  // No.005
  expect(getComputedStyle(fail, 'width')).toBe('22px')
  expect(getComputedStyle(fail, 'height')).toBe('22px')

  // No.006
  const color = getFontColorAtHex(fail)
  const definedColor = getCssCustomPropValue('--color-error')
  expect(color.toUpperCase()).toBe(definedColor)

  // No.008
  expect(fail).toHaveClass(className)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  active: false,
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.002
  expect(canvas.queryByTestId('fail')).toBeNull()
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  active: true,
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const fail = canvas.getByTestId('fail')
  
  // No.005
  expect(fail).toBeInTheDocument()
}