import React, { forwardRef } from 'react'
import { mapParts } from '../../../utils'
import { ClickAwayPopper, Origin, Popper, popperWStyleUnify } from '../../atoms/Popup'
import TextField from '../../atoms/TextField'
import { PrimaryButton } from '../../atoms/Button'
import classNames from 'classnames'

export type Props = {
  listOpen: boolean,
  onClickBtn?: () => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value?: string,
  children: JSX.Element,
  enableBtn?: boolean,
  btnName?: string,
  textFieldProps?: {
    [key: string]: any
  },
  btnProps?: {
    [key: string]: any
  },
  originClassName?: string,
  originProps?: {
    [key: string]: any
  },
  trakkingOrigin?: boolean,
  [key: string]: any
}

const partTypes = [
  'List',
]

const ComboBoxWithBtn = React.memo(forwardRef<any, Props>((
  {
    listOpen,
		onClickBtn,
		onChange,
		value,
		children,
		enableBtn=true,
		btnName="追加する",
		textFieldProps,
		btnProps,
    originClassName,
    originProps,
    trakkingOrigin,
		...props
  },
  ref
  ) => {
  const [list] = mapParts([children], partTypes)
  const originClassNames = classNames(originClassName, 'mg-r-10')
  return (
    <section ref={ref} data-testid="combo-box-with-btn" {...props}>
      <ClickAwayPopper
        onClickOutside={() => {}}
        handleOpen={listOpen}
        popperWStyle={popperWStyleUnify}
        originClassName={originClassNames}
        originProps={{
          ...originProps,
          'data-testid': 'origin'
        }}
        trakkingOrigin={trakkingOrigin}
      >
        <Origin>
          <TextField
            onChange={onChange}
            value={value}
            data-testid="text-field"
            {...textFieldProps}
          />
        </Origin>
        <Popper>
          {list}
        </Popper>
      </ClickAwayPopper>
      {
        enableBtn ?
          <PrimaryButton
            onClick={onClickBtn}
            data-testid="submit-btn"
            {...btnProps}
          >{btnName}</PrimaryButton>
        :
          null
      }
      
    </section>
  )
}))

ComboBoxWithBtn.displayName = 'ComboBoxWithBtn'

export default ComboBoxWithBtn

export const List = ({ children }: DammyComponentType) => <>{children}</>
List.displayName = 'List'