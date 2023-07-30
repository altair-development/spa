import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { CancelButton } from '../../../../components/atoms/Button/index'
import styles from '../../../../components/atoms/Button/styles.module.scss'

export default {
  title: 'components/atoms/Button/CancelButton',
  component: CancelButton,
  decorators: [
    (story) => (
      <section
        style={{
          width: '139px',
          height: '47px'
        }}
      >{story()}</section>
    )
  ]
} as ComponentMeta<typeof CancelButton>


const Template1: ComponentStory<typeof CancelButton> = (args) => <CancelButton {...args} />
export const Pt001 = Template1.bind({})
Pt001.args = {
  children: 'キャンセル'
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('button')

  // No.007
  expect(elem).toHaveClass(styles.cancel)
}