import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import PopupPresenter from '../../../mocks/PopupPresenter'
import AccountMenu from '../../../../components/organisms/AccountMenu'
import Icon from '../../../images/division_tw_icon_a.jpg'
import { DataType } from '../../../../components/atoms/ListItem'
import listItemStyles from '../../../../components/atoms/ListItem/styles.module.scss'
import { expandInlineStyleStr, getComputedStyle } from '../../../../utils'

export default {
  title: 'components/organisms/AccountMenu/default',
  component: AccountMenu,
  decorators: [
    (story) => (
      <section
        style={{
          width: '250px',
          height: '153px'
        }}
      >
        <section>{story()}</section>
        <PopupPresenter names={['popup']}  />
      </section>
    )
  ]
} as ComponentMeta<typeof AccountMenu>

const Template1: ComponentStory<typeof AccountMenu> = args => <AccountMenu {...args} />

export const Pt001 = Template1.bind({})
const name = 'agent-joey'
let onClickData: DataType | null = null
const onClick = (val: DataType) => onClickData = val
const list = [
  {
    data: {
      name: 'アイテム１'
    },
    onClick
  },
  {
    data: {
      name: 'アイテム２'
    },
    onClick
  },
  {
    data: {
      name: 'アイテム３'
    },
    onClick
  },
]
Pt001.args = {
  name,
  src: Icon,
  list,
  style: {
    color: 'inherit'
  },
  leftProps: {
    style: {
      color: 'inherit'
    },
    id: 'left-props-id'
  },
  rightProps: {
    id: 'right-props-id'
  },
  id: 'other-props-id'
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.001
  const upperName = canvas.getByTestId('upper-name')
  expect(upperName.innerText).toBe(name)

  // No.002
  const image = canvas.getByTestId('image')
  const src = image.getAttribute('src')
  const regex = /^.+\/division_tw_icon_a(\.[^.]+)*\.jpg$/
  expect(regex.test(src!)).toBe(true)
  const width = image.clientWidth
  expect(Number(width)).toBe(30)
  const height = image.clientHeight
  expect(Number(height)).toBe(30)

  // No.003
  const leftContent = canvas.getByTestId('left-content')
  const style = expandInlineStyleStr(leftContent.getAttribute('style'))
  expect(style.color).toBe('inherit')

  // No.004
  expect(leftContent.getAttribute('id')).toBe(Pt001.args?.leftProps?.id)

  // No.005
  expect(canvas.getByTestId('right-content').getAttribute('id')).toBe(Pt001.args?.rightProps?.id)

  // No.006
  const flexBoxLayout = canvas.getByTestId('flex-box-layout')
  expect(expandInlineStyleStr(flexBoxLayout.getAttribute('style')).color).toBe('inherit')

  // No.007
  expect(getComputedStyle(image, 'border-radius')).toBe('0px')

  // No.008
  expect(getComputedStyle(canvas.getByTestId('origin-el-wrapper'), 'margin-left')).toBe('3px')
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  name: Pt001.args.name,
  src: Pt001.args.src,
  list: Pt001.args.list
}
Pt002.play = async ({ canvasElement }) => {
  // No.012
  const canvas = within(canvasElement)

  const origin = canvas.getByTestId('origin-el-wrapper')
  await userEvent.click(origin)
  await waitFor(() => {
    // No.013
    const listItemsA = canvas.queryAllByTestId('list-item-anchor')
    expect(listItemsA).not.toBeNull()

    // No.010
    expect(listItemsA.length).toBe(list.length)

    // No.011
    listItemsA.forEach((item, idx) => {
      expect(item.innerText).toBe(list[idx].data.name)
    })

    // No.014
    expect(canvas.getByTestId('toggler-ico')).toHaveClass('selector-icon-opened')

    // No.015
    const listItems = canvas.getAllByTestId('list-item')
    for (const item of listItems) {
      expect(item).not.toHaveClass(listItemStyles['selected'])
    }
  })
}

export const Pt003 = Template1.bind({})
Pt003.args = Pt002.args
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByTestId('origin-el-wrapper'))
  await waitFor(async () => {
    const listItems = canvas.queryAllByTestId('list-item')
    expect(listItems).not.toBeNull()
    expect(listItems.length).toBe(list.length)
    await userEvent.click(canvas.getByTestId('origin-el-wrapper'))
    await waitFor(() => {
      // No.16
      expect(canvas.queryAllByTestId('list-item')).toStrictEqual([])

      // No.017
      expect(canvas.getByTestId('toggler-ico')).toHaveClass('selector-icon-closed')
    })
  })
}

export const Pt004 = Template1.bind({})
Pt004.args = Pt002.args
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByTestId('origin-el-wrapper'))
  await waitFor(async () => {
    // No.018
    const listItemsA = canvas.queryAllByTestId('list-item-anchor')
    expect(listItemsA.length).toBe(list.length)
    await userEvent.click(listItemsA[0])
    expect(onClickData?.name).toBe(list[0].data.name)
  })
}

export const Pt005 = Template1.bind({})
Pt005.args = Pt002.args
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByTestId('origin-el-wrapper'))
  await waitFor(async () => {
    const listItemsA = canvas.queryAllByTestId('list-item-anchor')
    expect(listItemsA.length).toBe(list.length)
    await userEvent.click(document.body)
    await waitFor(() => {
      // No.019
      expect(canvas.queryAllByTestId('list-item')).toStrictEqual([])
    })
  })
}