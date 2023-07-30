import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import store from '../redux/createStore'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import ErrorBoundary from '../components/atoms/ErrorBoundary'
import '../styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja" dateFormats={{ monthAndYear: 'YYYY年 MM月' }}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </LocalizationProvider>
    </Provider>
  )
}
