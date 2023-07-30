import React from 'react'

type Props = {
  [key: string]: any
}

const Anchor = ({ ...props }: Props) => (
  <a { ...props } data-testid="anchor" />
)
export default Anchor
