import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { useOutsideClick } from '../../../../hooks/outsideEvent'
import { SYSTEM } from '../../../../const'
import { selectMembersByClanId } from '../../../../redux/members/slice'
import ComboBoxWithBtn, { List as ComboBoxList, Props as ComboBoxWithBtnProps } from '../../../molecules/ComboBoxWithBtn'
import ImageLabel from '../../../molecules/ImageLabel'
import FlexBoxLayout from '../../../atoms/FlexBoxLayout'
import styles from './styles.module.scss'

const { FLG_NO } = SYSTEM

export type Props = {
  resultList: Result[],
  onSelect: (watcher: MatchData) => void,
  textFieldProps?: ComboBoxWithBtnProps['textFieldProps'],
  listAreaProps?: React.HTMLAttributes<HTMLDivElement> & {
    ref?:  React.ForwardedRef<HTMLDivElement>
  },
  clanId: string
}

export type Result = {
  id: string,
  name: string
}

export type MatchData = {
  id: string,
  name: string
}

const WatcherSearchArea = React.memo(({
  resultList,
  onSelect,
  textFieldProps,
  listAreaProps={},
  clanId
}: Props) => {
  const { className: _className, ref: _ref } = listAreaProps
  const [searchStr, setSearchStr] = useState<string>('')
  const members: MembersDataType[] = useAppSelector((state) => {
    return selectMembersByClanId(state, clanId)
  })
  
  const matchData = useMemo(() => {
    const matchData: MatchData[] = []
    if (searchStr.length > 0) {
      for (let idx in members) {
        if ((members[idx].agreement === FLG_NO - 0) || (resultList.filter(resultRow => resultRow.id === members[idx].user_id).length > 0)) continue
        if (members[idx].user_name.indexOf(searchStr) === 0) {
          matchData.push({ id: members[idx].user_id, name: members[idx].user_name })
        }
      }
    }
    return matchData
  }, [members, resultList, searchStr])

  const listClose = useCallback(() => {
    setSearchStr('')
  }, [setSearchStr])

  const isSetMatchData = useMemo(() => matchData.length > 0, [matchData])
  const [listOpen, setListOpen] = useState<boolean>(isSetMatchData)

  const comboBoxListRef = useRef<HTMLDivElement | null>(null)
  const setComboBoxListRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      if (_ref) {
        if (typeof _ref === 'function') {
          _ref(node)
        } else {
          _ref.current = node
        }
      }
      comboBoxListRef.current = node
    }
  }, [_ref])
  useEffect(() => {
    if (!listOpen && _ref) {
      if (typeof _ref === 'function') {
        _ref(null)
      } else {
        _ref.current = null
      }
    }
  }, [_ref, listOpen])

  const textFieldRef = useOutsideClick(async (e: MouseEvent) => {
    if (!(comboBoxListRef.current && comboBoxListRef.current.contains(e.target as Node))) {
      listClose()
    }
  })

  const onChangeSearchStr = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(target.value)
  }, [])

  useEffect(() => {
    setListOpen(isSetMatchData)
  }, [matchData, isSetMatchData])

  const onBlurMatchData = useCallback((e: React.FocusEvent<HTMLUListElement>) => {
    if (e.currentTarget) {
      if (!e.currentTarget.contains(e.relatedTarget) && e.relatedTarget !== textFieldRef.current) {
        listClose()
      }
    }
  }, [textFieldRef, listClose])

  const onKeyDownTextField = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      if (!comboBoxListRef.current) {
        if (!e.shiftKey) {
          const withImageChips = document.querySelectorAll('#create-project-dlg .watcher-result-list .with-image-chips-del-ico') as NodeListOf<HTMLDivElement>
          if (withImageChips.length > 0) {
            e.preventDefault()
            withImageChips[0].focus()
          }
        }
        listClose()
      } else {
        if (e.shiftKey) {
          listClose()
        } else {
          e.preventDefault()
          const userLabel = comboBoxListRef.current.getElementsByClassName(styles['user-label'])[0] as HTMLDivElement
          userLabel.focus()
        }
      }
    }
  }, [listClose])

  const onKeyDownImageLabel = useCallback((e: React.KeyboardEvent<HTMLDivElement>, idx: number, data: MatchData) => {
    if (e.key === 'Enter') {
      const userLabels = document.getElementsByClassName(styles['user-label']) as HTMLCollectionOf<HTMLDivElement>
      if (userLabels[idx + 1]) {
        userLabels[idx + 1].focus()
      } else if (userLabels[idx - 1]) {
        userLabels[idx - 1].focus()
      } else {
        textFieldRef.current.focus()
      }
      onSelect(data)
    } else if (e.shiftKey && e.key === 'Tab') {
      if (idx === 0 && textFieldRef.current) {
        e.preventDefault()
        textFieldRef.current.focus()
      }
    }
  }, [textFieldRef, onSelect])

  return (
    <ComboBoxWithBtn
      enableBtn={false}
      listOpen={listOpen}
      value={searchStr}
      onChange={onChangeSearchStr}
      textFieldProps={{
        ref: textFieldRef,
        placeholder: 'ユーザーを検索する',
        // onBlur: onBlurTextField,
        onKeyDown: onKeyDownTextField,
        ...textFieldProps
      }}
      originClassName="w-100"
      trakkingOrigin={true}
    >
      <ComboBoxList>
        <FlexBoxLayout
          ref={setComboBoxListRef}
          onBlur={onBlurMatchData}
          className={styles['match-data']}
        >
          {
            matchData.map(({ id, name }: MatchData, idx) => {
              return (
                <ImageLabel
                  key={id}
                  names={[name]}
                  src={`${process.env.NEXT_PUBLIC_WEB_URL}/api/users/getProfileImage?user=${id}`}
                  onClick={() => onSelect({ id, name })}
                  onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => onKeyDownImageLabel(e, idx, { id, name })}
                  tabIndex={0}
                  leftProps={{
                    className: styles['user-icon'],
                  }}
                  rightProps={{
                    className: styles['user-name'],
                  }}
                  className={styles['user-label']}
                />
              )
            })
          }
        </FlexBoxLayout>
      </ComboBoxList>
    </ComboBoxWithBtn>
  )
})

WatcherSearchArea.displayName = 'WatcherSearchArea'
export default WatcherSearchArea