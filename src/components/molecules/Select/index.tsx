import React, { useCallback, useState, useRef } from 'react'
import classNames from 'classnames'
import { ClickAwayPopper, Origin, Popper } from '../../atoms/Popup'
import OriginFn from './SelectorOrigin'
import List from '../../atoms/List'
import ListItem, { DataType } from '../../atoms/ListItem'
import styles from './styles.module.scss'

export type ListItemDataType = DataType & {
  id: number | string | undefined
}

type Props = {
  data: ListItemDataType[],
  value: ListItemDataType,
  onClickOutside?: () => Promise<void>,
  onClickOrigin?: () => Promise<void>,
  onChange: (value: ListItemDataType) => void
}

const BasicSelect = React.memo(({ data, value, onChange, onClickOutside: parentOnClickOutside, onClickOrigin: parentOnClickOrigin }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const onClickOutside = useCallback(async () => {
    parentOnClickOutside && await parentOnClickOutside()
    setOpen(false)
  }, [setOpen, parentOnClickOutside])

  const onClickOrigin = useCallback(async () => {
    parentOnClickOrigin && await parentOnClickOrigin()
    setOpen(!open)
  }, [setOpen, open, parentOnClickOrigin])

  const onClickList = useCallback(async (row: DataType) => {
    if (ref.current) {
      ref.current.click()
    }
    
    onChange(row as ListItemDataType)
  }, [onChange, ref])

  const originClasses = classNames(styles['selector-origin'])
  const popperClasses = classNames(styles['selector-popper'])

  return (
    <ClickAwayPopper
      onClickOutside={onClickOutside}
      handleOpen={open}
      popperWStyle="unify"
      originProps={{
        style: {
          width: '100%'
        }
      }}
    >
      <Origin>
        <span
          className={originClasses}
        >
          <OriginFn
            row={value}
            open={open}
            bordered={true}
            onClick={onClickOrigin}
            ref={ref}
          />
        </span>
      </Origin>
      <Popper>
        <span
          className={popperClasses}
        >
          <List>
            {
              data.map((data) => (
                <ListItem
                  key={data.id}
                  data={data}
                  onClick={onClickList}
                  selected={data.id === value?.id}
                />
              ))
            }
          </List>
        </span>
      </Popper>
    </ClickAwayPopper>
  )
})

BasicSelect.displayName = 'BasicSelect'

export default BasicSelect