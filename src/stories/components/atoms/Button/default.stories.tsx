import React, { useCallback, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Button from '../../../../components/atoms/Button/index'
import styles from '../../../../components/atoms/Button/styles.module.scss'

export default {
  title: 'components/atoms/Button/default',
  component: Button,
  decorators: [
    (story) => (
      <section
        style={{
          width: '99px',
          height: '47px'
        }}
      >{story()}</section>
    )
  ]
} as ComponentMeta<typeof Button>

const childString = 'hoge'
const clickedString = 'done'
const testClss = 'test-clss'
const Wrapper = () => {
  const [str, setStr] = useState(childString)
  const handleClick = useCallback(() => {
    setStr(clickedString)
  }, [setStr])
  return <Button className={testClss} onClick={handleClick}>{str}</Button>
}
const Template1: ComponentStory<typeof Button> = () => <Wrapper />
export const Pt001 = Template1.bind({})
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('button')

  // No.001
  expect(elem.textContent).toBe(childString)

  // No.002
  expect(elem).toHaveClass(testClss)

  // No.003
  await userEvent.click(elem)
  await userEvent.tab()
  expect(elem.textContent).toBe(clickedString)

  // No.005
  expect(elem).toHaveClass(styles.default)
}
