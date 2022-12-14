import { TradeableAsset } from './faces'

export const create: Promise<Result> = (asset: TradeableAsset) => Promise.resolve({ ok: true })
export const get: Promise<Result> = (id: string) => Promise.resolve({ ok: true, asset: {} })
