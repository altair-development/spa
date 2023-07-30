import React from 'react'
import classNames from 'classnames'
import { mapParts } from '../../../utils'
import FlexBoxLayout from '../../atoms/FlexBoxLayout'
import styles from './styles.module.scss'

export type Props = {
  className?: string,
  children: JSX.Element[],
  leftProps?: React.HTMLAttributes<HTMLElement>,
  rightProps?: React.HTMLAttributes<HTMLElement>,
  [key: string]: any
}

const partTypes = [
  'LeftContent',
  'RightContent',
]

const MediaLayout = React.memo(({ src, className, children, leftProps, rightProps, ...props }: Props) => {
  const [leftContent, rightContent] = mapParts(children, partTypes)
  const rootClasses = classNames(styles.root, className)
  const rightClasses = classNames(styles['content-right'], rightProps?.className)

  return (
    <FlexBoxLayout
      className={rootClasses}
      data-testid="flexbox"
      {...props}
    >
      <section data-testid="left-content" {...leftProps}>
        {leftContent}
      </section>
      <section data-testid="right-content" {...rightProps} className={rightClasses}>
        {rightContent}
      </section>
    </FlexBoxLayout>
  )
})

MediaLayout.displayName = 'MediaLayout'
export default MediaLayout

export const LeftContent = ({ children }: DammyComponentType) => <>{children}</>
LeftContent.displayName = 'LeftContent'
export const RightContent = ({ children }: DammyComponentType) => <>{children}</>
RightContent.displayName = 'RightContent'