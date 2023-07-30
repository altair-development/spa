import React, { forwardRef } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import styles from './styles.module.scss'
import { DataType } from '../../atoms/ListItem'
import selectIcon from '../../../../public/select-ico.svg'

type Props = {
  row: DataType,
  open: boolean,
  bordered?: boolean,
  onClick: () => void
}

const SelectorOrigin = React.memo(forwardRef<any, Props>(({ row: { name }, open, bordered, onClick }: Props, ref) => {
  const dispAreaClss = classNames(styles['disp-area'], {
    'text-field-bordered': bordered
  })
  const selectIcoClss = classNames(styles['select-ico'], {
    'selector-icon-closed': !open,
    'selector-icon-opened': open,
  })
  return (
    <div onClick={onClick} className={dispAreaClss} data-testid="origin" ref={ref}>
      <span>{name}</span>
      <Image
        src={selectIcon}
        alt="select icon"
        width="24"
        height="24"
        className={selectIcoClss}
        data-testid="select-icon"
      />
    </div>
  )
}))
SelectorOrigin.displayName = 'SelectorOrigin'

export default SelectorOrigin