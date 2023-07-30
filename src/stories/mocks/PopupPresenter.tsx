type Props = {
  height?: string
  names: [string, ...string[]]
}

const PopupPresenter = ({ height='auto', names }: Props) => {
  const sytles = { height }
  let contents = []

  if (names.includes('popup')) {
    contents.push(<section key="popup" id="popup-presenter"></section>)
  }
  if (names.includes('dialog')) {
    contents.push(<section key="dialog" id="dialog-presenter"></section>)
  }

  return (
    <section id="portal" style={sytles}>
      {contents}
    </section>
  )
}
export default PopupPresenter