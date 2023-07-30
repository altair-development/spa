import React, { useCallback } from 'react'
import { WithImageChips } from '../../../molecules/Chips'
import FlexBoxLayout from '../../../atoms/FlexBoxLayout'
import { Result as WatcherResult } from '../WatcherSearchArea'
import styles from './styles.module.scss'

type Props = {
  resultList: WatcherResult[],
  onDelete: (userId: string) => void,
  tabIdxStart: number
}

const WatcherResultArea = React.memo(({
  resultList,
  onDelete,
  tabIdxStart
}: Props) => {
  const onClick = useCallback((userId: string) => onDelete(userId), [onDelete])
  const onKeyDown = useCallback((userId: string, idx: number) => {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        const withImageChips = document.querySelectorAll(`.${CSS.escape(styles['with-image-chips'])} .with-image-chips-del-ico`) as NodeListOf<HTMLDivElement>
        if (withImageChips[idx + 1]) {
          withImageChips[idx + 1].focus()
        } else if (withImageChips[idx - 1]) {
          withImageChips[idx - 1].focus()
        }
        onClick(userId)
      }
    }
  }, [onClick])

  return (
    <FlexBoxLayout
      className={styles['watcher-result-area']}
    >
      {
        resultList.map(({ id, name }, idx) => {
          return (
            <WithImageChips
              key={id}
              names={[name]}
              src={`${process.env.NEXT_PUBLIC_WEB_URL}/api/users/getProfileImage?user=${id}`}
              onDeleteProps={{
                onClick: () => onClick(id),
                onKeyDown: onKeyDown(id, idx),
                tabIndex: tabIdxStart + idx,
                className: 'with-image-chips-del-ico'
              }}
              rightProps={{
                className: styles['user-name']
              }}
              className={styles['with-image-chips']}
            />
          )
        })
      }
    </FlexBoxLayout>
  )
})

WatcherResultArea.displayName = 'WatcherResultArea'
export default WatcherResultArea