import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw'
import { MockStore } from '../../../mocks/MockStore'
import PopupPresenter from '../../../mocks/PopupPresenter'
import { AuthSliceStateType } from 'SliceStateTypes'
import Header from '../../../../components/organisms/Header'
import { LoadingState } from '../../../../const'
import UserImage from '../../../images/division_tw_icon_a.jpg'
import { getCssCustomPropValue } from '../../../../utils'

export default {
  title: 'components/organisms/Header/default',
  component: Header,
  parameters: {
    msw: {
      handlers: [
        rest.get('http://localhost:3000/api/users/getProfileImage', async (_, res, ctx) => {
          const imageBuffer = await fetch(UserImage as unknown as URL).then((res) =>
            res.arrayBuffer(),
          )
          return res(
            ctx.set('Content-Length', imageBuffer.byteLength.toString()),
            ctx.set('Content-Type', 'image/jpeg'),
            // Respond with the "ArrayBuffer".
            ctx.body(imageBuffer),
          )
        }),
        rest.get('http://localhost:3000/api/users/logout', (req, res, ctx) => {
          return res()
        }),
      ],
    },
  }
} as ComponentMeta<typeof Header>

type GetDecoratorProps = {
  authState: AuthSliceStateType,
}
const getDecorator = ({
  authState,
}: GetDecoratorProps) => (story: any) => (
  <MockStore
    authState={authState}
    errorsState={{
      error: null
    }}
  >
    {story()}
    <PopupPresenter names={['popup', 'dialog']}  />
  </MockStore>
)  as JSX.Element

const Template1: ComponentStory<typeof Header> = () => <Header />

export const Pt001 = Template1.bind({})
Pt001.decorators = [
  getDecorator({
    authState: {
      me: null,
      loading: LoadingState.IDLE,
    },
  })
]
Pt001.parameters = {
  componentSize: {
    width: '100%',
    height: '50px'
  }
}
Pt001.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.001
  const upperName = canvas.getByTestId('upper-name')
  expect(upperName.innerText).toBe('')

  // No.002
  const titleLogo = canvas.getByTestId('title-logo')
  let definedW = null
  let definedH = null
  let match = getCssCustomPropValue('--title-logo-w').match(/^(\d+)px$/)
  if (match) {
    definedW = Number(match[1])
    const width = titleLogo.clientWidth
    expect(Number(width)).toBe(definedW)

    match = getCssCustomPropValue('--title-logo-h').match(/^(\d+)px$/)
    if (match) {
      definedH = Number(match[1])
      const height = titleLogo.clientHeight
      expect(Number(height)).toBe(definedH)
    } else {
      throw new Error()
    }
  } else {
    throw new Error()
  }
}

export const Pt002 = Template1.bind({})
const id = 'xxxxxxxxxx'
const name = 'テストユーザー'
Pt002.decorators = [
  getDecorator({
    authState: {
      me: {
        id,
        name,
        email: '',
        created: '',
        modified: ''
      },
      loading: LoadingState.IDLE,
    },
  })
]
Pt002.parameters = Pt001.parameters
Pt002.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.003
  const upperName = canvas.getByTestId('upper-name')
  expect(upperName.innerText).toBe(name)

  // No.004
  const titleLogo = canvas.getByTestId('title-logo')
  const src = titleLogo.getAttribute('src')
  const regex = /^.+\/title-logo(\.[^.]+)*\.png$/
  expect(regex.test(src!)).toBe(true)
}

export const Pt003 = Template1.bind({})
Pt003.decorators = Pt002.decorators
Pt003.parameters = {
  componentSize: {
    width: '100%',
    height: '90px'
  }
}
Pt003.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.005
  const selector = canvas.getByTestId('origin-el-wrapper')
  userEvent.click(selector)
  await waitFor(async () => {
    const popper = canvas.queryByTestId('popper-el-wrapper')
    expect(popper).not.toBeNull()
    expect(within(popper!).queryByText('ログアウト')).not.toBeNull()
  })
}

export const Pt004 = Template1.bind({})
let routerPush = false
Pt004.parameters = {
  nextRouter: {
    push: () => {
      routerPush = true
    },
  },
  componentSize: {
    ...Pt003.parameters.componentSize
  }
}
Pt004.decorators = Pt002.decorators
Pt004.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.006
  const selector = canvas.getByTestId('origin-el-wrapper')
  userEvent.click(selector)
  await waitFor(async () => {
    const popper = canvas.queryByTestId('popper-el-wrapper')
    const anchor = within(popper!).queryByText('ログアウト')
    userEvent.click(anchor!)
    await waitFor(async () => {
      const upperName = canvas.getByTestId('upper-name')
      expect(upperName.innerText).toBe('')

      // No.007
      expect(routerPush).toBe(true)
    })
  })
}

export const Pt005 = Template1.bind({})
Pt005.decorators = Pt002.decorators
Pt005.parameters = {
  msw: {
    handlers: [
      rest.get('http://localhost:3000/api/users/getProfileImage', async (_, res, ctx) => {
        const imageBuffer = await fetch(UserImage as unknown as URL).then((res) =>
          res.arrayBuffer(),
        )
        return res(
          ctx.set('Content-Length', imageBuffer.byteLength.toString()),
          ctx.set('Content-Type', 'image/jpeg'),
          // Respond with the "ArrayBuffer".
          ctx.body(imageBuffer),
        )
      }),
      rest.get('http://localhost:3000/api/users/logout', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    ],
  },
  componentSize: {
    width: '100%',
    height: '1000px'
  }
}
Pt005.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  
  // No.008
  const selector = canvas.getByTestId('origin-el-wrapper')
  userEvent.click(selector)
  await waitFor(async () => {
    const popper = canvas.queryByTestId('popper-el-wrapper')
    const anchor = within(popper!).queryByText('ログアウト')
    userEvent.click(anchor!)
    await waitFor(async () => {
      const dialog = canvas.queryByTestId('dialog')
      expect(dialog).not.toBeNull()
    })
  })
}