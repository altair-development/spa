import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Chips from '../../../../components/molecules/Chips'

export default {
  title: 'components/molecules/Chips/default',
  component: Chips,
  decorators: [
    (story) => (
      <section
        style={{
          width: '635px',
          height: '33px',
          display: 'flex',
          alignItems: 'end'
        }}
      >
        {story()}
      </section>
    )
  ]
} as ComponentMeta<typeof Chips>

const Template1: ComponentStory<typeof Chips> = args => <Chips {...args} />

export const Pt001 = Template1.bind({})
const children = 'abcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyz'
const className = 'test-clss'
const testData = 'test-data'
Pt001.args = {
  className,
  children,
  testdata: testData,
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const chips = canvas.getByTestId('chips')
  
  // No.001
  expect(chips).toHaveClass(className)

  // No.002
  expect(canvas.queryByText(children)).not.toBeNull()

  // No.003
  const dataStr = chips.getAttribute('testdata')
  expect(dataStr).toBe(testData)

  // No.004
  expect(within(chips).queryByTestId('delete-ico')).toBeNull()
}

export const Pt002 = Template1.bind({})
let hasDelete = false
const onDelete = () => hasDelete = true
Pt002.args = {
  children: Pt001.args.children,
  onDelete
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.005
  await userEvent.click(canvas.getByTestId('delete-ico'))
  expect(hasDelete).toBe(true)
}

// No.006
export const Pt003 = Template1.bind({})
Pt003.args = {
  children: Pt001.args.children,
}