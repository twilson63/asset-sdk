import crypto from 'crypto'
import fetch from 'node-fetch'
import Bundlr from '@bundlr-network/client'

import AssetSDK from './index.js'


// set browser globals
globalThis.crypto = crypto

globalThis.fetch = fetch

export default {
  init: (env) => {
    const bundlr = new Bundlr.default(env.bundlrNode, 'arweave', env.wallet)
    env = { ...env, bundlr }
    return AssetSDK.init(env)
  }
}