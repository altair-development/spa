import React, { forwardRef, useCallback, useRef, useEffect } from 'react'
import classNames from 'classnames'
import { getComputedStyle } from '../../../utils'
import { useFirstRender } from '../../../hooks/FirstRender'
import styles from './styles.module.scss'

type Props = {
  className?: string,
  placeholder?: string,
  [key: string]: any
}

const TextArea = React.memo(forwardRef<any, Props>(({ className, placeholder='コメントを追加する', ...props }, ref) => {
  const firstRender = useFirstRender()
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  // textareaのチェンジイベントハンドラー
  // 文字の長さに応じで自動改行する
  const onChangeFn = useCallback(() => {
    const target: HTMLTextAreaElement = textAreaRef.current!
    
    let scrollHeight = target.scrollHeight + 1
    let offsetHeight = target.offsetHeight
    if (scrollHeight > offsetHeight) {
      setHeight(target, scrollHeight)
    } else {
      const lineHeight = Math.ceil(Number(getComputedStyle(target, 'line-height').split('px')[0]))
      const minHeight = Number(getComputedStyle(target, 'min-height').split('px')[0])
      // 要素の高さを１行ずつ減らしていく
      // offsetHeighがscrollHeightを下回るか、scrollHeightが高さの下限値に一致した時点でscrollHeightの値を設定して終了する。
      while(true) {
        setHeight(target, offsetHeight - lineHeight)
        scrollHeight = target.scrollHeight + 1
        offsetHeight = target.offsetHeight
        if (scrollHeight > offsetHeight) {
          setHeight(target, scrollHeight)
          break
        } else if (scrollHeight === minHeight) {
          break
        }
      }
    }
  }, [])

  // textareaのDOMをRefオブジェクトに設定する
  const setRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (node) {
      if (ref) {
        // 引数のRefオブジェクトが存在する場合
        // 関数の場合とRefオブジェクトの２パターンが存在する。
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
      textAreaRef.current = node

      // 制御モード・非制御モード（ref使用）問わず入力を検知するために、onChangeイベントではなくinputイベントを使用する。
      node.addEventListener('input', onChangeFn)

      // プログラムからのvalue属性値変更を検出するため、textareaのセッターを上書きする。
      const { set } = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value') as PropertyDescriptor
      Object.defineProperty(node, 'value', {
        set(newVal) {
          set?.call(this, newVal)
          onChangeFn()
        }
      })
    }
  }, [ ref, onChangeFn ])

  // 制御コンポーネント且つvalueに初期値が設定されていた場合にサイズ調整関数を実行する。
  useEffect(() => {
    if (firstRender && props.value != null) {
      onChangeFn()
    }
  }, [ props.value, firstRender, onChangeFn ])

  const classes = classNames(className, styles['text-area'], 'text-field-bordered')
  return (
    <textarea
      className={classes}
      placeholder={placeholder}
      ref={setRef}
      data-testid="textarea"
      {...props}
    />
  )
}))

function setHeight(el: HTMLElement, height: number) {
  el.style.height = String(height) + 'px'
}

TextArea.displayName = 'TextArea'
export default TextArea