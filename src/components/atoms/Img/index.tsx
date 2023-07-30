import React, { forwardRef } from 'react'
import Image from 'next/image'
import type { ImageProps } from 'next/image'

export type Props = ImageProps & {
  [key: string]: any
}

const Img = React.memo(forwardRef<any, Props>(({ src, width, height, alt, ...props }, ref) => {
  return <Image
    src={src}
    width={width}
    height={height}
    alt={alt}
    ref={ref}
    data-testid="image"
    {...props}
  />
}))

Img.displayName = 'Img'
export default Img