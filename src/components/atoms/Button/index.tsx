import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

export type Props = {
  children: React.ReactNode,
  className?: string,
  [key: string]: any
}

function buttonFactory(type: string) {
  return function Button ({ children, className, ...props }: Props) {
    const classes = classNames(styles.button, styles[type], className)
    return (
      <button className={classes} data-testid="button" { ...props }>{ children }</button>
    )
  }
}

export const PrimaryButton = buttonFactory('primary')
export const CancelButton = buttonFactory('cancel')

export default buttonFactory('default')
