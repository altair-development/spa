import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { MdOutlineCheck } from 'react-icons/md'
import styles from './styles.module.scss'

type Props = {
  active: boolean,
  className?: string,
  [key: string]: any
}

const Success = React.memo(forwardRef<any, Props>(({ active, className, ...props }, ref) => {

  const classes = classNames(styles['success-wrapper'], className)
  return (
    active ? 
      <span className={classes} data-testid="success" ref={ref} {...props}>
        <MdOutlineCheck style={{width: 'inherit', height: 'inherit'}} />
      </span> : null
  )
}))

Success.displayName = 'Success'
export default Success