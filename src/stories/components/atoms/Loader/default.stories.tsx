import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Loader from '../../../../components/atoms/Loader/index'

export default {
  title: 'components/atoms/Loader/default',
  component: Loader,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} as ComponentMeta<typeof Loader>

const Template1: ComponentStory<typeof Loader> = (args) => <Loader {...args} />
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
  const loader = canvas.getByTestId('loader')

  // No.001
  expect(loader).toBeInTheDocument()
  
  // No.003
  await userEvent.click(loader)
  expect(click).toBe(true)

  // No.004
  expect(ref).toBe(true)

  // No.006
  expect(loader).toHaveClass(className)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  active: false,
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.002
  expect(canvas.queryByTestId('loader')).toBeNull()
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  active: true,
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.getByTestId('loader')
  
  // No.005
  expect(loader).toBeInTheDocument()
}