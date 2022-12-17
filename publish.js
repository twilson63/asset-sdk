import Arweave from 'arweave'
import Bundlr from '@bundlr-network/client'
import fs from 'fs'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })

const wallet = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'))

const bundlr = new Bundlr.default("https://node2.bundlr.network", "arweave", wallet)

const data = fs.readFileSync('twilson63-asset-sdk-0.0.3.tgz')
const tags = [{ name: 'Content-Type', value: 'application/gzip' }]

const tx = bundlr.createTransaction(data, { tags })
await tx.sign()
console.log('tx: ', tx.id)
await tx.upload()
