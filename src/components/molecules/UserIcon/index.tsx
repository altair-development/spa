import React from 'react'
import type { ImageProps } from 'next/image'
import classNames from 'classnames'
import Img from '../../atoms/Img'
import styles from './styles.module.scss'

type Props = {
  src: ImageProps['src'],
  className?: string,
  rounded?: boolean,
  [key: string]: any
}

export const alternative = 'ユーザーアイコン'
const UserIcon = React.memo(({ src, className, rounded=true, ...prop }: Props) => {

  const classes = classNames(className, {
    [styles['rounded-corner']]: rounded
  })
  return (
    <Img
      src={src}
      alt={alternative}
      className={classes}
      {...prop}
    />
  )
})

UserIcon.displayName = 'UserIcon'
export default UserIcon