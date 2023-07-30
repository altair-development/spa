import React from 'react'
import type { ImageProps } from 'next/image'
import classNames from 'classnames'
import MediaLayout, { LeftContent, RightContent, Props as MediaLayoutProps } from '../MediaLayout'
import UserIcon from '../UserIcon'
import Txt from '../../atoms/Txt'
import styles from './styles.module.scss'

export type Props = {
  names: [string, string?],
  src: ImageProps['src'],
  leftProps?: MediaLayoutProps['leftProps'],
  rightProps?: MediaLayoutProps['rightProps'],
  imageRounded?: boolean,
  [key: string]: any
}

const ImageLabel = React.memo(({ names, src, leftProps, rightProps, imageRounded=true, ...props }: Props) => {
  const rightClasses = classNames(styles.right, rightProps?.className)
  const leftClasses = classNames('mg-r-15', styles.left, leftProps?.className)

  return (
    <MediaLayout
      rightProps={{
        ...rightProps,
        className: rightClasses
      }}
      leftProps={{
        ...leftProps,
        className: leftClasses
      }}
      data-testid="image-label"
      {...props}
    >
      <LeftContent>
        <section className={styles.icon}>
          <UserIcon
            src={src}
            rounded={imageRounded}
            fill
          />
        </section>
      </LeftContent>
      <RightContent>
        <Txt
          tag="section"
          className='text-ellipsis'
          data-testid="upper-name"
        >
          {names[0]}
        </Txt>
        {
          names[1] ?
            <Txt
              tag="section"
              className='text-ellipsis'
              data-testid="lower-name"
            >
              {names[1]}
            </Txt>
          : null
        }
      </RightContent>
    </MediaLayout>
  )
})

ImageLabel.displayName = 'ImageLabel'
export default ImageLabel