import { TradeableAsset, Result, SDK } from './faces'
import { CreateAsset } from './lib'

//export const create = (asset: TradeableAsset): Promise<Result> => Promise.resolve({ ok: true })
//export const get: Promise<Result> = (id: string) => Promise.resolve({ ok: true, asset: {} })

export default Object.freeze({
  init: (env: any): SDK => ({
    create: async (asset: TradeableAsset): Promise<Result> => CreateAsset(asset).runWith(env).toPromise()
  })
})