import type { NextPage } from 'next'
import Link from 'next/link'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { URL, STATUS } from '../const'
import Txt, { ErrorTxt } from '../components/atoms/Txt'
import TextField from '../components/atoms/TextField'
import { PrimaryButton } from '../components/atoms/Button'
import { useAppDispatch } from '../redux/hooks'
import { signup } from '../redux/auth/slice'
import List from '../components/atoms/List'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>()

  const handleSubmit = useCallback(() => {
    (async () => {
      try {
        setErrorMessage('')
        const params = {
          email,
          password
        }
        await dispatch(signup(params)).unwrap()
        router.push(URL.MYPAGE_HOME)
      } catch (err: any) {
        setErrorMessage(err.message)
      }
    })()
  }, [dispatch, email, password, router])

  return (
    <section id="container">
      <Txt tag='h1'>サインアップ</Txt>
      { errorMessage ? <ErrorTxt>{ errorMessage }</ErrorTxt> : null }
      <TextField
        type="text"
        name="email"
        placeholder="メールアドレス"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}
      />
      <TextField
        type="password"
        placeholder="パスワード"
        name="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
          }}
        />
      <PrimaryButton type="submit" onClick={handleSubmit}>送信</PrimaryButton>
      <List>
        <li>
          <Link href="/users/login">ログイン</Link>
        </li>
        <li>
          <Link href="/mypage">マイページ</Link>
        </li>
      </List>
    </section>
  )
}

export default Home
