import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <section id="portal">
          <section id="popup-presenter"></section>
          <section id="dialog-presenter"></section>
        </section>
      </body>
    </Html>
  )
}