import { addEnsContracts } from '@fenine/ensjs'
import type { Chain } from 'viem'

export const addEnsContractsWithSubgraph = <const TChain extends Chain>({
  chain,
  subgraphId,
  apiKey,
}: {
  chain: TChain
  subgraphId: string
  apiKey: string
}) => ({
  ...addEnsContracts(chain),
  subgraphs: {
    ens: {
      url: `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/subgraphs/id/${subgraphId}`,
    },
  },
})
