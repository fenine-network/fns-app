import { lightTheme, RainbowKitProvider, Theme } from '@rainbow-me/rainbowkit'
import { ComponentProps } from 'react'

type RainbowKitProviderProps = ComponentProps<typeof RainbowKitProvider>

const rainbowKitTheme: Theme = {
  ...lightTheme({
    accentColor: '#FF4747',
    borderRadius: 'medium',
  }),
  fonts: {
    body: 'var(--font-ui), "Noto Color Emoji", "Apple Color Emoji", monospace',
  },
}

export const RainbowKitWithParaProvider = (props: RainbowKitProviderProps) => {
  return <RainbowKitProvider theme={rainbowKitTheme} {...props} />
}
