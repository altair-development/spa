import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { AiOutlinePlus } from "react-icons/ai"
import { useAppDispatch } from '../../../../redux/hooks'
import { useOutsideClick } from '../../../../hooks/outsideEvent'
import { create as createClan } from '../../../../redux/clans/slice'
import TextField from '../../../atoms/TextField'
import Error from '../../../molecules/Error'
import styles from '../styles.module.scss'

const CreateClan = () => {
  const dispatch = useAppDispatch()
  const [create, setCreate] = useState<Boolean>(false)
  const [name, setName] = useState<string>('')
  const [errorList, setErrorList] = useState<string[]>([])

  const ref = useOutsideClick(() => {
    if (create) closeInputField()
  })

  const setRef = useCallback((node: HTMLInputElement | null) => {
    if (node) {
      ref.current = node
      node.focus()
    }
  }, [ref])

  const openInputField = useCallback(() => {
    setCreate(true)
  }, [])

  const onClick = useCallback(() => {
    openInputField()
  }, [openInputField])

  const closeInputField = useCallback(() => {
    setCreate(false)
    setName('')
    setErrorList([])
  }, [])

  const onBlur = useCallback(() => {
    closeInputField()
  }, [closeInputField])

  const onSubmit = useCallback(async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (name.length > 0) {
      await dispatch(createClan({
        name: name
      }))
      closeInputField()
    } else {
      setErrorList([
        ...errorList,
        'クラン名を入力してください。'
      ])
    }
  }, [dispatch, name, closeInputField, errorList])

  const onChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => setName(target.value), [])

  return (
    <ul
      className={styles['create-clan-list']}
    >
      <li>
        {
          create ? 
            (
              <form onSubmit={onSubmit}>
                <TextField
                  className={styles['text-field']}
                  value={name}
                  ref={setRef}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                <Error
                  className={styles['error-list']}
                  list={errorList}
                />
              </form>
            )
            :
            (
              <a
                style={{
                  fontSize: '0.875em'
                }}
                onClick={onClick}
              >
                <AiOutlinePlus
                  size={'1em'}
                  className={styles['create-clan-ico']}
                />
                新しいクラン
              </a>
            )
        }
      </li>
    </ul>
  )
}

export default CreateClan