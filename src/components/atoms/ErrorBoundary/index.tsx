import React, { ErrorInfo } from "react"
import { connect } from "react-redux"
import { ActionCreatorWithPayload } from "@reduxjs/toolkit"
import { ErrorsSliceStateType } from 'SliceStateTypes'
import { RootState } from "../../../redux/createStore"
import { STATUS, MSG_ERR } from "../../../const"
import { setError, selectError } from "../../../redux/errors/slice"

type Props = {
  children: React.ReactNode,
  error: ErrorsSliceStateType['error'],
  setError: ActionCreatorWithPayload<Error | null, "errors/setError">
}

type State = {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: boolean) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }
  
  componentDidCatch(error: any, info: ErrorInfo) {
    // TODO エラーのロギング処理を実装する
  }

  render() {

    if (this.state.hasError || this.props.error) {
      let message: string = MSG_ERR.APP_ERROR
      if (this.props.error) {
        if (this.props.error.name === 'FetchError') {
          if (this.props.error.status === STATUS.INTERNAL_SERVER_ERROR) {
            message = MSG_ERR.SERVER_ERROR
          } else if (this.props.error.request) {
            message = MSG_ERR.NETWORK_ERROR
          }
        }
      }

      return (
        <div>
          <h2>{message}</h2>
          <button
            type="button"
            onClick={() => {
              if (this.props.error) {
                this.props.setError(null)
              } else {
                this.setState({ hasError: false })
              }
            }}
          >
            Try again?
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

const mapStateToProps = (state: RootState) => ({
  error: selectError(state)
})
const mapDispatchToProps = { setError }


export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)