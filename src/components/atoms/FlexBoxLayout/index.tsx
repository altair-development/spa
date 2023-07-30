import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  className?: string,
  children: React.ReactNode,
  [key: string]: any
}

const FlexBoxLayout = forwardRef<any, Props>(({ className, children, ...props }, ref) => {
  const classes = classNames(styles.container, className)
  return (
    <section className={classes} data-testid="flex-box-layout" ref={ref} {...props}>
      {children}
    </section>
  )
})
FlexBoxLayout.displayName = 'FlexBoxLayout'
export default FlexBoxLayout
