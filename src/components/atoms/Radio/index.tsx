import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  value: string,
  displayName: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  className?: string,
  checked: boolean,
  [key: string]: any
}

const Radio = React.memo(function Radio({ value, displayName, onChange, checked, className, ...props }: Props) {
  const classes = classNames(styles.radio, className)

  return (
    <li className={classes} data-testid="radio-label" {...props}>
      <input type="radio" id={value} value={value} onChange={onChange} checked={checked} />
      <label htmlFor={value}>{displayName}</label>
      
      <div className={styles.check}></div>
    </li>
  )
})

const Panel = React.memo(function Panel({ value, displayName, onChange, checked, className, ...props }: Props) {
  const classes = classNames(styles.panel, className)

  return (
    <li className={classes} data-testid="radio-label" {...props}>
      <input type="radio" id={value} value={value} onChange={onChange} checked={checked} />
      <label htmlFor={value}>{displayName}</label>
    </li>
  )
})

export default Radio
export {
  Panel
}