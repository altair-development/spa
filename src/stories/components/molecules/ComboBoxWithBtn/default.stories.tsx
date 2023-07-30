import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, waitFor, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import PopupPresenter from '../../../mocks/PopupPresenter'
import ComboBoxWithBtn, { List as SearchList } from '../../../../components/molecules/ComboBoxWithBtn'
import { getComputedStyle } from '../../../../utils'

export default {
  title: 'components/molecules/ComboBoxWithBtn/default',
  component: ComboBoxWithBtn,
  decorators: [
    (story) => (
      <section
        style={{
          width: '351px',
          height: '81px'
        }}
      >
        <section>{story()}</section>
        <PopupPresenter names={['popup']}  />
      </section>
    )
  ]
} as ComponentMeta<typeof ComboBoxWithBtn>

const Template1: ComponentStory<typeof ComboBoxWithBtn> = args => <ComboBoxWithBtn {...args} />

export const Pt001 = Template1.bind({})
const value = 'hoge'
const btnName = 'テスト追加'
const textfieldarg = 'テキストフィールドプロパティ'
const btnarg = 'ボタンプロパティ'
const testdata = 'テストデータ'
let ref: HTMLElement | null = null
const setRef = (node: HTMLElement | null) => {
  if (node) {
    ref = node
  }
}
Pt001.args = {
  listOpen: true,
  value,
  children: (
    <SearchList>
      <p data-testid="search-list">abcdefg</p>
    </SearchList>
  ),
  enableBtn: true,
  btnName,
  textFieldProps: {
    textfieldarg
  },
  btnProps: {
    btnarg
  },
  testdata,
  ref: setRef,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.001
  // No.003
  let searchList: HTMLParagraphElement | null = null
  await waitFor(() => {
    searchList = canvas.queryByTestId('search-list')
    expect(searchList).not.toBeNull()
  })
  
  // No.002
  const textField = canvas.getByTestId('text-field') as HTMLInputElement
  expect(textField.value).toBe(value)

  // No.004
  const submitBtn = canvas.queryByTestId('submit-btn')
  expect(submitBtn).not.toBeNull()

  // No.005
  expect(submitBtn?.innerHTML).toBe(btnName)

  // No.006
  expect(textField.getAttribute('textfieldarg')).toBe(textfieldarg)

  // No.007
  expect(submitBtn?.getAttribute('btnarg')).toBe(btnarg)

  // No.008
  const comboBoxWithBtn = canvas.getByTestId('combo-box-with-btn')
  expect(comboBoxWithBtn.getAttribute('testdata')).toBe(testdata)

  // No.009
  expect(ref).toBe(comboBoxWithBtn)

  // No.010
  searchList = canvas.getByTestId('search-list') as HTMLParagraphElement
  expect(searchList.clientWidth).toBe(textField.offsetWidth)

  // No.011
  expect(getComputedStyle(canvas.getByTestId('origin'), 'margin-right')).toBe('10px')
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  listOpen: false,
  children: <p></p>,
  enableBtn: false,
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.012
  expect(canvas.queryByTestId('submit-btn')).toBeNull()
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  listOpen: false,
  children: Pt002.args.children,
}
// No.015
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.013
  // No.014
  expect(canvas.queryByText('追加する')).not.toBeNull()
}

export const Pt004 = Template1.bind({})
let changeVal = ''
const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  changeVal = target.value
}
const inpputStr = 'abc'
Pt004.args = {
  ...Pt003.args,
  onChange
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.016
  const textField = canvas.getByTestId('text-field')
  await userEvent.type(textField, inpputStr)
  expect(changeVal).toBe(inpputStr)
}

export const Pt005 = Template1.bind({})
let submit = false
const onClickBtn = () => {
  submit = true
}
Pt005.args = {
  ...Pt003.args,
  enableBtn: true,
  onClickBtn
}
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.016
  const submitBtn = canvas.getByTestId('submit-btn')
  await userEvent.click(submitBtn)
  expect(submit).toBe(true)
}

export const Pt006 = Template1.bind({})
Pt006.args = {
  listOpen: true,
  children: Pt001.args.children
}
Pt006.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.017
  await waitFor(async () => {
    const searchList = canvas.queryByTestId('search-list')
    expect(searchList).not.toBeNull()
    await userEvent.click(document.body)
    expect(canvas.queryByTestId('search-list')).not.toBeNull()
  })
}