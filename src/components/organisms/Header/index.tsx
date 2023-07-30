import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { URL } from '../../../const'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { selectMe, logout } from '../../../redux/auth/slice'
import Img from '../../atoms/Img'
import AccountMenu from '../AccountMenu'
import FlexBoxLayout from '../../atoms/FlexBoxLayout'
import Logo from '../../../../public/title-logo.png'
import styles from './styles.module.scss'

const Header = React.memo(() => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { name, id } = useAppSelector(selectMe) ?? { name: '', id: '' }

  const handleLogout = useCallback(async () => {
    await dispatch(logout())
    router.push(URL.LOGIN)
  }, [router, dispatch])

  return (
    <FlexBoxLayout className={styles.wrapper}>
      <div className={styles['title-logo']}>
        <Img
          src={Logo}
          alt="タイトルロゴ"
          fill
          data-testid="title-logo"
        />
      </div>
      <AccountMenu
        name={name}
        src={process.env.NEXT_PUBLIC_WEB_URL + '/api/users/getProfileImage?user=' + id}
        list={[
          {
            data: { name: 'ログアウト' },
            onClick: handleLogout
          }
        ]}
        className={styles['account-menu']}
      />
    </FlexBoxLayout>
  )
})

Header.displayName = 'Header'
export default Header