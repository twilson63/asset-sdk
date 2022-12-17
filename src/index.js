//import { TradeableAsset, Result, SDK } from './faces'

import { CreateAsset } from './lib/index.js'
import services from './services/asset-svc.js'
import { assoc } from 'ramda'

export default Object.freeze({
  init: (env) => {
    const svc = services(env)
    return Object.freeze({
      create: async (asset) => CreateAsset(
        assoc('contractSRC', env.assetContractSrc, asset)
      ).runWith(svc).toPromise()
    })
  }
})
