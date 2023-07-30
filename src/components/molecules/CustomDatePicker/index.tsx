import classNames from 'classnames'
import React, { useCallback, useMemo, useRef, useState, useEffect, useDebugValue } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers/DesktopDatePicker'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types'
import { useOutsideClick } from '../../../hooks/outsideEvent'
import styles from './styles.module.scss'
import { SlotComponentProps } from '@mui/base/utils'

type Props = Omit<DesktopDatePickerProps<Dayjs>, 'value' | 'onChange'> & {
  value?: string | null,
  onChange: (value: string | null) => void,
  onClose?: () => void,
}

const CustomDatePicker = React.memo((props: Props) => {
  const { slotProps, inputRef: parentInputRef, value: valueProp, onChange: onChangeProp, className: classNameProp, open: openProp, onClose, ...otherProps} = props
  const actionBar = slotProps?.actionBar ? slotProps.actionBar : {}
  const openPickerButton = useMemo(() => slotProps?.openPickerButton ? slotProps.openPickerButton as any : {}, [slotProps?.openPickerButton])
  const popper = useMemo(() => slotProps?.popper ? slotProps.popper as any : {}, [slotProps?.popper])

  const [value, setValue] = useState<Dayjs | null | undefined>(null)
  const onChange = useCallback((val: Dayjs | null, ctx: PickerChangeHandlerContext<any>) => {
    if (onChangeProp) {
      onChangeProp(val && dayjs(val).isValid() ? dayjs(val).format('YYYY-MM-DD') : null)
    } else {
      setValue(val)
    }
  }, [onChangeProp])

  useEffect(() => {
    setValue(valueProp !== undefined ? dayjs(valueProp) : null)
  }, [valueProp])

  const [open, setOpen] = useState<boolean>(false)
  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp)
    }
  }, [openProp])

  const [oldValue, setOldValue] = useState<string | Dayjs | null>(null)
  const popperRef = useOutsideClick((e: MouseEvent) => {
    if (!(openPickerButtonRef.current && openPickerButtonRef.current.contains(e.target as Node | null))) {
      setOpen(false)
    }
  })
  const setPopperRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      if (popper.ref) {
        if (typeof popper.ref === 'function') {
          popper.ref(node)
        } else {
          popper.ref.current = node
        }
      }
      popperRef.current = node
    }
  }, [popper, popperRef])

  useEffect(() => {
    if (open) {
      if (inputRef.current) {
        setOldValue(dayjs(inputRef.current.value))
      }
    } else {
      onClose && onClose()
      popperRef.current = null
    }
  }, [open, popperRef, onClose])

  const inputRef = useRef<HTMLInputElement | null>()
  const setInputRef = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      if (parentInputRef) {
        if (typeof parentInputRef === 'function') {
          parentInputRef(node)
        } else {
          let current = parentInputRef.current
          current = node
        }
      }
      inputRef.current = node
    }
  }, [parentInputRef])

  const openPickerButtonRef = useRef<HTMLButtonElement | null>(null)
  const setOpenPickerButtonRef = useCallback((node: HTMLButtonElement | null) => {
    if (node) {
      if (openPickerButton.ref) {
        if (typeof openPickerButton.ref === 'function') {
          openPickerButton.ref(node)
        } else {
          let current = openPickerButton.ref.current
          current = node
        }
      }
      openPickerButtonRef.current = node
    }
  }, [openPickerButton])

  const onAccept = useCallback(() => {
    setOpen(false)
  }, [])

  const onCancel = useCallback(() => {
    onChange(dayjs(oldValue), { validationError: undefined })
    setOpen(false)
  }, [onChange, oldValue])

  const onClear = useCallback(() => {
    onChange(null, { validationError: undefined })
  }, [onChange])

  const onPickerButtonClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <DesktopDatePicker
      className={classNames(styles['custom-datepicker'], classNameProp)}
      open={open}
      slotProps={{
        ...slotProps,
        actionBar: {
          actions: ['cancel', 'clear', 'accept'],
          onCancel: onCancel,
          onClear: onClear,
          onAccept: onAccept,
          ...actionBar
        } as SlotComponentProps<any, any, any>,
        openPickerButton: {
          onClick: onPickerButtonClick,
          ref: setOpenPickerButtonRef,
          ...openPickerButton,
        },
        popper: {
          ...popper,
          ref: setPopperRef,
        },
      }}
      closeOnSelect={false}
      inputRef={setInputRef}
      value={value}
      onChange={onChange}
      format="YYYY/MM/DD"
      {...otherProps}
    />
  )
})

CustomDatePicker.displayName = 'CustomDatePicker'
export default CustomDatePicker