import { useEffect, useState } from 'react'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
const fenineRpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.fene.app'

const providerCache = new Map<number, unknown>()
let avatarRuntimePromise: Promise<any> | undefined

const getAvatarRuntime = () => {
  avatarRuntimePromise ||= import('@fenine/fns-avatar')
  return avatarRuntimePromise
}

const getProvider = (chainId: number, createJsonRpcProvider: (rpcUrl: string) => unknown) => {
  const cached = providerCache.get(chainId)
  if (cached) return cached

  let rpcUrl: string | undefined

  if (chainId === 920) rpcUrl = fenineRpcUrl
  if (chainId === 1)
    rpcUrl = alchemyKey
      ? `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`
      : 'https://eth.llamarpc.com'
  if (chainId === 11155111)
    rpcUrl = alchemyKey
      ? `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`
      : 'https://ethereum-sepolia-rpc.publicnode.com'

  if (!rpcUrl) return undefined

  const provider = createJsonRpcProvider(rpcUrl)
  providerCache.set(chainId, provider)
  return provider
}

const getAvatarSrc = async (record: string) => {
  try {
    const avatarRuntime = (await getAvatarRuntime()) as {
      createJsonRpcProvider: (rpcUrl: string) => unknown
      resolveMediaRecord: (
        record: string,
        options: Record<string, unknown>,
      ) => Promise<string | null>
    }

    return (
      (await avatarRuntime.resolveMediaRecord(record, {
        providerFactory: (chainId: number) =>
          getProvider(chainId, avatarRuntime.createJsonRpcProvider) as any,
        ipfs: 'https://cloudflare-ipfs.com',
        arweave: 'https://arweave.net',
      })) || undefined
    )
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export const useAvatarFromRecord = (avatarRecord?: string) => {
  const [avatar, setAvatar] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    if (typeof window === 'undefined') {
      setIsLoading(false)
      return () => {
        mounted = false
      }
    }

    if (avatarRecord)
      getAvatarSrc(avatarRecord)
        .then((_avatar) => {
          if (mounted) setAvatar(_avatar)
        })
        .finally(() => {
          if (mounted) setIsLoading(false)
        })
    else setIsLoading(false)

    return () => {
      mounted = false
    }
  }, [avatarRecord])

  return {
    avatar,
    isLoading,
  }
}
