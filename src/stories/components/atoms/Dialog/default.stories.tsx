import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import PopupPresenter from '../../../mocks/PopupPresenter'
import Dialog, { DialogTitle, DialogContent, DialogActions } from '../../../../components/atoms/Dialog/index'
import UpdateBtnArea from '../../../../components/molecules/UpdateBtnArea'

export default {
  title: 'components/atoms/Dialog/default',
  component: Dialog,
  decorators: [
    (story: any) => (
      <section
        style={{
          width: '1000px', 
          height: '1000px'
        }}
      >
        <section>{story()}</section>
        <PopupPresenter names={['dialog']}  />
      </section>
    )
  ]
} as ComponentMeta<typeof Dialog>

const Template1: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />
export const Pt001 = Template1.bind({})
const dialogTitle = (
  <DialogTitle>ダイアログタイトル</DialogTitle>
)
const dialogContent = (
  <DialogContent>ダイアログコンテンツ</DialogContent>
)
const dialogActions = (
  <DialogActions>
    <UpdateBtnArea
      load={false}
      success={false}
      fail={false}
      onSubmit={() => {}}
      onCancel={() => {}}
    />
  </DialogActions>
)
Pt001.args = {
  onClickOutside: () => {},
  children: [
    dialogTitle,
    dialogContent,
    dialogActions,
  ],
  cardProps: {
    style: {
      minWidth: '557px'
    }
  }
}


// const Template1: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />
// export const Pt001 = Template1.bind({})
// const children = <p data-testid="children">ダイアログコンテンツ</p>
// const overlayProps = {
//   id: 'id-overlay-props',
//   className: 'clss-overlay-props'
// }
// const cardProps = {
//   id: 'id-card-props',
//   className: 'clss-card-props'
// }
// Pt001.args = {
//   onClickOutside: () => {},
//   children,
//   overlayProps,
//   cardProps
// }
// Pt001.play = async ({ canvasElement }) => {
//   const canvas = within(canvasElement)
//   await waitFor(() => {
//     const dialog = canvas.queryByTestId('dialog') as HTMLElement 
//     expect(dialog).not.toBeNull()

//     // No.003
//     const children = within(dialog).queryByTestId('children')
//     expect(children).not.toBeNull()

//     // No.004
//     expect(dialog).toHaveClass(overlayProps.className)

//     // No.005
//     expect(dialog.getAttribute('id')).toBe(overlayProps.id)
    
//     // No.006
//     const card = canvas.getByTestId('card')
//     expect(card).toHaveClass(cardProps.className)

//     // No.007
//     expect(card.getAttribute('id')).toBe(cardProps.id)
//   })
// }

// export const Pt002 = Template1.bind({})
// let onClickFlg = false
// const onClickOutside = () => {
//   onClickFlg = true
// }
// Pt002.args = {
//   onClickOutside,
//   children,
// }
// Pt002.play = async ({ canvasElement }) => {
//   // No.002
//   const canvas = within(canvasElement)
//   await waitFor(async () => {
//     const dialog = canvas.queryByTestId('dialog') as HTMLElement 
//     expect(dialog).not.toBeNull()

//     // No.001
//     await userEvent.click(dialog)
//     expect(onClickFlg).toBe(true)
//   })
// }