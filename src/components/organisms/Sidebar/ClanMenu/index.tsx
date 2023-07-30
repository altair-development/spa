import React from 'react'
import classNames from 'classnames'
import { CgMenuLeftAlt } from 'react-icons/cg'
import { ClickAwayPopper, Origin, Popper, Props as ClickAwayPopperProps } from '../../../atoms/Popup'
import List from '../../../atoms/List'
import ListItem from '../../../atoms/ListItem'
import styles from '../styles.module.scss'

export type Props = {
  open: boolean,
  onClickCreateProject: () => void,
  originProps: ClickAwayPopperProps['originProps'],
  onClickOutside: ClickAwayPopperProps['onClickOutside'],
  onClickMenu: () => void,
}

const ClanMenu = React.memo(({ open, onClickCreateProject, originProps, onClickOutside, onClickMenu }: Props) => {

  return (
    <ClickAwayPopper
      onClickOutside={onClickOutside}
      handleOpen={open}
      originProps={{
        onClick: onClickMenu,
        ...originProps,
      }}
    >
      <Origin>
        <CgMenuLeftAlt
          size="1.5em"
          className={styles['menu-ico']}
          data-testid="toggler-ico"
        />
      </Origin>
      <Popper>
        <List>
          <ListItem
            data={{
              name: 'プロジェクトを追加'
            }}
            onClick={onClickCreateProject}
            selected={false}
          />
        </List>
      </Popper>
    </ClickAwayPopper>
  )
})

ClanMenu.displayName = 'ClanMenu'
export default ClanMenu