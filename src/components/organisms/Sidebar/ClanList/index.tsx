import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { useAppSelector } from '../../../../redux/hooks'
import { selectClans } from '../../../../redux/clans/slice'
import { selectClanId } from '../../../../redux/hashParams/slice'
import CreateProjectDlg from '../../CreateProjectDlg'
import ClanLink from '../ClanLink'
import { SYSTEM } from '../../../../const'
import styles from '../styles.module.scss'

const ClanList = () => {
  const clans = useAppSelector(selectClans)
  const selectedClanId = useAppSelector(selectClanId)
  const [dlgOpen, setDlgOpen] = useState<boolean>(false)
  const [clanIdForCreateProject, setClanIdForCreateProject] = useState<string>('')
  const closeDialog = useCallback(() => setDlgOpen(false), [])
  
  return (
    <>
      {
        dlgOpen ? 
          (
            <CreateProjectDlg
              clanId={clanIdForCreateProject}
              onClickOutside={closeDialog}
              onSuccess={closeDialog}
              onCancel={closeDialog}
            />
          )
        : null
      }
      <ul className={styles['clan-list']}>
        {
          Object.keys(clans).map((clanId) => {
            const clan = clans[clanId]
            const listItemClasses = classNames(
              'list-item-clan',
              {
                [styles.selected]: clanId === selectedClanId
              }
            )
            const anchorClasses = classNames({
              'invite': clan.agreement === SYSTEM.FLG_NO
            })
            const onClickCreateProject = () => {
              setClanIdForCreateProject(clanId)
              setDlgOpen(true)
            }

            return (
              <ClanLink
                key={clanId}
                clan={clan}
                clanId={clanId}
                onClickCreateProject={onClickCreateProject}
                liProps={{
                  className: listItemClasses
                }}
                aProps={{
                  className: anchorClasses
                }}
              />
            )
          })
        }
      </ul>
    </>
  )
}

export default ClanList