import React, { useEffect } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/ja'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import PopupPresenter from '../../../mocks/PopupPresenter'
import CustomDatePicker from '../../../../components/molecules/CustomDatePicker'

export default {
  title: 'components/organisms/CustomDatePicker/default',
  component: CustomDatePicker,
  decorators: [
    (story: any) => {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja" dateFormats={{ monthAndYear: 'YYYY年 MM月' }}>
          <section>{story()}</section>
          <PopupPresenter names={['popup']} />
        </LocalizationProvider>
      ) as JSX.Element
    }
  ]
} as ComponentMeta<typeof CustomDatePicker>

const Template1: ComponentStory<typeof CustomDatePicker> = (args) => <CustomDatePicker {...args} />

export const Pt001 = Template1.bind({})
const value = '2023/07/03'
const actionBarId = 'hoge'
const openPickerButtonId = 'fuga'
let openPickerButtonRef = null
const setOpenPickerButtonRef = (node: HTMLButtonElement) => {
  openPickerButtonRef = node
}
const popperId = 'hogefuga'
let popperRef = null
const setPopperRef = (node: HTMLDivElement) => {
  popperRef = node
}
const textFieldId = 'fugahoge'
let inputRef = null
const setInputRef = (node: HTMLInputElement) => {
  inputRef = node
}
const className = 'testClassName'
Pt001.args = {
  value,
  slotProps: {
    actionBar: {
      id: actionBarId
    },
    openPickerButton: {
      id: openPickerButtonId,
      ref: setOpenPickerButtonRef
    },
    popper: {
      id: popperId,
      ref: setPopperRef
    },
    textField: {
      id: textFieldId
    }
  },
  inputRef: setInputRef,
  className,
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
