import classNames from 'classnames'
import React from 'react'
import { ErrorTxt } from '../../atoms/Txt'
import styles from './styles.module.scss'

type Props = {
  list: string[],
  [key: string]: any
}

const Error = React.memo(({ list, ...props }: Props) => {
  const itemClasses = classNames(styles.error)
  return (
    <section data-testid="error" {...props}>
      {
        list.map((message, idx) => <ErrorTxt key={idx} size='s' className={itemClasses}>{message}</ErrorTxt>)
      }
    </section>
  )
})

Error.displayName = 'Error'
export default Error