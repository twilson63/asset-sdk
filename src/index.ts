import { TradeableAsset, Result, SDK } from './faces'
import { CreateAsset } from './lib'
import services from './services/asset-svc'
//export const create = (asset: TradeableAsset): Promise<Result> => Promise.resolve({ ok: true })
//export const get: Promise<Result> = (id: string) => Promise.resolve({ ok: true, asset: {} })

export default Object.freeze({
  init: (env: any): SDK => {
    const svc = services(env)
    return Object.freeze({
      create: async (asset: TradeableAsset): Promise<Result> => CreateAsset(asset).runWith(svc).toPromise()
    })
  }
})