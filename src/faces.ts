import { z } from 'zod'

export interface Result {
  ok: boolean
}

export interface SDK {
  create: (asset: TradeableAsset) => Promise<Result>
}

const TradeableAsset = z.object({
  id: z.string().optional(),
  title: z.string().min(10).max(180),
  description: z.string().max(300),
  type: z.string(),
  topics: z.array(z.string()),
  balances: z.record(z.string(), z.number()),
  content: z.string().optional(),
  html: z.string().optional(),
  fork: z.string().optional()
})

export type TradeableAsset = z.infer<typeof TradeableAsset>