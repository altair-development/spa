import classNames from 'classnames'
import React from 'react'
import { PrimaryButton, CancelButton, Props as BtnProps } from '../../atoms/Button'
import Progress from '../Progress'
import styles from './styles.module.scss'

export type Props = {
  load: boolean,
  success: boolean,
  fail: boolean,
  onSubmit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onCancel: Props['onSubmit'],
  successStr?: string,
  cancelStr?: string,
  primaryBtnProps?: {
    [key: string]: any
  },
  cancelBtnProps?: {
    [key: string]: any
  },
  [key: string]: any
}

const UpdateBtnArea = React.memo(({
    load,
    success,
    fail,
    onSubmit,
    onCancel,
    successStr='更新',
    cancelStr='キャンセル',
    primaryBtnProps,
    cancelBtnProps,
    ...props }: Props) => {
  const primaryClasses = classNames(styles.btn, 'mg-r-10')
  const cancelClasses = classNames(styles.btn)
  
  return (
    <section data-testid="update-btn-area" {...props}>
      <PrimaryButton
        className={primaryClasses}
        onClick={onSubmit}
        {...primaryBtnProps}
      >
        { !load && !success && !fail ? successStr : null }
        <Progress
          load={load}
          success={success}
          fail={fail}
          loaderProps={{ style: { color: '#fff' } }}
          successProps={{ style: { color: '#fff'} }}
        />
      </PrimaryButton>
      <CancelButton
        className={cancelClasses}
        onClick={onCancel}
        {...cancelBtnProps}
      >{cancelStr}</CancelButton>
    </section>
  )
})

UpdateBtnArea.displayName = 'UpdateBtnArea'
export default UpdateBtnArea