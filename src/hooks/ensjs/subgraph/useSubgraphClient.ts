import { useMemo } from 'react'
import { useClient } from 'wagmi'

import { createSubgraphClient } from '@ensdomains/ensjs/subgraph'

import { ClientWithEns } from '@app/types'

export const useSubgraphClient = () => {
  const client = useClient()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(
    () => (client ? createSubgraphClient({ client: client as ClientWithEns }) : undefined),
    [client],
  )
}
