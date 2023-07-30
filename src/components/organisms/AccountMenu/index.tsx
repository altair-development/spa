import React, { useCallback, useState } from 'react'
import type { ImageProps } from 'next/image'
import classNames from 'classnames'
import { HiChevronDown } from 'react-icons/hi'
import FlexBoxLayout from '../../atoms/FlexBoxLayout'
import ImageLabel, { Props as ImageLabelProps } from '../../molecules/ImageLabel'
import { ClickAwayPopper, Origin, Popper }  from '../../atoms/Popup'
import List from '../../atoms/List'
import ListItem, { Props as ListItemProps } from '../../atoms/ListItem'
import styles from './styles.module.scss'

type Props = {
  name: string,
  src: ImageProps['src'],
  list: {
    data: ListItemProps['data'],
    onClick: ListItemProps['onClick']
  }[],
  leftProps?: ImageLabelProps['leftProps'],
  rightProps?: ImageLabelProps['rightProps'],
  [key: string]: any
}

const AccountMenu = React.memo(({ name, src, list, leftProps, rightProps, ...props }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const onClickOutside = useCallback(() => {
    setOpen(false)
  }, [])

  const onClickOrigin = useCallback(() => {
    setOpen(!open)
  }, [open])

  const chevronClasses = classNames(styles['select-ico'], {
    'selector-icon-closed': !open,
    'selector-icon-opened': open,
  })

  return (
    <FlexBoxLayout
      {...props}
      style={{
        alignItems: 'center',
        ...props?.style,
      }}
    >
      <ImageLabel
        src={src}
        names={[
          name
        ]}
        imageRounded={false}
        leftProps={{
          ...leftProps,
          style: {
            marginRight: '10px',
            width: '1.875em',
            height: '1.875em',
            ...leftProps?.style
          },
        }}
        rightProps={rightProps}
      />
      <ClickAwayPopper
        onClickOutside={onClickOutside}
        handleOpen={open}
        originProps={{
          onClick: onClickOrigin,
          style: {
            marginLeft: '3px'
          }
        }}
      >
        <Origin>
          <HiChevronDown
            size="25px"
            style={{
              verticalAlign: 'middle'
            }}
            className={chevronClasses}
            data-testid="toggler-ico"
          />
        </Origin>
        <Popper>
          <List>
            {
              list.map((item, idx) => (
                <ListItem
                  key={idx}
                  data={item.data}
                  onClick={item.onClick}
                  selected={false}
                />
              ))
            }
          </List>
        </Popper>
      </ClickAwayPopper>
    </FlexBoxLayout>
  )
})

AccountMenu.displayName = 'AccountMenu'
export default AccountMenu