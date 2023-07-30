import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { WithImageChips } from '../../../../components/molecules/Chips'
import Icon from '../../../images/division_tw_icon_a.jpg'

export default {
  title: 'components/molecules/Chips/WithImageChips',
  component: WithImageChips,
  decorators: [
    (story) => (
      <section
        style={{
          width: '279px',
          height: '47px',
          display: 'flex',
          alignItems: 'end'
        }}
      >
        {story()}
      </section>
    )
  ]
} as ComponentMeta<typeof WithImageChips>

const Template1: ComponentStory<typeof WithImageChips> = args => <WithImageChips {...args} />

const upperStrS = 'MTTR'
const lowerStrS = 'agent'
const upperStrL = 'MTTReeeeeeeeeeeeeeeeeeeee'
const lowerStrL = 'agent-joeyeeeeeeeeeeeeeeeeeeee'

export const Pt001 = Template1.bind({})
const className = 'test-clss'
const testData = 'test-data'
Pt001.args = {
  names: [
    upperStrS
  ],
  src: Icon,
  className,
  testdata: testData,
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const chips = canvas.getByTestId('with-image-chips')
  
  // No.001
  expect(within(chips).queryByText(upperStrS)).not.toBeNull()
  expect(within(chips).queryByTestId('lower-name')).toBeNull()

  // No.002
  const image = canvas.getByTestId('image')
  const src = image.getAttribute('src')
  const regex = /^.+\/division_tw_icon_a(\.[^.]+)*\.jpg$/
  expect(regex.test(src!)).toBe(true)

  // No.003
  expect(chips).toHaveClass(className)

  // No.004
  const dataStr = chips.getAttribute('testdata')
  expect(dataStr).toBe(testData)

  // No.005
  expect(within(chips).queryByTestId('delete-ico')).toBeNull()
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
  
  // No.006
  expect(canvas.getByTestId('upper-name').innerText).toBe(upperStrS)
  expect(canvas.getByTestId('lower-name').innerText).toBe(lowerStrS)
}

export const Pt003 = Template1.bind({})
Pt003.args = {
  names: [
    upperStrL,
    lowerStrL
  ],
  src: Pt001.args.src,
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.008
  expect(canvas.getByTestId('right-content').clientWidth).toBe(200)
}

export const Pt004 = Template1.bind({})
let hasDelete = false
const onDelete = () => hasDelete = true
Pt004.args = {
  names: [
    upperStrL,
    lowerStrL
  ],
  src: Pt001.args.src,
  onDelete
}
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.010
  await userEvent.click(canvas.getByTestId('delete-ico'))
  expect(hasDelete).toBe(true)
}