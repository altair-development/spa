import React, { useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ja'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { rest } from 'msw'
import { MockStore } from '../../../mocks/MockStore'
import { useAppDispatch } from '../../../../redux/hooks'
import PopupPresenter from '../../../mocks/PopupPresenter'
import { AuthSliceStateType, ClansSliceStateType, ProjectsSliceStateType, ErrorsSliceStateType, HashParamsSliceStateType, MembersSliceStateType } from 'SliceStateTypes'
import { defaultinitialState as defaultClansState, selectRelatedClans } from '../../../../redux/clans/slice'
import { defaultinitialState as defaultAuthState, fetchUser } from '../../../../redux/auth/slice'
import { defaultinitialState as defaultProjectsState } from '../../../../redux/projects/slice'
import { defaultinitialState as defaultErrorsState } from '../../../../redux/errors/slice'
import { defaultinitialState as defaultHashParamsState } from '../../../../redux/hashParams/slice'
import { defaultinitialState as defaultMembersState } from '../../../../redux/members/slice'
import ErrorBoundary from '../../../../components/atoms/ErrorBoundary'
import CreateProjectDlg from '../../../../components/organisms/CreateProjectDlg'
import userData from './apiData/auth/fetchUser.json'
import clanData from './apiData/clans/selectRelatedClans.json'
import UserImage from '../../../images/division_tw_icon_a.jpg'
import projectData from './apiData/projects/create.json'

export default {
  title: 'components/organisms/CreateProjectDlg/default',
  component: CreateProjectDlg,
  parameters: {
    msw: {
      handlers: {
        'users/me': rest.get('http://localhost:3000/api/users/me', async (_, res, ctx) => {
          return res(ctx.json(userData))
        }),
        'clans/selectRelatedClans': rest.get('http://localhost:3000/api/clans/selectRelatedClans', async (_, res, ctx) => {
          return res(ctx.json(clanData))
        }),
        'users/getProfileImage': rest.get('http://localhost:3000/api/users/getProfileImage', async (_, res, ctx) => {
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
        'projects/create': rest.post('http://localhost:3000/api/projects/create', async (_, res, ctx) => {
          return res(ctx.json(projectData))
        }),
      },
    },
  }
} as ComponentMeta<typeof CreateProjectDlg>

type GetDecoratorProps = {
  authState: AuthSliceStateType,
  clansState: ClansSliceStateType,
  projectsState: ProjectsSliceStateType,
  errorsState: ErrorsSliceStateType,
  hashParamsState: HashParamsSliceStateType,
  membersState: MembersSliceStateType,
}
export function getDecorator (props: GetDecoratorProps) {
  return (story: any) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja" dateFormats={{ monthAndYear: 'YYYY年 MM月' }}>
        <MockStore
          {...props}
        >
          <ErrorBoundary>
            <section
              style={{
                width: '1000px',
                height: '1000px'
              }}
            >
              <section>{story()}</section>
            </section>
            <PopupPresenter names={['popup', 'dialog']} />
          </ErrorBoundary>
        </MockStore>
      </LocalizationProvider>
    ) as JSX.Element
  }
}

type WrapperProps = {
  children: React.ReactNode
}
const Wrapper = ({ children }: WrapperProps) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    (async () => {
      await dispatch(fetchUser()).unwrap()
      await dispatch(selectRelatedClans()).unwrap()
    })()
  }, [dispatch])

  return (
    <>
      {children}
    </>
  )
}

const Template1: ComponentStory<typeof CreateProjectDlg> = (args) => {
  return (
    <Wrapper>
      <CreateProjectDlg {...args} />
    </Wrapper>
  )
}

export const Pt001 = Template1.bind({})
Pt001.decorators = [
  getDecorator({
    authState: defaultAuthState,
    clansState: defaultClansState,
    projectsState: defaultProjectsState,
    errorsState: defaultErrorsState,
    hashParamsState: {
      ...defaultHashParamsState,
      clanId: '631b42659612dd9d052097ec'
    },
    membersState: defaultMembersState
  })
]
Pt001.args = {
  onClickOutside: () => console.log('onClickOutside'),
  onCancel: () => console.log('onCancel'),
  clanId: '631b42659612dd9d052097ec'
}
// Pt001.parameters = {
//   componentSize: {
//     width: '100%',
//     height: '50px'
//   }
// }
// Pt001.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
  
//   // No.001
//   const upperName = canvas.getByTestId('upper-name')
//   expect(upperName.innerText).toBe('')

//   // No.002
//   const titleLogo = canvas.getByTestId('title-logo')
//   let definedW = null
//   let definedH = null
//   let match = getCssCustomPropValue('--title-logo-w').match(/^(\d+)px$/)
//   if (match) {
//     definedW = match[1]
//     const width = titleLogo.clientWidth
//     expect(width).toBe(definedW)

//     match = getCssCustomPropValue('--title-logo-h').match(/^(\d+)px$/)
//     if (match) {
//       definedH = match[1]
//       const height = titleLogo.clientHeight
//       expect(height).toBe(definedH)
//     } else {
//       throw new Error()
//     }
//   } else {
//     throw new Error()
//   }
// }
