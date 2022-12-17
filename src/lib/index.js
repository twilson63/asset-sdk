// @ts-nocheck
import crocks from 'crocks'
import { lensProp, over, propEq } from 'ramda'
import createWebPageAsset from './web-page/index.js'
import createAppAsset from './app/index.js'

const { ReaderT, Async } = crocks
const { of, ask, lift } = ReaderT(Async)

const doPost = (svc, asset) => Async.of(asset)
  // generate AssetId or use the one provided
  .map(over(lensProp('id'), (id) => id || crypto.randomUUID()))
  .map(asset => {
    if (propEq('type', 'web-page', asset)) {
      return createWebPageAsset(asset)
    } else if (propEq('type', 'app', asset)) {
      return createAppAsset(asset)
    }
  })
  .chain(Async.fromPromise(svc.publish))

const flow = asset => ask(svc => doPost(svc, asset)).chain(lift)

export const CreateAsset = (asset) => flow(asset)