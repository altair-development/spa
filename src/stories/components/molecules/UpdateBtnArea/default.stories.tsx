import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { getMarginRight, getFontColorAtHex } from '../../../../utils'
import UpdateBtnArea from '../../../../components/molecules/UpdateBtnArea'

export default {
  title: 'components/molecules/UpdateBtnArea/default',
  component: UpdateBtnArea,
  decorators: [
    (story) => (
      <section
        style={{
          width: '237px',
          height: '47px'
        }}
      >{story()}</section>
    )
  ]
} as ComponentMeta<typeof UpdateBtnArea>

const Template1: ComponentStory<typeof UpdateBtnArea> = (args) => <UpdateBtnArea {...args} />
export const Pt001 = Template1.bind({})
Pt001.args = {
  load: true,
  success: false,
  fail: false,
  onSubmit: () => null,
  onCancel: () => null
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')
  const submitBtn = canvas.queryByText('更新')

  // // No.001
  // // No.008
  expect(loader).not.toBeNull()
  expect(success).toBeNull()
  expect(fail).toBeNull()
  expect(submitBtn).toBeNull()

  // No.10
  expect(getFontColorAtHex(loader!).toUpperCase()).toBe('#FFFFFF')
}

export const Pt002 = Template1.bind({})
const className = 'test-clss'
Pt002.args = {
  load: false,
  success: true,
  fail: false,
  className
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')
  const submitBtn = canvas.queryByText('更新')
  const updateBtnArea = canvas.getByTestId('update-btn-area')

  // No.002
  expect(loader).toBeNull()
  expect(success).not.toBeNull()
  expect(fail).toBeNull()
  expect(submitBtn).toBeNull()
  
  // No.007
  expect(updateBtnArea).toHaveClass(className)

  // No.11
  expect(getFontColorAtHex(success!).toUpperCase()).toBe('#FFFFFF')
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  load: false,
  success: false,
  fail: true,
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')
  const submitBtn = canvas.queryByText('更新')

  // No.003
  expect(loader).toBeNull()
  expect(success).toBeNull()
  expect(fail).not.toBeNull()
  expect(submitBtn).toBeNull()
}

export const Pt004 = Template1.bind({})
let submit = false
let cancel = false
const onSubmit = () => {
  submit = true
}
const onCancel = () => {
  cancel = true
}
Pt004.args = {
  load: false,
  success: false,
  fail: false,
  onSubmit,
  onCancel
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const loader = canvas.queryByTestId('loader')
  const success = canvas.queryByTestId('success')
  const fail = canvas.queryByTestId('fail')

  // No.004
  const submitBtn = canvas.getByText('更新')
  expect(loader).toBeNull()
  expect(success).toBeNull()
  expect(fail).toBeNull()

  // No.005
  await userEvent.click(submitBtn)
  expect(submit).toBe(true)

  // No.006
  const cancelBtn = canvas.getByText('キャンセル')
  await userEvent.click(cancelBtn)
  await userEvent.tab()
  expect(cancel).toBe(true)
  
  // No.009
  expect(getMarginRight(submitBtn)).toBe(10)
}
