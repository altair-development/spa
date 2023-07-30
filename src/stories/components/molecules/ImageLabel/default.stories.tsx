import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import ImageLabel from '../../../../components/molecules/ImageLabel'
import Icon from '../../../images/division_tw_icon_a.jpg'
import { getComputedStyle, getCssCustomPropValue } from '../../../../utils'

export default {
  title: 'components/molecules/ImageLabel/default',
  component: ImageLabel,
} as ComponentMeta<typeof ImageLabel>

const Template1: ComponentStory<typeof ImageLabel> = args => <ImageLabel {...args} />

const upperStrS = 'MTTR'
const lowerStrS = 'agent'
const upperStrL = 'MTTReeeeeeeeeeeeeeeeeeeee'
const lowerStrL = 'agent-joeyeeeeeeeeeeeeeeeeeeee'

export const Pt001 = Template1.bind({})
const leftProps = {
  className: 'left-props-classNm',
  leftpropsargs: '左側パラメータ'
}
const rightProps = {
  className: 'right-props-classNm',
  rightpropsargs: '右側パラメータ'
}
const testData = 'test-data'
Pt001.args = {
  names: [
    upperStrS
  ],
  src: Icon,
  testdata: testData,
  leftProps,
  rightProps,
  imageRounded: true
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const imageLabel = canvas.getByTestId('image-label')
  
  // No.001
  expect(within(imageLabel).queryByText(upperStrS)).not.toBeNull()
  expect(within(imageLabel).queryByTestId('lower-name')).toBeNull()

  // No.002
  const image = canvas.getByTestId('image')
  const src = image.getAttribute('src')
  const regex = /^.+\/division_tw_icon_a(\.[^.]+)*\.jpg$/
  expect(regex.test(src!)).toBe(true)

  // No.003
  const dataStr = imageLabel.getAttribute('testdata')
  expect(dataStr).toBe(testData)

  // No.004
  expect(image.clientWidth).toBe(40)
  expect(image.clientHeight).toBe(40)

  // No.011
  const leftContent = canvas.getByTestId('left-content')
  expect(leftContent).toHaveClass(leftProps.className)

  // No.012
  expect(leftContent.getAttribute('leftpropsargs')).toBe(leftProps.leftpropsargs)

  // No.013
  const rightContent = canvas.getByTestId('right-content')
  expect(rightContent).toHaveClass(rightProps.className)

  // No.014
  expect(rightContent.getAttribute('rightpropsargs')).toBe(rightProps.rightpropsargs)

  // No.015
  const definedRadius = getCssCustomPropValue('--user-icon-radius')
  expect(getComputedStyle(image, 'border-radius')).toBe(definedRadius)

  // No.17
  expect(getComputedStyle(leftContent, 'margin-right')).toBe('15px')
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  names: [
    upperStrS,
    lowerStrS
  ],
  src: Pt001.args.src,
}
Pt002.play = async ({ canvasElement }) => {
  // No.007
  const canvas = within(canvasElement)
  
  // No.005
  expect(canvas.getByTestId('upper-name').innerText).toBe(upperStrS)
  expect(canvas.getByTestId('lower-name').innerText).toBe(lowerStrS)

  // NO.006
  expect(canvas.getByTestId('right-content').clientWidth).toBe(70)
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  names: [
    upperStrL
  ],
  src: Pt001.args.src,
  imageRounded: false
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.016
  const image = canvas.getByTestId('image')
  expect(getComputedStyle(image, 'border-radius')).toBe('0px')
}

export const Pt004 = Template1.bind({})
Pt004.args = {
  names: [
    upperStrL,
    lowerStrL
  ],
  src: Pt001.args.src,
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.009
  expect(canvas.getByTestId('right-content').clientWidth).toBe(200)
}