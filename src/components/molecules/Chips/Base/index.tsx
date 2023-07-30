import React from 'react'
import classNames from 'classnames'
import Card from '../../../atoms/Card'
import Img from '../../../atoms/Img'
import DeleteIcon from '../../../../../public/icon-navigation-close_24px.svg'
import styles from './styles.module.scss'

export type DeleteIconProps = React.HTMLAttributes<HTMLDivElement>

export type Props = {
  className?: string,
  children: React.ReactNode,
  onDeleteProps?: DeleteIconProps,
  [key: string]: any
}

const Chips = React.memo(({ className, children, onDeleteProps={}, ...props }: Props) => {
  const classes = classNames(styles.card, className)
  const { className: onDeleteClassName, ...otherOnDeleteProps } = onDeleteProps

  return (
    <Card className={classes} data-testid="chips" {...props}>
      {children}
      {
        onDeleteProps ?
          <section className={classNames(styles['delete-ico'], onDeleteClassName)} data-testid="delete-ico" {...otherOnDeleteProps}>
            <Img
              src={DeleteIcon}
              alt="チップスを削除する"
              fill
            />
          </section>
        :
          null
      }
    </Card>
  )
})

Chips.displayName = 'Chips'
export default Chips