import React, { forwardRef } from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  tag?: string,
  className?: string,
  children?: React.ReactNode
  [key: string]: any
}

const Card = forwardRef(function Card({ tag = 'section', className, children, ...props }: Props, ref) {
  const Tag = tag as keyof JSX.IntrinsicElements
  const classes = classNames(styles['card'], className)
  return React.createElement(
    tag,
    {
      className: classes,
      ref: ref,
      'data-testid': 'card',
      ...props
    },
    children
  )
})

export default Card