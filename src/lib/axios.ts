import axios, { AxiosResponse } from 'axios'
import { isServerSide } from '../utils'
import { STATUS } from '../const'
import { FetchError, Props } from './FetchError'

let baseURL: string | undefined = ''
let headers = {}
if (isServerSide()) {
  baseURL = process.env.API_URL
  headers = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  }
} else {
  baseURL = process.env.NEXT_PUBLIC_WEB_URL + '/api'
  headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export const client = axios.create({
  baseURL,
  headers,
})

client.interceptors.response.use((response) => response, (err) => {
  const props: Props = {
    message: ''
  }
  if (isServerSide()) {
    if (err.response) {
      props.message = err.response.statusText
      switch (err.response.status) {
        case STATUS.BAD_REQUEST:
          // APIキー不正
          props.status = STATUS.INTERNAL_SERVER_ERROR
          break
        case STATUS.NOT_FOUND:
          // URLが存在しない
          props.status = STATUS.INTERNAL_SERVER_ERROR
          break
        default:
          // APIサーバーエラー
          props.status = err.response.status
          break
      }
    } else {
      props.message = err.message
      props.status = STATUS.INTERNAL_SERVER_ERROR
    }
  } else {
    if (err.response) {
      props.status = err.response.status
      props.message = err.response.statusText
    }  else {
      props.message = err.message
      if (err.request) {
        props.request = true
      }
    }
  }
  
  throw new FetchError(props)
})

export async function post<T>(url: string, body?: any, headers: any = {}) {
  return await client.post(url, body, headers) as AxiosResponse<T>
}

export async function get<T>(url: string, headers?: any) {
  return await client.get(url, headers) as AxiosResponse<T>
}