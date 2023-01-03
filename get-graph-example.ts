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

// App Node 
const NODE = 'vCU8cXnxkkMupiACruf9ih2M4k_CWIEvGsozbY9jlzg'

async function main() {
  const result = await SDK.graph(NODE)
  console.log(JSON.stringify(result, null, 2))
}

main()
//createGraph()

async function createGraph() {
  /*
  const root = await SDK.create({
    meta: "# Graph Example",
    data: "<h1>Graph Example</h1>",
    groupId: "GRAPH_TEST",
    type: "app",
    title: "Graph App",
    description: "Graph App test",
    topics: ['test'],
    balances: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 10000
    }
  })

  console.log(root)

  const v1 = await SDK.create({
    meta: "# Graph Example v1",
    data: "<h1>Graph Example v1</h1>",
    groupId: "GRAPH_TEST",
    type: "app",
    title: "Graph App v1",
    description: "Graph App test",
    topics: ['test'],
    forks: root.id,
    balances: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 10000
    }
  })

  console.log(v1)
  

  const v2 = await SDK.create({
    meta: "# Graph Example v2",
    data: "<h1>Graph Example v2</h1>",
    groupId: "GRAPH_TEST",
    type: "app",
    title: "Graph App v2",
    description: "Graph App test",
    topics: ['test'],
    forks: 'QbTshWZWxU205dYM1_qA-PNEEd9kcVaAAFbsVzIj5_g',
    balances: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 10000
    }
  })
  */
  //09NKUMApRJqnFsfQLb33EbDmfCDjtVEIsolGkNVprgg

  /*
  const v1_1 = await SDK.create({
    meta: "# Graph Example v1.1",
    data: "<h1>Graph Example v1.1</h1>",
    groupId: "GRAPH_TEST",
    type: "app",
    title: "Graph App v1_1",
    description: "Graph App test",
    topics: ['test'],
    forks: '09NKUMApRJqnFsfQLb33EbDmfCDjtVEIsolGkNVprgg',
    balances: {
      'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI': 10000
    }
  })
  console.log(v1_1)
  */

}

