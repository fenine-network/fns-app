import deployments from '@fenine/ens-contracts/deployments/fenine/deployments.json'
import { addEnsContracts } from '@fenine/ensjs'
import type { ChainWithEns } from '@fenine/ensjs/contracts'
import { defineChain, type Address } from 'viem'
import { localhost } from 'viem/chains'

import type { Register } from '@app/local-contracts'
import { makeLocalhostChainWithEnsAndOverrides } from '@app/overrides/makeLocalhostChainWithEnsAndOverrides'

export const deploymentAddresses = JSON.parse(
  process.env.NEXT_PUBLIC_DEPLOYMENT_ADDRESSES || '{}',
) as Register['deploymentAddresses']

export const fenineSubgraphUrl =
  process.env.NEXT_PUBLIC_ENS_SUBGRAPH_URL ||
  'https://subgraph.fenine.codes/subgraphs/name/fenine/fns'

export const fenineChain = defineChain({
  id: deployments._chainId,
  name: 'Fenine',
  network: 'fenine',
  nativeCurrency: {
    decimals: 18,
    name: 'Fenine',
    symbol: 'FEN',
  },
  rpcUrls: {
    default: {
      http: [deployments._rpc],
    },
    public: {
      http: [deployments._rpc],
    },
  },
  blockExplorers: {
    default: {
      name: 'Fenine Explorer',
      url: 'https://explorer.fene.app',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    },
  },
})

export const fenineWithEns = addEnsContracts(fenineChain, {
  contracts: {
    ensRegistry: {
      address: deployments.ENSRegistry as Address,
    },
    ensBaseRegistrarImplementation: {
      address: deployments.BaseRegistrarImplementation as Address,
    },
    ensEthRegistrarController: {
      address: deployments.FENRegistrarController as Address,
    },
    ensNameWrapper: {
      address: deployments.FENNameWrapper as Address,
    },
    ensPublicResolver: {
      address: deployments.PublicResolver as Address,
    },
    ensReverseRegistrar: {
      address: deployments.ReverseRegistrar as Address,
    },
    ensDefaultReverseRegistrar: {
      address: deployments.DefaultReverseRegistrar as Address,
    },
    ensUniversalResolver: {
      address: deployments.UniversalResolver as Address,
    },
  },
  subgraphs: {
    ens: {
      url: fenineSubgraphUrl,
    },
  },
  ens: {
    nativeTld: deployments._tld.replace(/^\./, ''),
    minRegistrationLength: 3,
  },
}) as ChainWithEns<typeof fenineChain>

export const localhostWithEns = makeLocalhostChainWithEnsAndOverrides<typeof localhost>(
  localhost,
  deploymentAddresses,
)

// Compatibility aliases while the rest of the app still assumes mainnet/sepolia labels.
export const mainnetWithEns = fenineWithEns
export const sepoliaWithEns = fenineWithEns

export const chainsWithEns = [fenineWithEns, localhostWithEns] as const

export const getSupportedChainById = (chainId: number | undefined) =>
  chainId ? chainsWithEns.find((c) => c.id === chainId) : undefined

export type SupportedChain = typeof fenineWithEns | typeof localhostWithEns

export const getNetworkFromUrl = (): 'mainnet' | 'sepolia' | 'localhost' | undefined => {
  if (typeof window === 'undefined') return undefined

  const { hostname } = window.location

  if (process.env.NEXT_PUBLIC_CHAIN_NAME === 'localhost') return 'localhost'
  if (process.env.NEXT_PUBLIC_PROVIDER && (hostname === 'localhost' || hostname === '127.0.0.1')) {
    return 'localhost'
  }

  if (process.env.NEXT_PUBLIC_CHAIN_NAME === 'sepolia') return 'sepolia'
  return 'mainnet'
}

export const getChainsFromUrl = () => {
  const network = getNetworkFromUrl()

  if (network === 'localhost') return [localhostWithEns] as const
  return [fenineWithEns] as const
}
