import deployments from '@contracts/deployments/fenine/deployments.json'
import { Address } from 'viem'
import { useChainId, useReadContract } from 'wagmi'

import { nativeChainId, nativeTld } from '@app/utils/utils'

import { useAddressRecord } from './ensjs/public/useAddressRecord'

const USD_ORACLE_NAME = process.env.NEXT_PUBLIC_USD_ORACLE_NAME || `fen-usd.data.${nativeTld}`
const priceOracleSnippet = [
  {
    inputs: [],
    name: 'usdOracle',
    outputs: [{ name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const
const latestAnswerSnippet = [
  {
    inputs: [],
    name: 'latestAnswer',
    outputs: [{ name: '', type: 'int256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

export const useEthPrice = () => {
  const chainId = useChainId()
  const isFenine = chainId === nativeChainId

  const { data: fenineUsdOracleAddress } = useReadContract({
    abi: priceOracleSnippet,
    address: deployments.ExponentialPremiumPriceOracle as Address,
    functionName: 'usdOracle',
    query: {
      enabled: isFenine,
    },
  })

  const { data: address_ } = useAddressRecord({
    name: USD_ORACLE_NAME,
    enabled: !isFenine,
  })

  const address = isFenine
    ? (fenineUsdOracleAddress as Address | undefined) || undefined
    : (address_?.value as Address) || undefined

  return useReadContract({
    abi: latestAnswerSnippet,
    address,
    functionName: 'latestAnswer',
    query: {
      enabled: !!address,
    },
  })
}
