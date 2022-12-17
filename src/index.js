import { z } from 'zod'
import { CreateAsset } from './lib/index.js'
import services from './services/asset-svc.js'
import { assoc } from 'ramda'


const TradeableAsset = z.object({
  id: z.string().optional(),
  title: z.string().min(10).max(180),
  description: z.string().max(300),
  type: z.string(),
  topics: z.array(z.string()),
  balances: z.record(z.string(), z.number()),
  content: z.string().optional(),
  html: z.string().optional(),
  forks: z.string().optional(),
  appId: z.string().optional()
})

export default Object.freeze({
  init: (env) => {
    const svc = services(env)
    return Object.freeze({
      create: async (asset) => {
        TradeableAsset.parse(asset)
        return CreateAsset(
          assoc('contractSRC', env.assetContractSrc, asset)
        ).runWith(svc).toPromise()
      }
    })
  }
})
