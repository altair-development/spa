import React, { useCallback, useState, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor, fireEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import TextField from '../../../../components/atoms/TextField/index'
import styles from '../../../../components/atoms/TextField/styles.module.scss'

export default {
  title: 'components/atoms/TextField/default',
  component: TextField,
} as ComponentMeta<typeof TextField>

const childString = 'hoge'
const testClss = 'test-clss'
const placeholder = '入力してください。'
const Wrapper = () => {
  const [inputTxt, setInputTxt] = useState(childString)
  const [elemW, setElemW] = useState<number>()
  const ref = useRef<Element | null>()

  const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputTxt(target.value)
  }, [setInputTxt])

  const setW = useCallback((node: Element | null) => {
    if (node) {
      setElemW(node!.clientWidth)
      ref.current = node
    } else {
      ref.current = node
    }
  }, [ref, setElemW])
  return (
    <>
      <TextField className={testClss} onChange={handleChange} placeholder={placeholder} valur={inputTxt} ref={setW} />
      <p data-testid="disp-w">{elemW}</p>
    </>
  )
}
const Template1: ComponentStory<typeof TextField> = () => <Wrapper />
export const Pt001 = Template1.bind({})
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem: HTMLInputElement = canvas.getByTestId('text-field')

  // No.001
  expect(elem).toHaveClass(testClss)

  // No.002
  const findElem = canvas.getByPlaceholderText(placeholder)
  expect(findElem).not.toBeNull()

  // No.003
  const inputStr = 'hogefuga'
  await userEvent.type(elem, inputStr)
  await userEvent.tab()
  expect(elem.value).toBe(inputStr)

  // // No.004
  expect(String(elem.clientWidth)).toBe(canvas.getByTestId('disp-w').textContent)
}

const Template3: ComponentStory<typeof TextField> = () => <TextField />
export const Pt003 = Template3.bind({})
Pt003.decorators = [
  (Story) => <div style={{ padding: '1em' }}><Story/></div>
]
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem: HTMLInputElement = canvas.getByTestId('text-field')

  // No.007
  await elem.focus()
}