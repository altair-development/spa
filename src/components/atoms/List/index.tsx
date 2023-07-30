import React, { forwardRef } from 'react'
import classNames from 'classnames'

type Props = {
  children: React.ReactNode,
  className?: string,
  [key: string]: any
}

const List = React.memo(forwardRef<any, Props>(({ children, className, ...props }, ref) => {

  const classes = classNames(className)
  return (
    <ul className={classes} data-testid="select-list" {...props} ref={ref}>
      {children}
    </ul>
  )
}))

List.displayName = 'List'
export default List