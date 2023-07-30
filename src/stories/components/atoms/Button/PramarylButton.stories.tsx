import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { PrimaryButton } from '../../../../components/atoms/Button/index'
import styles from '../../../../components/atoms/Button/styles.module.scss'

export default {
  title: 'components/atoms/Button/PrimaryButton',
  component: PrimaryButton,
  decorators: [
    (story) => (
      <section
        style={{
          width: '93px',
          height: '47px'
        }}
      >{story()}</section>
    )
  ]
} as ComponentMeta<typeof PrimaryButton>


const Template1: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />
export const Pt001 = Template1.bind({})
Pt001.args = {
  children: '更新'
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const elem = canvas.getByTestId('button')

  // No.006
  expect(elem).toHaveClass(styles.primary)
}
