import React, { useCallback } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Img from '../../../../components/atoms/Img/index'
import logo from '../../../images/test-logo.svg'

export default {
  title: 'components/atoms/Img/default',
  component: Img,
} as ComponentMeta<typeof Img>

const Template1: ComponentStory<typeof Img> = (args) => <Img {...args} />
export const Pt001 = Template1.bind({})
const srcPt001 = logo
const classNamePt001 = 'test'
const widthPt001 = 100
const heightPt001 = 150
const altPt001 = 'hoge'
const dataTest = 'data-hoge'
Pt001.args = {
  className: classNamePt001,
  src: srcPt001,
  width: widthPt001,
  height: heightPt001,
  alt: altPt001,
  datatest: dataTest
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  
  // No.001
  const src = image.getAttribute('src')
  const regex = /^.+\/test-logo(\.[^.]+)*\.svg$/
  expect(regex.test(src!)).toBe(true)

  // No.002
  const width = image.getAttribute('width')
  expect(Number(width)).toBe(widthPt001)

  // No.003
  const height = image.getAttribute('height')
  expect(Number(height)).toBe(heightPt001)

  // No.004
  const alt = image.getAttribute('alt')
  expect(alt).toBe(altPt001)

  // No.005
  const dataStr = image.getAttribute('datatest')
  expect(dataStr).toBe(dataTest)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  src: Pt001.args.src,
  alt: Pt001.args.alt,
  width: Pt001.args.width,
  height: Pt001.args.height
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // No.007
  expect(canvas.getByTestId('image')).toBeInTheDocument()
}

let value = 0
export const Pt003: ComponentStory<typeof Img> = (args) => {
  const setValue = useCallback((node: Element | null) => {
    if (node) {
      value = node.clientWidth
    }
  }, [])
  return <Img {...args} ref={setValue} />
}
Pt003.args = {
  src: Pt001.args.src,
  alt: Pt001.args.alt,
  width: Pt001.args.width,
  height: Pt001.args.height
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  // No.006
  expect(value).toBe(image.clientWidth)
}

export const Pt004 = Template1.bind({})
Pt004.args = {
  src: 'https://doope.jp/media/22q2/img8387y_01.jpg',
  alt: 'オンライン画像',
  width: 700,
  height: 342
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  
  // No.008
  const width = image.clientWidth
  expect(Number(width)).toBe(700)
  const height = image.clientHeight
  expect(Number(height)).toBe(342)
}