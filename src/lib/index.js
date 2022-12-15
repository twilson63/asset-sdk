// @ts-nocheck

import { ReaderT, Async } from 'crocks'
import { lensProp, over, propEq } from 'ramda'
import createWebPageAsset from './web-page'


const { of, ask, lift } = ReaderT(Async)

const doPost = (env, asset) => Async.of(asset)
  // generate AssetId or use the one provided
  .map(over(lensProp('id'), (id) => id || crypto.randomUUID()))
  .chain(asset => {
    if (propEq('type', 'web-page', asset)) {
      asset.contractSRC = env.assetContractSrc
      return createWebPageAsset(asset)
    }
  })

const flow = asset => ask(env => doPost(env, asset)).chain(lift)

export const CreateAsset = (asset) => of(asset)
  .chain(flow)