
import { Regex } from '../const'

// 要素の文字サイズを取得する
export const getFontSize = (elem: HTMLElement) => {
  const style = getComputedStyle(elem, 'font-size')
  return parseFloat(style)
}

// ルート要素の文字サイズを取得する
export const getRootFontSize = () => {
  return getFontSize(document.body)
}

// CSSカスタムプロパティ（変数）文字サイズ倍率を取得する
export const getCharSizeMagnification = (valName: string) => {
  const [ ignore, rem ] = getCssCustomPropValue(valName).match(Regex.NUMBER_OF_REM) as RegExpMatchArray
  return parseFloat(rem)
}

// 要素の色をHex値で取得する
export const getFontColorAtHex = (elem: HTMLElement) => {
  let result = ''
  const style = getComputedStyle(elem, 'color')
  const matches = style.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (matches) {
    const [ ignore, red, green, blue] = matches
    result = ConvertRGBtoHex(Number(red), Number(green), Number(blue))
  }
  return result
}

// rgbaをHex値に変換する
export const rgbaToHex = (color: String) => {
  let result = ''
  const matches = color.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^,\s]+)\)$/)
  if (matches) {
    const [ ignore, red, green, blue, alpha] = matches
    result = ConvertRGBAtoHex(Number(red), Number(green), Number(blue), Number(alpha))
  }
  return result
}

// CSSカスタムプロパティ（変数）の値を取得する
export const getCssCustomPropValue = (propName: string) => {
  return getComputedStyle(document.documentElement, propName)
}

export const getMarginRight = (elem: HTMLElement) => {
  const marginRight = getComputedStyle(elem, 'margin-right')
  const matches = marginRight.match(/^(\d+)px$/)
  return matches ? Number(matches[1]) : null
}

// src属性の設定値を取得する
// export const getSrcValue = (elem: HTMLElement) => {
//   return getComputedStyle(elem, propName)
// }

// 要素がビューポート内からはみ出していないかどうか確認する。
// export const isInViewport = (el: Element) => {
//   const rect = el.getBoundingClientRect()
//   return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= document.documentElement.clientHeight &&
//       rect.right <= document.documentElement.clientWidth
//   )
// }

function ColorToHex (color: number) {
  var hexadecimal = color.toString(16)
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal
}

function ConvertRGBtoHex (red: number, green: number, blue: number) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue)
}

function ConvertRGBAtoHex(red: number, green: number, blue: number, alpha: number) {
  let r = red.toString(16);
  let g = green.toString(16);
  let b = blue.toString(16);
  let a = Math.round(alpha * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;
}

// dom要素のCSSプロパティを取得する
export function getComputedStyle (elem: HTMLElement, prop: string, pseudoElt?: string) {
  return window.getComputedStyle(elem, pseudoElt).getPropertyValue(prop).trim()
}

export function isTestRunner () {
  return navigator.userAgent.includes('StorybookTestRunner')
}

// getAttributeで取得したインラインスタイル文字列をキーバリューオブジェクトに変換する
export function expandInlineStyleStr (style: string | null) {
  const result: {
    [key: string]: string | undefined
  } = {}

  if (style === null) return result

  const props = style.split(';')
  for (const prop of props) {
    if (prop.length === 0) continue
    const [key, value] = prop.split(':')
    result[key.trim()] = value?.trim()
  }

  return result
}