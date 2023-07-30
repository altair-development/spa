import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Card from '../../../../components/atoms/Card/index'
import styles from '../../../../components/atoms/Card/styles.module.scss'

export default {
  title: 'components/atoms/Card/default',
  component: Card,
} as ComponentMeta<typeof Card>


const Template1: ComponentStory<typeof Card> = (args) => <Card {...args} />
export const Pt001 = Template1.bind({})
const tag = 'div'
const children = 'hoge'
const className = 'test-class'
const propName = 'test'
const propValue = 'hoge'
Pt001.args = {
  tag,
  className,
  children,
  [propName]: propValue
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  // No.001
  const findElem = document.querySelector(tag + "[data-testid='card']")
  expect(findElem).not.toBeNull()
  
  // No.002
  const elem = canvas.getByTestId('card')
  expect(elem).toHaveClass(className)

  // No.003
  expect(elem.textContent).toBe(children)

  // No.004
  expect(elem.getAttribute(propName)).toBe(propValue)

  // No.005
  expect(elem).toHaveClass(styles.card)
}

export const Pt002 = Template1.bind({})
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('card')
  // No.006
  expect(elem.tagName.toLowerCase()).toBe('section')
}