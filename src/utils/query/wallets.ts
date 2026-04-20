import { connectorsForWallets, type WalletList } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'

import { WC_PROJECT_ID } from '../constants'
import { isInsideSafe } from '../safe'

export const rainbowKitWallets = isInsideSafe()
  ? [safeWallet]
  : ([
      // injected / not always shown
      injectedWallet,
      safeWallet,
      braveWallet,
      // always shown
      walletConnectWallet,
      rainbowWallet,
      coinbaseWallet,
      metaMaskWallet,
      ledgerWallet,
      argentWallet,
    ] as const satisfies WalletList[number]['wallets'])

export const rainbowKitConnectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: rainbowKitWallets,
    },
  ],
  {
    appName: 'FNS',
    projectId: WC_PROJECT_ID,
  },
)
