import { z } from 'zod'
import Arweave from 'arweave'
import Bundlr from '@bundlr-network/client'

export const Environment = z.object({
  arweave: z.instanceof(Arweave),
  bundlr: z.instanceof(Bundlr),
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