import { z } from 'zod'
import Arweave from 'arweave'
import Bundlr from '@bundlr-network/client'
import { Warp } from 'warp-contracts'

export const Environment = z.object({
  arweave: z.instanceof(Arweave),
  bundlr: z.instanceof(Bundlr),
  warp: z.instanceof(Warp),
  warpCacheURL: z.string().default('https://cache.permapages.app'),
  wallet: z.any(),
  contracts: z.object({
    stamp: z.string().default('FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA'),
    bar: z.string().default('VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA')
  }).default({
    stamp: 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA',
    bar: 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA'
  }),
  sources: z.object({
    asset: z.string().default('x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs')
  }).default({ asset: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs' })
})

export type EnvironmentType = z.infer<typeof Environment>

export interface SDK {
  init: any
}

export const AtomicAsset = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(180),
  description: z.string().max(300),
  type: z.string(),
  topics: z.array(z.string()),
  balances: z.record(z.string(), z.number()),
  content: z.string().optional(),
  html: z.string().optional(),
  forks: z.string().optional(),
  appId: z.string().optional(),
  meta: z.string().optional()
})

export type AtomicAssetType = z.infer<typeof AtomicAsset>
export type FPJSON = Array<string | string[]>
