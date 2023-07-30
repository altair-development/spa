import React from 'react'
import classNames from 'classnames'
import styles from './styles.module.scss'

type Props = {
  tag?: string,
  size?: string,
  className?: string,
  [key: string]: any
}

const txtFactory = (role: string) => {
  return function Txt ({ tag = 'p', size = 'm', className, ...props }: Props) {
    const classes = classNames(styles.txt, styles[role], styles[size], className)
    const Tag = tag as keyof JSX.IntrinsicElements
    return (
      <Tag className={classes} data-testid="html-elem" { ...props } />
    )
  }
}

const Txt = txtFactory('default')
export default Txt

export const ErrorTxt = txtFactory('error')

Object.assign(ErrorTxt, { displayName: 'ErrorTxt' })
