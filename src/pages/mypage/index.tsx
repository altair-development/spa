import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { URL, LoadingState } from '../../const'
import Txt from '../../components/atoms/Txt'
import { fetchUser, selectMe } from '../../redux/auth/slice'
import { selectRelatedClans, selectLoading as selectLoadingClans } from '../../redux/clans/slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { useSetHashParams } from '../../hooks/setHashParams'
import Header from '../../components/organisms/Header'
import Sidebar from '../../components/organisms/Sidebar'
import FlexBoxLayout from '../../components/atoms/FlexBoxLayout'
import styles from './styles.module.scss'

export default function Index() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  useSetHashParams()
  const me = useAppSelector(selectMe)
  const loadClans = useAppSelector(selectLoadingClans)

  useEffect(() => {
    (async () => {
      try {
        !me && await dispatch(fetchUser()).unwrap()
        await dispatch(selectRelatedClans()).unwrap()
      } catch (err: any) {
        router.push(URL.LOGIN)
      }
    })()
  }, [dispatch, router, me])

  if (!me || loadClans === LoadingState.LOADING) return <Txt>Loading...</Txt>

  return (
    <section id={styles.wrapper}>
      <Header />
      <FlexBoxLayout id={styles.main}>
        <Sidebar
          id={styles['sidebar']}
        />
        <section id="main"></section>
      </FlexBoxLayout>
    </section>
  )
}