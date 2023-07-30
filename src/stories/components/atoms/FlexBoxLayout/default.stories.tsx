import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import FlexBoxLayout from '../../../../components/atoms/FlexBoxLayout/index'

export default {
  title: 'components/atoms/FlexBoxLayout/default',
  component: FlexBoxLayout,
} as ComponentMeta<typeof FlexBoxLayout>

const Template1: ComponentStory<typeof FlexBoxLayout> = (args) => <FlexBoxLayout {...args} />
export const Pt001 = Template1.bind({})
const FlexItems = () => (
  <>
    <section style={{width: '50%', backgroundColor: 'blue'}} data-testid="item1">
      <h3>hoge1</h3>
      <p>fuga1</p>
    </section>
    <section id="id-fuga" style={{width: '50%', backgroundColor: 'green'}} data-testid="item2">
      <h3>hoge2</h3>
      <p>fuga2</p>
    </section>
    <section id="id-fuga" style={{width: '50%', backgroundColor: 'red'}} data-testid="item3">
      <h3>hoge3</h3>
      <p>fuga3</p>
    </section>
  </>
)
const classNames = 'test-clss'
const propName = 'test'
const propValue = 'hoge'
Pt001.args = {
  className: classNames,
  children: <FlexItems />,
  style: {
    border: '1px solid #000'
  },
  [propName]: propValue
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('flex-box-layout')

  // No.001
  expect(elem).toHaveClass(classNames)
  
  // No.002
  expect(elem.getAttribute(propName)).toBe(propValue)

  // No.004
  const item1 = canvas.getByTestId('item1')
  const item2 = canvas.getByTestId('item2')
  const item1T = item1.getBoundingClientRect().top
  const item2T = item2.getBoundingClientRect().top
  expect(item1T).toBe(item2T)

  // No.005
  const item3 = canvas.getByTestId('item3')
  const item1H = item1.getBoundingClientRect().height
  const item3T = Math.floor(item3.getBoundingClientRect().top)
  const item3TCalc = Math.floor(item1T + item1H)
  expect(item3T).toBe(item3TCalc)
}

export const Pt002 = Template1.bind({})
const FlexItems2 = () => (
  <>
    <section style={{width: '50%', backgroundColor: 'blue'}} data-testid="item1">
      <h3>hoge1</h3>
      <p>fuga1</p>
    </section>
    <section id="id-fuga" style={{width: '50%', backgroundColor: 'green'}} data-testid="item2">
      <h3>hoge2</h3>
      <p>fuga2</p>
    </section>
    <section id="id-fuga" style={{width: '50%', backgroundColor: 'red'}} data-testid="item3">
      <h3>hoge3</h3>
      <p>fuga3</p>
    </section>
  </>
)
Pt002.args = {
  children: <FlexItems2 />,
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('flex-box-layout')

  // No.003
  expect(elem.childElementCount > 0).toBe(true)
}