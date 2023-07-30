export function checkNotCntrChar(val: string) {
  return val.match(/^[^\x00-\x1F\x7F-\x9F]+$/)
}