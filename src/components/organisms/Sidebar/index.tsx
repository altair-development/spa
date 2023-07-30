import React, { useCallback, useState } from 'react'
import { STATUS, MSG_ERR } from '../../../const'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { useOutsideClick } from '../../../hooks/outsideEvent'
import { ClansSliceStateType, ProjectsSliceStateType } from 'SliceStateTypes'
import { selectClans, create as createClan } from '../../../redux/clans/slice'
import { selectProjectsByClanId } from '../../../redux/projects/slice'
import { select_c, selectClanId, selectProjectId } from '../../../redux/hashParams/slice'
import { getDashboardUrl, getClanUrl, getProjectUrl } from '../../../utils'
import { QueryCntrName } from '../../../const'
import classNames from 'classnames'
import CreateClan from './CreateClan'
import ClanList from './ClanList'

type Props = {
  [key: string]: any
}

const Sidebar = React.memo(({...props}: Props) => {
  const c = useAppSelector(select_c)
  return (
    <section
      className={styles.sidebar}
      {...props}
    >
      <ul className={styles.menu}>
        <li
          className={classNames(
            'dashboard',
            {
              [styles.selected]: c === QueryCntrName.CNTR_DASHBOARD
            }
          )}
        >
          <a href={getDashboardUrl()}>
            ダッシュボード
          </a>
        </li>
      </ul>
      <ClanList />
      <CreateClan />
    </section>
  )
})
Sidebar.displayName = 'Sidebar'

export default Sidebar



