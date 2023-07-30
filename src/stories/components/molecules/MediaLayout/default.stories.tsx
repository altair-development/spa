import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import MediaLayout, { LeftContent, RightContent} from '../../../../components/molecules/MediaLayout'

export default {
  title: 'components/molecules/MediaLayout/default',
  component: MediaLayout,
} as ComponentMeta<typeof MediaLayout>

const Template1: ComponentStory<typeof MediaLayout> = (args) => <MediaLayout {...args} />
export const Pt001 = Template1.bind({})
const className = 'test'
const dataTest = 'data-hoge'
const leftStr = 'テスト文字列左'
const rightStr = 'テスト文字列右'
const leftProps = {
  className: 'left-props-classNm'
}
const rightProps = {
  className: 'right-props-classNm',
  rightpropsargs: '右側パラメータ'
}
Pt001.args = {
  className,
  datatest: dataTest,
  children: [
    <LeftContent key="0">
      <p>{leftStr}</p>
    </LeftContent>,
    <RightContent key="0">
      <p>{rightStr}</p>
    </RightContent>,
  ],
  leftProps,
  rightProps
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const flexbox = canvas.getByTestId('flexbox')
  
  // No.001
  expect(flexbox).toHaveClass(className)
  
  // No.002
  const leftContent = canvas.getByTestId('left-content')
  let findEl = within(leftContent).queryByText(leftStr)
  expect(findEl).not.toBeNull()
  
  // No.003
  const rightContent = canvas.getByTestId('right-content')
  findEl = within(rightContent).queryByText(rightStr)
  expect(findEl).not.toBeNull()

  // No.004
  expect(leftContent).toHaveClass(leftProps.className)

  // No.005
  expect(rightContent).toHaveClass(rightProps.className)
  
  // No.006
  expect(flexbox.getAttribute('datatest')).toBe(dataTest)

  // No.007
  expect(rightContent.getAttribute('rightpropsargs')).toBe(rightProps.rightpropsargs)
}

// No.007
export const Pt002 = Template1.bind({})
Pt002.args = {
  children: Pt001.args.children
}