import AssetSDK from './src/index'
import Arweave from 'arweave'
import Bundlr from '@bundlr-network/client'
import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const bundlr = new Bundlr('https://node2.bundlr.network', 'arweave', jwk)
const warp = WarpFactory.forMainnet()

const SDK = AssetSDK.init({ arweave, bundlr, warp, wallet: jwk })

async function main() {
  //const result = await SDK.get("S_l35BoThRZfCXC313m3S2tfKybBhxgvPrmP-BHx4tg", 'app')
  const result = await SDK.get("rzlYd5RFIIbSQxFcJ-dnnKQUt8mhqcE36p4CrIu5je4", "app")
  console.log(result)


}

main()
