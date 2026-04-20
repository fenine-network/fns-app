/* eslint-disable @typescript-eslint/naming-convention */
import '@ensdomains/thorin/dist/thorin.css'
import '@splidejs/react-splide/css'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Space_Grotesk } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { IntercomProvider } from 'react-use-intercom'
import { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components'

import {
  Mode,
  modeVars,
  lightTheme as thorinLightTheme,
  ThemeProvider as ThorinThemeProvider,
} from '@ensdomains/thorin'

import { NetworkNotifications } from '@app/components/@molecules/NetworkNotifications/NetworkNotifications'
import { TestnetWarning } from '@app/components/TestnetWarning'
import { TransactionNotifications } from '@app/components/TransactionNotifications'
import { TransactionStoreProvider } from '@app/hooks/transactions/TransactionStoreContext'
import { Basic } from '@app/layouts/Basic'
import { TransactionFlowProvider } from '@app/transaction-flow/TransactionFlowProvider'
import { setupAnalytics } from '@app/utils/analytics'
import { PostHogProvider } from '@app/utils/analytics/posthog'
import { BreakpointProvider } from '@app/utils/BreakpointProvider'
import { QueryProviders } from '@app/utils/query/providers'
import { RainbowKitWithParaProvider } from '@app/utils/query/RainbowKitWithParaProvider'
import { SyncDroppedTransaction } from '@app/utils/SyncProvider/SyncDroppedTransaction'
import { SyncProvider } from '@app/utils/SyncProvider/SyncProvider'

import '@rainbow-me/rainbowkit/styles.css'

import i18n from '../i18n'

import '../styles.css'

const INTERCOM_ID = process.env.NEXT_PUBLIC_INTERCOM_ID || 're9q5yti'

const uiFont = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
})

const anim = keyframes`
  0% {
    opacity: 1;
  }

  0%, 99% {
    pointer-events: auto;
  }

  100% {
    opacity: 0.5;
    pointer-events: none;
  }
`

const GlobalStyle = createGlobalStyle`
  :root {
    --font-ui: ${uiFont.style.fontFamily};
    --thrn-radii-card: 0px;
    --thrn-radii-input: 0px;
    --thrn-radii-large: 0px;
    --thrn-radii-almostExtraLarge: 0px;
    --thrn-radii-extraLarge: 0px;
    --thrn-radii-2xLarge: 0px;
    --thrn-radii-2_5xLarge: 0px;
    --thrn-radii-3xLarge: 0px;
    --thrn-radii-4xLarge: 0px;
    --thrn-color-accent: rgb(255, 71, 71);
    --thrn-color-accentPrimary: rgb(255, 71, 71);
    --thrn-color-accentBright: rgb(255, 108, 108);
    --thrn-color-accentDim: rgb(214, 52, 52);
    --thrn-color-accentLight: rgb(255, 232, 232);
    --thrn-color-accentSurface: rgb(255, 244, 244);
    --thrn-color-accentPrimaryText: rgb(255, 255, 255);
    --thrn-color-accentPrimaryBackground: rgb(255, 71, 71);
    --thrn-color-accentPrimaryBorder: transparent;
    --thrn-color-accentPrimaryHover: rgb(232, 58, 58);
    --thrn-color-accentSecondaryText: rgb(255, 71, 71);
    --thrn-color-accentSecondaryBackground: rgb(255, 232, 232);
    --thrn-color-accentSecondaryBorder: transparent;
    --thrn-color-accentSecondaryHover: rgb(255, 214, 214);
    --thrn-color-blueGradient: linear-gradient(120deg, rgb(255, 71, 71) 0%, rgb(255, 103, 103) 48%, rgb(255, 156, 122) 100%);
    --thrn-color-bluePrimaryText: rgb(255, 255, 255);
    --thrn-color-bluePrimaryBackground: rgb(255, 71, 71);
    --thrn-color-bluePrimaryBorder: transparent;
    --thrn-color-bluePrimaryHover: rgb(232, 58, 58);
    --thrn-color-blueSecondaryText: rgb(255, 71, 71);
    --thrn-color-blueSecondaryBackground: rgb(255, 232, 232);
    --thrn-color-blueSecondaryBorder: transparent;
    --thrn-color-blueSecondaryHover: rgb(255, 214, 214);
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  *,
  ::before,
  ::after {
    font-family: var(--font-ui),
      'Noto Color Emoji',
      'Apple Color Emoji',
      sans-serif;
  }

  body {
    background: radial-gradient(50% 50% at 50% 50%, rgba(255, 71, 71, 0.08) 0%, rgba(255, 255, 255, 0) 100%), #F7F7F7;
    color: var(--thrn-color-textPrimary);
  }

  body, .min-safe {
    min-height: 100vh;
    /* stylelint-disable-next-line value-no-vendor-prefix */
    @supports (-webkit-touch-callout: none) {
      /* stylelint-disable-next-line value-no-vendor-prefix */
      min-height: -webkit-fill-available;
    }
  }

  [data-theme="dark"] body {
    background: rgb(20, 20, 22);
  }

  [data-theme="dark"] {
    --thrn-radii-card: 0px;
    --thrn-radii-input: 0px;
    --thrn-radii-large: 0px;
    --thrn-radii-almostExtraLarge: 0px;
    --thrn-radii-extraLarge: 0px;
    --thrn-radii-2xLarge: 0px;
    --thrn-radii-2_5xLarge: 0px;
    --thrn-radii-3xLarge: 0px;
    --thrn-radii-4xLarge: 0px;
    --thrn-color-accent: rgb(255, 108, 108);
    --thrn-color-accentPrimary: rgb(255, 108, 108);
    --thrn-color-accentBright: rgb(255, 138, 138);
    --thrn-color-accentDim: rgb(222, 73, 73);
    --thrn-color-accentLight: rgb(71, 24, 24);
    --thrn-color-accentSurface: rgb(51, 18, 18);
    --thrn-color-accentPrimaryBackground: rgb(255, 108, 108);
    --thrn-color-accentPrimaryHover: rgb(255, 126, 126);
    --thrn-color-accentSecondaryText: rgb(255, 130, 130);
    --thrn-color-accentSecondaryBackground: rgb(67, 22, 22);
    --thrn-color-accentSecondaryHover: rgb(92, 28, 28);
    --thrn-color-blueGradient: linear-gradient(120deg, rgb(255, 108, 108) 0%, rgb(255, 137, 137) 48%, rgb(255, 179, 148) 100%);
    --thrn-color-bluePrimaryBackground: rgb(255, 108, 108);
    --thrn-color-bluePrimaryHover: rgb(255, 126, 126);
    --thrn-color-blueSecondaryText: rgb(255, 130, 130);
    --thrn-color-blueSecondaryBackground: rgb(67, 22, 22);
    --thrn-color-blueSecondaryHover: rgb(92, 28, 28);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    font-feature-settings: "ss01" on, "ss03" on;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-font-feature-settings: "ss01" on, "ss03" on;
  }

  .cacheable-component > div:last-of-type > div > * {
    transition: opacity 0.15s ease-in-out;
    opacity: 1;
  }

  .cacheable-component-cached > div:last-of-type > div > * {
    opacity: 0.5;
    pointer-events: none;
    animation: ${anim} 0.25s ease-in-out 0.5s backwards;

    &.transaction-loader {
      opacity: 1;
      pointer-events: auto;
      animation: none;
    }
  }
`

const breakpoints = {
  xs: '(min-width: 360px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

setupAnalytics()

declare global {
  interface Window {
    __theme: Mode
    __setPreferredTheme: (theme: Mode) => void
    __onThemeChange: (theme: Mode) => void
  }
}

const AppWithThorin = ({ Component, pageProps }: Omit<AppPropsWithLayout, 'router'>) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  const themeWithCSSVars = {
    ...thorinLightTheme,
    colors: modeVars.color,
    boxShadows: {
      '0': '0 0 0 0 var(--thrn-color-backgroundPrimary)',
      '0.02': '0 2px 8px var(--thrn-color-backgroundPrimary)',
      '0.5': '0 0 0 0.125rem var(--thrn-color-backgroundPrimary)',
      '0.25': '0 2px 12px var(--thrn-color-backgroundPrimary)',
      '1': '0 0 0 0.25rem var(--thrn-color-backgroundPrimary)',
    },
  }

  return (
    <PostHogProvider>
      <RainbowKitWithParaProvider>
        <TransactionStoreProvider>
          <ThemeProvider theme={themeWithCSSVars}>
            <BreakpointProvider queries={breakpoints}>
              <IntercomProvider appId={INTERCOM_ID}>
                <GlobalStyle />
                <SyncProvider>
                  <TransactionFlowProvider>
                    <SyncDroppedTransaction>
                      <NetworkNotifications />
                      <TransactionNotifications />
                      <TestnetWarning />
                      <Basic>{getLayout(<Component {...pageProps} />)}</Basic>
                    </SyncDroppedTransaction>
                  </TransactionFlowProvider>
                </SyncProvider>
              </IntercomProvider>
            </BreakpointProvider>
          </ThemeProvider>
        </TransactionStoreProvider>
      </RainbowKitWithParaProvider>
    </PostHogProvider>
  )
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const defaultMode = typeof window !== 'undefined' ? window.__theme : 'light'

  return (
    <I18nextProvider i18n={i18n}>
      <QueryProviders>
        <ThorinThemeProvider
          onThemeChange={(mode) => window.__setPreferredTheme(mode)}
          defaultMode={defaultMode}
        >
          <AppWithThorin {...{ Component, pageProps }} />
        </ThorinThemeProvider>
      </QueryProviders>
    </I18nextProvider>
  )
}

export default MyApp
