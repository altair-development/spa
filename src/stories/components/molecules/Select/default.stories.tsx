import React, { useState, useCallback } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Select, { ListItemDataType } from '../../../../components/molecules/Select'
import styles  from '../../../../components/molecules/Select/styles.module.scss'
import PopupPresenter from '../../../mocks/PopupPresenter'
import { getComputedStyle, getCssCustomPropValue, rgbaToHex } from '../../../../utils'
import { popperMarginTop } from '../../../../components/atoms/Popup'

const WithPopupPresenterFactory = (width: string) => function WithPopupPresenter(story: any) {
  return (
    <>
      <section style={{width}} data-testid="wrapper">
        {story()}
      </section>
      <PopupPresenter names={['popup']}  />
    </>
  )
}

export default {
  title: 'components/molecules/Select/default',
  component: Select,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    WithPopupPresenterFactory('30%')
  ]
} as ComponentMeta<typeof Select>

const data: ListItemDataType[] = [
  { name: '未着手', id: 0 },
  { name: '実施中', id: 1 },
  { name: '中止', id: 2 },
  { name: '完了', id: 3 },
  { name: 'あいうえおかきくけこさいすせそたちつてとなにぬねのはひふへほまみむめも', id: 4 },
  { name: 'abcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyz', id: 5 },
]

let onChangeValue: ListItemDataType | null = null
const SelectFactory = ({
  defaultValue,
  onClickOutside,
  onClickOrigin
}: any) => {
  const [value, setValue] = useState<ListItemDataType>(defaultValue ? defaultValue : {
    id: undefined,
    name: undefined
  })
  const onChange = useCallback((param: ListItemDataType) => {
    onChangeValue = param
    setValue(param)
  }, [])

  return (
    <Select
      data={data}
      value={value}
      onChange={onChange}
      onClickOutside={onClickOutside}
      onClickOrigin={onClickOrigin}
    />
  )
}

const Template1: ComponentStory<typeof SelectFactory> = args => <SelectFactory {...args} />
export const Pt001 = Template1.bind({})
let hasClickOrigin = false
const onClickOrigin = () => {
  return new Promise<void>(resolve => {
    hasClickOrigin = true
    resolve()
  })
}
Pt001.args = {
  onClickOrigin
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.001
  // No.010
  const originEl = canvas.getByTestId('origin')
  await userEvent.click(originEl)
  const listItemsEl = await canvas.findAllByTestId('list-item')
  expect(listItemsEl.length).toBe(data.length)

  // No.002
  listItemsEl.forEach((elem, idx) => {
    expect(elem.textContent).toBe(data[idx].name)
  })

  // No.005
  expect(hasClickOrigin).toBe(true)

  // No.012
  const selectIco = canvas.getByTestId('select-icon')
  expect(selectIco).toHaveClass('selector-icon-opened')

  // No.016
  const wrapper = canvas.getByTestId('wrapper')
  const wrapperW = wrapper.offsetWidth
  const originW = originEl.offsetWidth
  expect(originW).toBe(wrapperW)

  // No.017
  const selectList = canvas.getByTestId('select-list')
  const selectListW = selectList.offsetWidth
  expect(selectListW).toBe(originW)

  // No.018
  const definedBorderColor = getCssCustomPropValue('--color-border-text-field')
  const borderColor = getComputedStyle(originEl, 'border-color')
  expect(rgbaToHex(borderColor).toUpperCase()).toBe(definedBorderColor.toUpperCase())
}

export const Pt002 = Template1.bind({})
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.007
  expect(canvas.getByTestId('origin')).toBeInTheDocument()

  // No.008
  const selectList = canvas.queryByTestId('select-list')
  expect(selectList).toBeNull()
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  defaultValue: data[5]
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.003
  const originEl = canvas.getByTestId('origin')
  const dispNm = originEl.getElementsByTagName('span')[0].textContent
  expect(dispNm).toBe(data[5].name)
}

export const Pt004 = Template1.bind({})
let hasClickOutside = false
const onClickOutside = () => {
  return new Promise<void>(resolve => {
    hasClickOutside = true
    resolve()
  })
}
Pt004.args = {
  onClickOutside,
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.004
  const originEl = canvas.getByTestId('origin')
  await userEvent.click(originEl)
  await canvas.findByTestId('select-list')
  await userEvent.click(document.body)
  let selectList: HTMLElement | null = null
  waitFor(() => {
    // No.009
    selectList = canvas.queryByTestId('select-list')
    expect(selectList).toBeNull()
  })
  expect(hasClickOutside).toBe(true)

  waitFor(() => {
    // No.013
    const selectIco = canvas.getByTestId('select-icon')
    expect(selectIco).toHaveClass('selector-icon-closed')
  })
}

export const Pt005 = Template1.bind({})
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.006
  const originEl = canvas.getByTestId('origin')
  await userEvent.click(originEl)
  const listItemAnchors = await canvas.findAllByTestId('list-item-anchor')
  await userEvent.click(listItemAnchors[5])
  expect(JSON.stringify(onChangeValue)).toBe(JSON.stringify(data[5]))
  
  waitFor(() => {
    // No.014
    const selectList = canvas.queryByTestId('select-list')
    expect(selectList).toBeNull()
  })
}

export const Pt006 = Template1.bind({})
Pt006.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.011
  const originEl = canvas.getByTestId('origin')
  await userEvent.click(originEl)
  await canvas.findByTestId('select-list')
  await userEvent.click(originEl)
  waitFor(() => {
    const selectList = canvas.queryByTestId('select-list')
    expect(selectList).toBeNull()
  })
}

export const Pt007 = Template1.bind({})
Pt007.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.015
  const originEl = canvas.getByTestId('origin')
  await userEvent.click(originEl)
  let listItemAnchors = await canvas.findAllByTestId('list-item-anchor')
  await userEvent.click(listItemAnchors[5])
  
  let selectList: HTMLElement | null = null
  waitFor(async () => {
    selectList = canvas.queryByTestId('select-list')
    expect(selectList).toBeNull()
    await userEvent.click(originEl)
    selectList = await canvas.findByTestId('select-list')
    const originB = originEl.getBoundingClientRect().bottom
    waitFor(() => {
      const position = selectList!.getBoundingClientRect()
      expect(originB + popperMarginTop).toBe(position.y)

      // No.019
      listItemAnchors = canvas.getAllByTestId('list-item-anchor')
      const definedBgColor = getCssCustomPropValue('--color-select-selected')
      const anchorGgColor = getComputedStyle(listItemAnchors[5], 'background-color')
      expect(rgbaToHex(anchorGgColor).toUpperCase()).toBe(definedBgColor.toUpperCase())
    })
  })
}