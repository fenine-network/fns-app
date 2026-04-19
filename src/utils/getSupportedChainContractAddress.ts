import { getChainContractAddress, type Address } from 'viem'

import { ClientWithEns } from '@app/types'

export const getSupportedChainContractAddress = ({
  client,
  contract,
  blockNumber,
}: {
  client?: Pick<ClientWithEns, 'chain'> | null
  contract: string
  blockNumber?: bigint
}) => {
  if (!client) return '0x0000000000000000000000000000000000000000' as Address

  return getChainContractAddress({
    chain: client.chain,
    contract,
    blockNumber,
  }) as Address
}
