import React, { forwardRef } from 'react'
import classNames from 'classnames'
import CircularProgress from '@mui/material/CircularProgress'

type Props = {
  active: boolean,
  className?: string,
  [key: string]: any
}

const Loader = React.memo(forwardRef<any, Props>(({ active, className, ...props }, ref) => {
  const classes = classNames(className)
  return (
    active ? <CircularProgress className={classes} size={22} ref={ref} data-testid="loader" {...props} /> : null
  )
}))

Loader.displayName = 'Loader'
export default Loader