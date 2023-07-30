export function mapParts(elems: JSX.Element[], partTypes: string[]) {
  const parts: JSX.Element[] = []
  elems.map((elem) => {
    const idx = partTypes.indexOf(elem.type.displayName)
    if (!~idx) return
    parts[idx] = elem.props.children
  })
  return parts
}

export function debug (this: any, ...args: any[]) {
  args.unshift(((new Date()).toLocaleString()))
  console.log.apply(this, args)
}

export function randomStrOfAlphanumeric (digit: number) {
  const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from(Array(digit)).map(()=>S[Math.floor(Math.random()*S.length)]).join('')
}