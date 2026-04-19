import { lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { ComponentProps } from 'react'

import { lightTheme as thorinLightTheme } from '@ensdomains/thorin'

type RainbowKitProviderProps = ComponentProps<typeof RainbowKitProvider>

const rainbowKitTheme: Theme = {
  ...lightTheme({
    accentColor: thorinLightTheme.colors.accent,
    borderRadius: 'medium',
  }),
  fonts: {
    body: 'Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
}

export const RainbowKitWithParaProvider = (props: RainbowKitProviderProps) => {
  return <RainbowKitProvider theme={rainbowKitTheme} {...props} />
}
