import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { getComputedStyle, getCssCustomPropValue } from '../../../../utils'
import UserIcon, { alternative } from '../../../../components/molecules/UserIcon'
import logo from '../../../images/division_tw_icon_a.jpg'

export default {
  title: 'components/molecules/UserIcon/default',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template1: ComponentStory<typeof UserIcon> = (args) => <UserIcon {...args} />
export const Pt001 = Template1.bind({})
const srcPt001 = logo
const classNamePt001 = 'test'
const widthPt001 = 100
const heightPt001 = 100
const dataTest = 'data-hoge'
Pt001.args = {
  className: classNamePt001,
  src: srcPt001,
  width: widthPt001,
  height: heightPt001,
  datatest: dataTest
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  
  // No.001
  const src = image.getAttribute('src')
  const regex = /^.+\/division_tw_icon_a(\.[^.]+)*\.jpg$/
  expect(regex.test(src!)).toBe(true)

  // No.002
  const width = image.getAttribute('width')
  expect(Number(width)).toBe(widthPt001)

  // No.003
  const height = image.getAttribute('height')
  expect(Number(height)).toBe(heightPt001)

  // No.004
  expect(image).toHaveClass(classNamePt001)

  // No.005
  const dataStr = image.getAttribute('datatest')
  expect(dataStr).toBe(dataTest)

  // No.006
  const definedRadius = getCssCustomPropValue('--user-icon-radius')
  const imageRadius = getComputedStyle(image, 'border-radius')
  expect(imageRadius).toBe(definedRadius)

  // No.007
  const alt = image.getAttribute('alt')
  expect(alt).toBe(alternative)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  src: Pt001.args.src,
  width: Pt001.args.width,
  height: Pt001.args.height,
  rounded: true
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  
  // No.008
  const definedRadius = getCssCustomPropValue('--user-icon-radius')
  const imageRadius = getComputedStyle(image, 'border-radius')
  expect(imageRadius).toBe(definedRadius)
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  ...Pt002.args,
  rounded: false
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const image = canvas.getByTestId('image')
  
  // No.009
  const imageRadius = getComputedStyle(image, 'border-radius')
  expect(imageRadius).toBe('0px')
}