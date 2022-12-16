import AssetSDK from './src'

const asset = AssetSDK.init({
  arweaveInfo: { host: 'arweave.net', port: 443, protocol: 'https' },
  warpGateway: 'https://gateway.redstone.finance',
  bundlrNode: 'https://node2.bundlr.network',
  stampContract: 'FMRHYgSijiUNBrFy-XqyNNXenHsCV0ThR4lGAPO4chA',
  barContract: 'VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA',
  assetContractSrc: 'x0ojRwrcHBmZP20Y4SY0mgusMRx-IYTjg5W8c3UFoNs',
  cacheService: 'https://cache.permaweb.tools',
  wallet: 'use_wallet'
})

async function main() {
  // create a web-page asset
  const result = await asset.create({
    content: "My Markdown",
    html: "My HTML",
    appId: "TX_ID for app",
    type: "app",
    title: "Now",
    description: "The marketplace of ideas on the Permaweb!",
    topics: ['marketplace'],
    balances: {
      '1': 10000
    },
    fork: 'XXXX'
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

