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
  //const result = await SDK.get("63444ab5-b669-4945-8b23-84175dcbf0d2", 'app')
  //console.log(result)

  const result = await SDK.create({
    content: "# now.arweave.dev",
    html: "<h1>now.arweave.dev</h1>",
    appId: "IfPAcD48oDDg0Ncww3FAZxsDZVZNyjPGNBtgYegUzuY",
    type: "app",
    title: "Now",
    description: "The marketplace of ideas on the Permaweb!",
    topics: ['marketplace'],
    balances: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 10000
    }
  })

  console.log(result)
}

main()
