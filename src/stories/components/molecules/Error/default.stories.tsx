import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import Error from '../../../../components/molecules/Error'

export default {
  title: 'components/molecules/Error/default',
  component: Error,
  decorators: [
    story => (
      <section style={{width: '100px'}}>
        {story()}
      </section>
    )
  ]
} as ComponentMeta<typeof Error>

const Template1: ComponentStory<typeof Error> = (args) => <Error {...args} />
export const Pt001 = Template1.bind({})
const className = 'class-nm'
Pt001.args = {
  list: [
    'メールアドレスの形式が正しくありません。',
    'The email address format is incorrect.',
    '1234567891011121314151617181920'
  ],
  className: className
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const error = await canvas.getByTestId('error')
  const errors = await canvas.findAllByTestId('html-elem')
  
  // No.001
  expect(errors.length).toBe(Pt001.args!.list!.length)

  // No.002
  expect(error).toHaveClass(className)
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  list: [],
}
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const error = await canvas.getByTestId('error')
  
  // No.003
  expect(error).toBeInTheDocument()

  // No.004
  expect(error.childElementCount).toBe(0)
}