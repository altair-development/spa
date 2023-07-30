import React, { useState, useRef, useCallback, useEffect } from 'react'
import classNames from 'classnames'
import { useOutsideClick } from '../../../hooks/outsideEvent'
import { useFirstRender } from '../../../hooks/FirstRender'
import Presenter from './Presenter'
import Card from '../Card'
import styles from './styles.module.scss'
import { mapParts } from '../../../utils'
import variables from '../../_variables.module.scss'

export const popperWStyleAuto = 'auto'
export const popperWStyleUnify = 'unify'

export type Props = {
  onClickOutside: () => void,
  handleOpen: boolean,
  originClassName?: string,
  popperClassName?: string,
  originProps?: {
    [key: string]: any
  },
  popperProps?: {
    [key: string]: any
  },
  popperWStyle?: typeof popperWStyleAuto | typeof popperWStyleUnify,
  trakkingOrigin?: boolean
}

export type FactoryProps = Props & {
  children: JSX.Element[]
}

export type ClickAwayPopperProps = Props & {
  Origin: React.ReactNode,
  Popper: React.ReactNode,
}

export const duration = Number(variables['popupDuration'])
export const popperMarginTop = 10

const ClickAwayPopperPresenter = React.memo(({
  Origin,
  Popper,
  onClickOutside,
  handleOpen,
  originClassName,
  popperClassName,
  originProps,
  popperProps,
  popperWStyle = popperWStyleAuto,
  trakkingOrigin
}: ClickAwayPopperProps) => {
  const [activePopper, setActivePopper] = useState(false)
  const originRef = useRef<any>(null)
  const ref = useOutsideClick(async (e: MouseEvent) => {
    if (activePopper && !(originRef.current && originRef.current.contains(e.target))) {
      onClickOutside()
    }
  })
  const firstRender = useFirstRender()
  const popperWRef = useRef<number | null>(null)
  const popperHRef = useRef<number | null>(null)
  const [popperW, setPopperW] = useState<string>('auto')

  // ポッパーを表示・非表示にする
  const setOpen = useCallback((open: Boolean) => {
    if (ref.current) {
      if (open) {
        setPopperPosition(ref.current, originRef.current, popperHRef.current!, popperWRef.current!)
        ref.current.classList.add(styles.open)
      } else if (!firstRender) {
        ref.current.classList.remove(styles.open)
        ref.current.classList.add(styles.close)
        setTimeout(() => {
          setActivePopper(false)
        }, duration)
      }
    }
  }, [firstRender, ref, originRef])

  // クリッカーの位置座標の変化を監視する
  useEffect(() => {
    if (trakkingOrigin) {
      const nIntervId = setInterval(() => {
        if (ref.current && popperHRef.current && popperWRef.current) {
          setPopperPosition(ref.current, originRef.current, popperHRef.current!, popperWRef.current!)
        }
      }, 100)
      return () => clearInterval(nIntervId)
    }
  }, [trakkingOrigin, ref])

  // クリッカーのDOMをRefオブジェクトに設定する
  const setOriginRef = useCallback((node: Element | null) => {
    if (node) {
      originRef.current = node
    }
  }, [ originRef ])

  // ポッパーのDOMをRefオブジェクトに設定し、ポッパーを開く。
  // ポッパーのDOMサイズも取得する
  const setPopperSize = useCallback((node: Element | null) => {
    if (node) {
      popperWRef.current = node!.clientWidth
      popperHRef.current = node!.clientHeight
      ref.current = node
      setOpen(true)
    } else {
      ref.current = node
    }
  }, [ref, setOpen])

  useEffect(() => {
    if (handleOpen) {
      if (popperWStyle === popperWStyleUnify) {
        setPopperW(originRef.current.getBoundingClientRect().width + 'px')
      }
      setActivePopper(true)
    } else if (!firstRender) {
      setOpen(false)
    }
  }, [ firstRender, handleOpen, setActivePopper, setOpen, popperWStyle ])

  const originRootClasses = classNames(styles['origin-wrapper'], originClassName)
  const cardClasses = classNames(styles.popper, popperClassName)

  return (
    <>
      <span
        className={originRootClasses}
        ref={setOriginRef}
        data-testid="origin-el-wrapper"
        {...originProps}
      >
        {Origin}
      </span>
      {
        activePopper ? (
          <Presenter>
            <Card
              className={cardClasses}
              ref={setPopperSize}
              style={{width: popperW}}
              data-testid="popper-el-wrapper"
              {...popperProps}
            >
              {Popper}
            </Card>
          </Presenter>
        ) : null
      }
    </>
  )
})
ClickAwayPopperPresenter.displayName = 'ClickAwayPopperPresenter'

const partTypes = [
  'Origin',
  'Popper',
]

const ClickAwayPopper = React.memo(({ children, ...props }: FactoryProps) => {
  const [origin, popper] = mapParts(children, partTypes)
  return (
    <ClickAwayPopperPresenter
      Origin={origin}
      Popper={popper}
      {...props}
    />
  )
})
ClickAwayPopper.displayName = 'ClickAwayPopper'

export {
  ClickAwayPopper
}

export const Origin = ({ children }: DammyComponentType) => <>{children}</>
Origin.displayName = 'Origin'
export const Popper = ({ children }: DammyComponentType) => <>{children}</>
Popper.displayName = 'Popper'

function setPopperPosition(popperEl: HTMLElement, originEl: HTMLElement, popperH: number, popperW: number) {
  const scrollTop = document.documentElement.scrollTop
  const scrollLeft = document.documentElement.scrollLeft
  const originClientRect = originEl.getBoundingClientRect()
  const originY = originClientRect.y
  const originX = originClientRect.x
  const originW = originClientRect.width
  const originH = originClientRect.height
  const windowWidth = document.documentElement.clientWidth
  const windowHeight = document.documentElement.clientHeight
  const originHToBottom = originY + originH
  const popperArea = windowHeight - originHToBottom
  const canDispH = popperArea > popperH
  
  const top = canDispH ? scrollTop + originY + originH + popperMarginTop : scrollTop + originY - popperH - popperMarginTop
  popperEl.style.top = top + 'px'
  
  let left = scrollLeft
  const greaterThan = popperW - originW
  const gap = greaterThan ? (popperW - originW) / 2 : (originW - popperW) / 2
  const canDispL = greaterThan ? originX > gap : (originX + gap) > 0
  const canDispR = greaterThan ? (windowWidth - (originX + originW + gap)) > 0 : (windowWidth - originX + originW - gap) > 0
  if (!canDispR){
    popperEl.style.right = 0 + 'px'
  } else if (!canDispL){
    popperEl.style.left = left + 'px'
  } else {
    popperEl.style.left = greaterThan ? (scrollLeft + originX - gap) + 'px' : (scrollLeft + originX + gap) + 'px'
  }
}