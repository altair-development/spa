import React from 'react'
import type { ImageProps } from 'next/image'
import Chips, { Props as ChipsProps, DeleteIconProps } from '../Base'
import ImageLabel, { Props as ImageLabelProps } from '../../ImageLabel'

type Props = {
  names: [string, string?],
  src: ImageProps['src'],
  className?: string,
  onDeleteProps?: DeleteIconProps,
  leftProps?: ImageLabelProps['leftProps'],
  rightProps?: ImageLabelProps['rightProps'],
  [key: string]: any
}

const WithImageChips = React.memo(({ names, src, className, onDeleteProps, leftProps, rightProps, ...props }: Props) => {

  return (
    <Chips className={className} onDeleteProps={onDeleteProps} data-testid="with-image-chips" {...props}>
      <ImageLabel
        src={src}
        names={names}
        leftProps={leftProps}
        rightProps={rightProps}
      />
    </Chips>
  )
})

WithImageChips.displayName = 'WithImageChips'
export default WithImageChips