import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { TiCancel } from 'react-icons/ti'
import styles from './styles.module.scss'

type Props = {
  active: boolean,
  className?: string,
  [key: string]: any
}

const Fail = React.memo(forwardRef<any, Props>(({ active, className, ...props }, ref) => {

  const classes = classNames(styles['fail-wrapper'], className)
  return (
    active ? 
      <span className={classes} data-testid="fail" ref={ref} {...props}>
        <TiCancel style={{width: 'inherit', height: 'inherit'}} />
      </span> : null
  )
}))

Fail.displayName = 'Fail'
export default Fail