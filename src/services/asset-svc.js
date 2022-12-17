// @ts-nocheck
import Arweave from 'arweave'
import { map } from 'ramda'

//const URL = 'https://gateway.redstone.finance/gateway/contracts/deploy'

// need to inject env into service...
export default function (env) {

  const URL = `${env.warpGateway}/gateway/contracts/deploy`
  const arweave = Arweave.default.init(env.arweaveInfo)

  const getData = (id) => arweave.api.get(id)
  //.then(res => res.ok ? res.data : Promise.reject(res))

  const publish = (asset) => {
    return Promise.resolve(asset)
      .then(asset => Promise.all([
        dispatch(asset.source),
        dispatch(asset.asset)
      ]))
      .then(([_, asset]) => asset)
      .then(x => (console.log('results', x), x))
      .then(post)
      .then(x => (console.log('asset', x), x))
  }

  async function dispatch({ data, tags }) {
    if (!arweaveWallet) {
      return Promise.reject('No wallet found')
    }
    const tx = await arweave.createTransaction({ data })
    map(t => tx.addTag(t.name, t.value), tags)

    const result = await arweaveWallet.dispatch(tx)
    return { data, tags, id: result.id }
  }

  async function post({ data, tags, id }) {
    if (!fetch) {
      return Promise.reject('fetch is required!')
    }
    const tx = await arweave.createTransaction({ data })
    map(t => tx.addTag(t.name, t.value), tags)

    await arweave.transactions.sign(tx, env.wallet)
    tx.id = id

    const res = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ contractTx: tx }),
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(res => res.ok ? res.json() : Promise.reject(res))

    return { id, ...res }
  }

  return {
    publish,
    getData
  }

}
