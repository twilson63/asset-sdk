import AssetSDK from './src/node.js'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))

const asset = AssetSDK.init({
  arweaveInfo: { host: 'arweave.net', port: 443, protocol: 'https' },
  //warpGateway: 'https://gateway.redstone.finance',
  warpGateway: 'https://d1o5nlqr4okus2.cloudfront.net',
  bundlrNode: 'https://node2.bundlr.network',
  stampContract: 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA',
  barContract: 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA',
  assetContractSrc: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs',
  cacheService: 'https://cache.permaweb.tools',
  wallet: jwk
})

async function main() {
  // create a web-page asset
  const result = await asset.create({
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
    //,
    //forks: 'XXXX'
  })

  console.log(result)

}

main()
// create a blog-post asset

// create a image asset
/*
const result = await asset.create({
  type: 'image',
  title: 'Avatar',
  description: 'A description of an avatar',
  topics: [],
  balances: {
    'MY_WALLET': 1000000
  },
  currency: 'matic'
})
*/
// create a video asset

