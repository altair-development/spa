import React, { useCallback, useState, useMemo } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor, fireEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { Panel } from '../../../../components/atoms/Radio'
import * as defaultStories from './default.stories'
import { ListDataType } from './default.stories'

export default {
  title: 'components/atoms/Radio/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>

let changeValue = ''
const data: ListDataType = defaultStories.Pt001.args!.data
const styles = { marginRight: '0.625em'}
const className = 'test-clss'
const argValue = 'test'

export const Pt001: ComponentStory<typeof Panel> = args => {
  const [val, setVal] = useState<string | null>(args.value)
  const handleOnChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    changeValue = target.value
    setVal(target.value)
  }, [])

  return (
    <section style={{width: '30%'}}>
      <ul style={{ display: 'flex' }}>
        {
          data.map(({ value, name }, idx) => {
            return idx !== (data.length -1) ? <Panel
            key={value}
            value={value} 
            displayName={name}
            onChange={handleOnChange}
            className={className}
            checked={value === val}
            style={styles}
            testarg={argValue}
          />
            :
            <Panel
              key={value}
              value={value} 
              displayName={name}
              onChange={handleOnChange}
              checked={value === val}
            />
          })
        }
      </ul>
    </section>
  )
}
Pt001.args = {
  value: data[1].value
}

Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const listItems = await canvas.findAllByTestId('radio-label')
  const firstItem = listItems[0]
  const secondItem = listItems[1]

  // No.004
  expect(secondItem.getElementsByTagName('input')[0].checked).toBe(true)

  // No.001
  const { value, name } = data[0]
  const inputEl = firstItem.querySelector("input[id='" + value + "']") as HTMLInputElement
  expect(inputEl).not.toBeNull()
  expect(inputEl.value).toBe(value)
  const labelEl = firstItem.querySelector("label[for='" + value + "']") as HTMLElement
  expect(labelEl).not.toBeNull()

  // No.002
  expect(await within(firstItem).findByText(name)).not.toBeNull()

  // No.003
  await userEvent.click(labelEl)
  expect(inputEl.checked).toBe(true)

  // No.005
  expect(firstItem).toHaveClass(className)

  // No.006
  expect(firstItem.getAttribute('testarg')).toBe(argValue)
}