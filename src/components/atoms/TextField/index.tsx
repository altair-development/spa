import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

export type Props = {
  className?: string,
  placeholder?: string,
  [key: string]: any
}

const TextField = forwardRef(function TextField({ className, placeholder, ...props }: Props, ref: React.ForwardedRef<any>) {
  const classes = classNames(styles['text-field'], 'text-field-bordered', className)
  return <input type="text" className={classes} placeholder={placeholder} ref={ref} data-testid="text-field" {...props} />
})

export default TextField