import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import {
  getFontColorAtHex,
  getCssCustomPropValue
} from '../../../../utils'
import { ErrorTxt } from '../../../../components/atoms/Txt/index'
import * as TxtStories from './default.stories'

export default {
  title: 'components/atoms/Txt/ErrorTxt',
  component: ErrorTxt,
} as ComponentMeta<typeof ErrorTxt>


const Template1: ComponentStory<typeof ErrorTxt> = (args) => <ErrorTxt {...args} />
export const Pt001 = Template1.bind({})
Pt001.args = TxtStories.Pt001.args
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('html-elem')

  const color = getFontColorAtHex(elem)
  const definedColor = getCssCustomPropValue('--color-error')
  // No.008
  expect(color.toUpperCase()).toBe(definedColor)
}