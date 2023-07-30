import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Progress from '../../../../components/molecules/Progress'

export default {
  title: 'components/molecules/Progress/default',
  component: Progress,
} as ComponentMeta<typeof Progress>

const Template1: ComponentStory<typeof Progress> = (args) => <Progress {...args} />
export const Pt001 = Template1.bind({})
const loaderClassName = 'loader-clss'
Pt001.args = {
  load: true,
  success: false,
  fail: false,
  loaderProps: {
    className: loaderClassName
  }
}
Pt001.parameters = {
  chromatic: { disableSnapshot: true },
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')

  // No.001
  // No.005
  expect(loader).not.toBeNull()
  expect(success).toBeNull()
  expect(fail).toBeNull()

  // No.007
  expect(loader).toHaveClass(loaderClassName)
}

export const Pt002 = Template1.bind({})
const className = 'test-clss'
const successClassName = 'success-clss'
const dataId = 'hoge'
Pt002.args = {
  load: false,
  success: true,
  fail: false,
  successProps: {
    className: successClassName
  },
  className: className,
  'data-id': dataId
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')
  const progress = canvas.getByTestId('progress')

  // No.002
  expect(loader).toBeNull()
  expect(success).not.toBeNull()
  expect(fail).toBeNull()

  // No.004
  expect(progress.getAttribute('data-id')).toBe(dataId)
  
  // No.006
  expect(progress).toHaveClass(className)

  // No.008
  expect(success).toHaveClass(successClassName)
}

export const Pt003 = Template1.bind({})
const failClassName = 'fail-clss'
Pt003.args = {
  load: false,
  success: false,
  fail: true,
  failProps: {
    className: failClassName
  },
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')

  // No.003
  expect(loader).toBeNull()
  expect(success).toBeNull()
  expect(fail).not.toBeNull()

  // No.009
  expect(fail).toHaveClass(failClassName)
}