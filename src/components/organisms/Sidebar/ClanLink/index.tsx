import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import ClanMenu, { Props as ClanMenuProps } from '../ClanMenu'
import ProjectList from '../ProjectList'
import { getClanUrl } from '../../../../utils'
import styles from '../styles.module.scss'

type ClanLinkProps = {
  liProps: {
    [key: string]: any
  },
  aProps: {
    [key: string]: any
  },
  clan: ClansDataType,
  clanId: string,
  onClickCreateProject: ClanMenuProps['onClickCreateProject']
}

const ClanLink = React.memo(({ liProps, aProps, clan, clanId, onClickCreateProject: _onClickCreateProject }: ClanLinkProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const openMenu = useCallback(() => setOpen(true), [])
  const closeMenu = useCallback(() => setOpen(false), [])
  const onClickCreateProject = useCallback(() => {
    closeMenu()
    _onClickCreateProject()
  }, [closeMenu, _onClickCreateProject])

  return (
    <li
      key={clanId}
      {...liProps}
    >
      <div
        style={{
          position: 'relative'
        }}
      >
        <a
          href={getClanUrl(clanId)}
          {...aProps}
        >
          <span
            style={{
              position: 'relative'
            }}
          >
            {clan.name}
          </span>
        </a>
        <ClanMenu
          open={open}
          onClickOutside={closeMenu}
          onClickMenu={openMenu}
          onClickCreateProject={onClickCreateProject}
          originProps={{
            className: styles['clan-menu']
          }}
        />
      </div>
      <ProjectList clanId={clanId} />
    </li>
  )
})
ClanLink.displayName = 'ClanLink'
export default ClanLink