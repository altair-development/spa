import React from 'react'
import classNames from 'classnames'
import Loader from '../../atoms/Loader'
import Success from '../../atoms/Success'
import Fail from '../../atoms/Fail'
import styles from './styles.module.scss'

type LoaderProps = {
  [key: string]: any
}
type SuccessProps = {
  [key: string]: any
}
type FailProps = {
  [key: string]: any
}
type Props = {
  load: boolean,
  success: boolean,
  fail: boolean,
  className?: string,
  loaderProps?: LoaderProps,
  successProps?: SuccessProps,
  failProps?: FailProps,
  [key: string]: any
}

const Progress = React.memo(({ load, success, fail, className, sizeSuccess, loaderProps, successProps, failProps, ...props }: Props) => {
  const classes = classNames(styles.wrapper, className)
  return (
    <span className={classes} data-testid="progress" {...props}>
      <Loader active={load} {...loaderProps} />
      <Success active={success} {...successProps} />
      <Fail active={fail} {...failProps} />
    </span>
  )
})

Progress.displayName = 'Progress'
export default Progress