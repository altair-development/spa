import '../src/styles/globals.scss'
import * as NextImage from 'next/image'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { forwardRef } from 'react'
import { initialize, mswDecorator } from 'msw-storybook-addon'

// next/imageの自動最適化を無効化する
const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: forwardRef((props, ref) => (
    <OriginalNextImage
      {...props}
      ref={ref}
      unoptimized
    />
  )),
})

initialize()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // CSSアニメーションで一時停止する
  chromatic: { pauseAnimationAtEnd: true },
  // next/routerをモックする
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

const ComponentSizeDecorator = (Story, { parameters: { componentSize } }) => {
  if (componentSize) {
    return (
      <section
        style={{
          width: componentSize.width,
          height: componentSize.height
        }}
      >
        <Story />
      </section>
    )
  } else {
    return <Story />
  }
}


const DisableTestRunnerDecorator = (Story, { parameters }) => {
  if (parameters.testRunner?.disable === true && navigator.userAgent.includes('StorybookTestRunner')) {
    return <>Disabled for Test Runner</>
  }

  return <Story />
}

export const decorators = [
  ComponentSizeDecorator,
  DisableTestRunnerDecorator,
  mswDecorator,
]