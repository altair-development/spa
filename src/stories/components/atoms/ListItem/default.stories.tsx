import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import ListItem from '../../../../components/atoms/ListItem'
import type { DataType } from '../../../../components/atoms/ListItem'
import List from '../../../../components/atoms/List'
import { getCssCustomPropValue, rgbaToHex, getComputedStyle } from '../../../../utils'

export default {
  title: 'components/atoms/ListItem/default',
  component: ListItem,
  decorators: [
    (story) => {
      return (
        <List style={{width: '302px'}}>
          {story()}
        </List>
      )
    }
  ]
} as ComponentMeta<typeof ListItem>


const Template1: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />
export const Pt001 = Template1.bind({})
const name = 'ほげふが'
const data: DataType = {
  name: name
}
let onClickArg = {} as DataType
const onClick = (data: DataType) => {
  onClickArg = data
}
const className = 'test-clss'
const test = 'test'
Pt001.args = {
  className,
  data,
  test,
  onClick,
  selected: false
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const listItem = canvas.getByTestId('list-item')
  const anchor = within(listItem).getByTestId('list-item-anchor')

  // No.001
  expect(anchor.innerHTML).toBe(name)

  // No.002
  await userEvent.click(anchor)
  expect(onClickArg.name).toBe(data.name)

  // No.004
  expect(rgbaToHex(getComputedStyle(anchor, 'background-color'))).not.toBe(getCssCustomPropValue('--color-select-selected'))

  // No.005
  expect(listItem).toHaveClass(className)

  // No.006
  expect(listItem.getAttribute('test')).toBe(test)

  // const listItems = canvas.queryAllByTestId('list-item')

  // // No.001
  // expect(listItems.length).not.toBe(0)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  data: Pt001.args.data,
  onClick: Pt001.args.onClick,
  selected: Pt001.args.selected
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('list-item')

  // No.007
  expect(elem).toBeInTheDocument()
}

export const Pt003 = Template1.bind({})
const longName = 'abcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyz'
Pt003.args = {
  data: {
    name: longName
  },
  onClick: Pt001.args.onClick,
  selected: Pt001.args.selected
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const listItem = canvas.getByTestId('list-item')

  // No.009
  expect(listItem.clientHeight).toBe(84)
}

export const Pt004 = Template1.bind({})
Pt004.args = {
  data: Pt001.args.data,
  onClick: Pt001.args.onClick,
  selected: true
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const anchor = canvas.getByTestId('list-item-anchor')

  // No.003
  expect(rgbaToHex(getComputedStyle(anchor, 'background-color'))).toBe(getCssCustomPropValue('--color-select-selected'))
}

export const Pt005 = Template1.bind({})
Pt005.args = {
  data: {
    name: undefined
  },
  onClick: Pt001.args.onClick,
  selected: Pt001.args.selected
}
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const listItem = canvas.getByTestId('list-item')
  const anchor = within(listItem).getByTestId('list-item-anchor')

  // No.008
  expect(anchor.innerHTML).toBe('')
}