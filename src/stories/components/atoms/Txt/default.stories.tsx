import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import {
  getFontColorAtHex,
  getFontSize,
  getRootFontSize,
  getCharSizeMagnification,
  getCssCustomPropValue
} from '../../../../utils'
import Txt from '../../../../components/atoms/Txt/index'

export default {
  title: 'components/atoms/Txt/default',
  component: Txt,
} as ComponentMeta<typeof Txt>


const Template1: ComponentStory<typeof Txt> = (args) => <Txt {...args} />
export const Pt001 = Template1.bind({})
const childString = 'hoge'
Pt001.args = {
  className: 'test',
  children: childString
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('html-elem')

  // No.002
  expect(elem).toHaveClass('test')

  // No.003
  expect(elem.textContent).toBe(childString)

  const color = getFontColorAtHex(elem)
  const definedColor = getCssCustomPropValue('--color-text')
  // No.004
  expect(color).toBe(definedColor)

  const rootFontSize = getRootFontSize()
  const rem = getCharSizeMagnification('--font-size-m')
  const fontSize = getFontSize(elem)
  // No.006
  expect(rootFontSize * rem).toBe(fontSize)
}
export const Pt002 = Template1.bind({})
Pt002.args = {
  tag: 'a',
  size: 's',
  children: 'hoge'
}
Pt002.play = async ({ canvasElement }) => {
  // No.001
  const findElem = document.querySelector("a[data-testid='html-elem']")
  expect(findElem).not.toBeNull()

  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('html-elem')

  const rootFontSize = getRootFontSize()
  const rem = getCharSizeMagnification('--font-size-s')
  const fontSize = getFontSize(elem)
  // No.005
  expect(rootFontSize * rem).toBe(fontSize)
}
export const Pt003 = Template1.bind({})
Pt003.args = {
  size: 'l',
  children: 'hoge'
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('html-elem')

  const rootFontSize = getRootFontSize()
  const rem = getCharSizeMagnification('--font-size-l')
  const fontSize = getFontSize(elem)
  // No.007
  expect(rootFontSize * rem).toBe(fontSize)
}
