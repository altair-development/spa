import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import List from '../../../../components/atoms/List'

export default {
  title: 'components/atoms/List/default',
  component: List,
} as ComponentMeta<typeof List>


const Template1: ComponentStory<typeof List> = (args) => <List {...args} />
export const Pt001 = Template1.bind({})
const className = 'test-clss'
const children = (
  <>
    <li data-testid="list-item">リストアイテム１</li>
    <li data-testid="list-item">リストアイテム２</li>
    <li data-testid="list-item">リストアイテム３</li>
    <li data-testid="list-item">リストアイテム４</li>
    <li data-testid="list-item">リストアイテム５</li>
  </>
)
const test = 'test'
Pt001.args = {
  className,
  children,
  test
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('select-list')
  const listItems = canvas.queryAllByTestId('list-item')

  // No.001
  expect(listItems.length).not.toBe(0)

  // No.002
  expect(elem).toHaveClass(className)

  // No.003
  expect(elem.getAttribute('test')).toBe(test)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  children: Pt001.args.children
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('select-list')

  // No.004
  expect(elem).toBeInTheDocument()
}