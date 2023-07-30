import React, { useState, useCallback } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import PopupPresenter from '../../../mocks/PopupPresenter'
import { ClickAwayPopper, Origin, Popper, popperWStyleUnify, popperMarginTop } from '../../../../components/atoms/Popup'

export default {
  title: 'components/atoms/Popup/ClickAwayPopper',
  component: ClickAwayPopper
} as ComponentMeta<typeof ClickAwayPopper>

const wrapperFactory = (style: any) => function Wrapper(story: any) {
  return (
    <section
      style={{
        width: '316px', 
        height: '425px'
      }}
    >
      <section style={style}>{story()}</section>
      <PopupPresenter names={['popup']}  />
    </section>
  )
}

const ClickAwayPopperFactory = ({
  originClassName,
  popperClassName,
  originProps,
  popperProps,
  popperWStyle
}: any) => {
  const [open, setOpen] = useState<boolean>(false)
  const onClickOutside = useCallback(() => {
    setOpen(false)
  }, [])
  const onClickOrigin = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <ClickAwayPopper
      originClassName={originClassName}
      popperClassName={popperClassName}
      originProps={originProps}
      popperProps={popperProps}
      popperWStyle={popperWStyle}
      handleOpen={open}
      onClickOutside={onClickOutside}
    >
      <Origin>
        <p onClick={onClickOrigin} data-testid="test-origin-el">Origin</p>
      </Origin>
      <Popper>
        <p
          data-testid="test-popper-el"
          style={{overflowWrap: 'break-word'}}
        >
          <a>abcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyzabcdefghijklmnobqrstuvwxyz</a>
        </p>
      </Popper>
    </ClickAwayPopper>
  )
} 

const Template1: ComponentStory<typeof ClickAwayPopper> = args => <ClickAwayPopperFactory {...args} />

export const Pt001 = Template1.bind({})
const originClassName = 'test-origin-classnm'
const popperClassName = 'test-popper-classnm'
const originProps = {
  test: 'test origin props'
}
const popperProps = {
  test: 'test popper props'
}
Pt001.args = {
  originClassName,
  popperClassName,
  originProps,
  popperProps,
  popperWStyle: popperWStyleUnify
}
Pt001.decorators = [
  wrapperFactory({ width: '311px' })
]
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const origin = canvas.getByTestId('test-origin-el')

  // No.001
  expect(origin).toBeInTheDocument()

  // No.002
  // No.005
  let popper: HTMLElement | null = null
  await userEvent.click(origin)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).not.toBeNull()
  })

  // No.007
  const originWrapper = canvas.getByTestId('origin-el-wrapper')
  expect(originWrapper).toHaveClass(originClassName)

  // No.008
  const popperWrapper = canvas.getByTestId('popper-el-wrapper')
  expect(popperWrapper).toHaveClass(popperClassName)

  // No.009
  expect(originWrapper.getAttribute('test')).toBe(originProps.test)

  // No.010
  expect(popperWrapper.getAttribute('test')).toBe(popperProps.test)

  // No.012
  const originW = origin.clientWidth
  const popperW = popper!.clientWidth
  expect(originW).toBe(popperW)

  // No.013
  const originB = origin.getBoundingClientRect().bottom
  await waitFor(() => {
    const position = popper!.getBoundingClientRect()
    expect(originB + popperMarginTop).toBe(position.y)
  })
}

export const Pt002 = Template1.bind({})
Pt002.args = {
  originClassName: undefined,
  popperClassName: undefined,
  originProps: undefined,
  popperProps: undefined,
  popperWStyle: undefined
}
Pt002.decorators = [
  wrapperFactory({
    width: '311px',
    position: 'absolute',
    bottom: 0,
    left: 0
  })
]
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const origin = canvas.getByTestId('test-origin-el')

  // No.011
  // No.014
  let popper: HTMLElement | null = null
  await userEvent.click(origin)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).not.toBeNull()
  })
  const originW = origin.clientWidth
  const popperW = popper!.clientWidth
  expect(originW).not.toBe(popperW)

  // No.015
  const originY = origin.getBoundingClientRect().y
  await waitFor(() => {
    const position = popper!.getBoundingClientRect()
    expect(position.bottom + popperMarginTop).toBe(originY)
  })
}

export const Pt003 = Template1.bind({})
Pt003.args = Pt002.args
Pt003.decorators = [
  wrapperFactory({
    width: '311px',
    position: 'absolute',
    top: 0,
    left: 0
  })
]
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const origin = canvas.getByTestId('test-origin-el')

  let popper: HTMLElement | null = null
  await userEvent.click(origin)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).not.toBeNull()
  })

  // No.016
  await waitFor(() => {
    const position = popper!.getBoundingClientRect()
    expect(position.left).toBe(0)
  })
}

export const Pt004 = Template1.bind({})
Pt004.args = Pt002.args
Pt004.decorators = [
  wrapperFactory({
    width: '311px',
    position: 'absolute',
    top: 0,
    right: 0
  })
]
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const origin = canvas.getByTestId('test-origin-el')

  let popper: HTMLElement | null = null
  await userEvent.click(origin)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).not.toBeNull()
  })

  // No.017
  await waitFor(() => {
    const { right } = popper!.getBoundingClientRect()
    expect(Math.floor(right)).toBe(document.documentElement.clientWidth)
  })
}

export const Pt005 = Template1.bind({})
Pt005.args = Pt002.args
Pt005.decorators = Pt001.decorators
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const origin = canvas.getByTestId('test-origin-el')

  // No.003
  // No.004
  let popper: HTMLElement | null = null
  await userEvent.click(origin)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).not.toBeNull()
  })
  await userEvent.click(document.body)
  await waitFor(() => {
    popper = canvas.queryByTestId('test-popper-el')
    expect(popper).toBeNull()
  })

}

export const Pt006 = Template1.bind({})
Pt006.args = Pt002.args
Pt006.decorators = Pt001.decorators
Pt006.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)

  // No.006
  const popper = canvas.queryByTestId('test-popper-el')
  expect(popper).toBeNull()
}