import React, { useCallback, useEffect, useState, useRef } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { getComputedStyle, rgbaToHex, getCssCustomPropValue, isTestRunner } from '../../../../utils'
import TextArea from '../../../../components/atoms/TextArea'

export default {
  title: 'components/atoms/TextArea/default',
  component: TextArea,
  parameters: {
    testRunner: {
      disable: true
    },
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (story) => {
      return (
        <section style={{ width: '1007px' }}>
          {story()}
        </section>
      )
    }
  ]
} as ComponentMeta<typeof TextArea>

const Template1: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />

export const Pt001 = Template1.bind({})
const className = 'test-clss'
const placeholder = 'ダミー文字列'
const testarg = 'testarg'
let refFlg = false
const setRef = () => refFlg = true
Pt001.args = {
  className,
  placeholder,
  testarg,
  ref: setRef
}
Pt001.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.001
    expect(textarea).toHaveClass(className)

    // No.002
    const findElem = canvas.getByPlaceholderText(placeholder)
    expect(findElem).not.toBeNull()

    // No.004
    expect(textarea.getAttribute('testarg')).toBe(testarg)

    // No.006
    expect(refFlg).toBe(true)

    // No.011
    const borderColor = getComputedStyle(textarea, 'border-color')
    const definedBorderColor = getCssCustomPropValue('--color-border-text-field')
    expect(rgbaToHex(borderColor)).toBe(definedBorderColor)
  }
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  style: {
    minHeight: 'calc(1.5em + 2px + 0.75em)',
    height: 'calc(1.5em + 2px + 0.75em)'
  }
}

const Template2: ComponentStory<typeof TextArea> = ({ style, initValue }) => {
  initValue = initValue ? initValue : ''
  const [value, setValue] = useState<string>(initValue)

  const onChangeFn: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(({ target }) => {
    setValue(target.value)
  }, [ setValue ])

  return (
    style ?
      <TextArea
        value={value}
        onChange={onChangeFn}
        style={style}
      />
      :
      <TextArea
        value={value}
        onChange={onChangeFn}
      />
  )
}

const inputVal = ''.padStart(223, 'a')
export const Pt003 = Template2.bind({})
Pt003.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.003
    // No.007
    await userEvent.type(textarea, inputVal)
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(85)
  }
}

export const Pt004 = Template2.bind({})
Pt004.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.008
    await userEvent.type(textarea, inputVal)
    expect(textarea.offsetHeight).toBe(85)
    userEvent.keyboard('{Backspace}')
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(62)
  }
}

export const Pt005 = Template2.bind({})
const inputVal2 = ''.padStart(112, 'a')
Pt005.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.009
    await userEvent.type(textarea, inputVal2)
    expect(textarea.offsetHeight).toBe(62)
    userEvent.keyboard('{Backspace}')
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(62)
  }
}

export const Pt006 = Template2.bind({})
Pt006.args = {
  style: {
    minHeight: '85px',
    height: '85px'
  }
}
Pt006.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.010
    await userEvent.type(textarea, inputVal)
    expect(textarea.offsetHeight).toBe(85)
    userEvent.keyboard('{Backspace}')
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(85)
  }
}

export const Pt007 = Template2.bind({})
Pt007.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.012
    textarea.focus()
  }
}

const Template3: ComponentStory<typeof TextArea> = ({ defaultValue }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  return (
    defaultValue ?
      <TextArea
        ref={ref}
        defaultValue={defaultValue}
      />
      :
      <TextArea
        ref={ref}
      />
  )
}

export const Pt008 = Template3.bind({})
Pt008.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.013
    await userEvent.type(textarea, inputVal)
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(85)
  }
}

export const Pt009 = Template3.bind({})
Pt009.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.014
    await userEvent.type(textarea, inputVal)
    expect(textarea.offsetHeight).toBe(85)
    userEvent.keyboard('{Backspace}')
    await userEvent.tab()
    expect(textarea.offsetHeight).toBe(62)
  }
}

const defaultValue = 'abc'
export const Pt010 = Template3.bind({})
Pt010.args = {
  defaultValue
}
Pt010.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea') as HTMLTextAreaElement

    // No.015
    expect(textarea.value).toBe(defaultValue)
    const updatedVal = 'd'
    await userEvent.type(textarea, updatedVal)
    expect(textarea.value).toBe(defaultValue + updatedVal)
  }
}

export const Pt011 = Template2.bind({})
Pt011.args = {
  initValue: inputVal
}
Pt011.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.007
    expect(textarea.offsetHeight).toBe(85)
  }
}

export const Pt012 = Template1.bind({})
Pt012.play = async ({ canvasElement }) => {
  if (!isTestRunner()) {
    const canvas = within(canvasElement)
    const textarea = canvas.getByTestId('textarea')

    // No.005
    expect(textarea).toBeInTheDocument()
  }
}