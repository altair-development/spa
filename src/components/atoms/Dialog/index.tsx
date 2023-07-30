import React from 'react'
import classNames from 'classnames'
import Presenter from './Presenter'
import { mapParts } from '../../../utils'
import { useOutsideClick } from '../../../hooks/outsideEvent'
import styles from './styles.module.scss'

export type Props = {
  onClickOutside: (e: React.MouseEvent<HTMLDivElement>) => void,
  overlayProps?: React.HTMLAttributes<HTMLDivElement>,
  cardProps?: React.HTMLAttributes<HTMLDivElement>
}

export type FactoryProps = Props & {
  children: JSX.Element[]
}

export type PresenterProps = Props & {
  DialogTitle: React.ReactNode,
  DialogContent: React.ReactNode,
  DialogActions: React.ReactNode,
}

const DialogPresenter = React.memo(({
  onClickOutside,
  overlayProps,
  cardProps,
  DialogTitle,
  DialogContent,
  DialogActions
}: PresenterProps) => {

  const cardRef = useOutsideClick((e: React.MouseEvent<HTMLDivElement>) => {
    onClickOutside(e)
  })
  const overlayClasses = classNames(styles.overlay, overlayProps?.className)
  const cardClasses = classNames(styles.card, cardProps?.className)

  return (
    <Presenter>
      <section
        data-testid="dialog"
        {...overlayProps}
        className={overlayClasses}
      >
        <div
          data-testid="card"
          {...cardProps}
          ref={cardRef}
          className={cardClasses}
        >
          <section
            className={styles['dialog-title']}
          >
            {DialogTitle}
          </section>
          <section
            className={styles['dialog-content']}
          >
            {DialogContent}
          </section>
          <section>
            {DialogActions}
          </section>
        </div>
      </section>
    </Presenter>
  )
})
DialogPresenter.displayName = 'DialogPresenter'

const partTypes = [
  'DialogTitle',
  'DialogContent',
  'DialogActions'
]

const Dialog = React.memo(({ children, ...props }: FactoryProps) => {
  const [dialogTitle, dialogContent, dialogActions] = mapParts(children, partTypes)
  return (
    <DialogPresenter
      DialogTitle={dialogTitle}
      DialogContent={dialogContent}
      DialogActions={dialogActions}
      {...props}
    />
  )
})
Dialog.displayName = 'Dialog'

export default Dialog

export const DialogTitle = ({ children }: DammyComponentType) => <>{children}</>
DialogTitle.displayName = 'DialogTitle'
export const DialogContent = ({ children }: DammyComponentType) => <>{children}</>
DialogContent.displayName = 'DialogContent'
export const DialogActions = ({ children }: DammyComponentType) => <>{children}</>
DialogActions.displayName = 'DialogActions'