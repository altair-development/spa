import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

export type DataType = {
  name: string | undefined,
}
export type Props = {
  data: DataType,
  onClick: (val: DataType) => void,
  selected: boolean,
  className?: string,
  [key: string]: any
}

const DefaultListItem = React.memo(({ data, onClick, className, selected, ...props }: Props) => {

  const classes = classNames(styles['list-item'], className, {
    [styles.selected]: selected
  })
  return (
    <li className={classes} data-testid="list-item" {...props}>
      <a onClick={() => onClick(data)} data-testid="list-item-anchor">{data.name}</a>
    </li>
  )
})

DefaultListItem.displayName = 'DefaultListItem'
export default DefaultListItem