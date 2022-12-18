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
    return dispatch(asset.source)
      .then(() => dispatch(asset.asset))
      .then(({ id }) => post({ id, ...asset.asset }))
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

  function run({ query, variables }) {
    return fetch(`${URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    }).then(res => res.ok ? res.json() : Promise.reject(res))
  }

  async function gql(q) {
    let hasNextPage = true;
    let edges = []
    let cursor = ""

    while (hasNextPage) {
      const result = await run({ query: q.query, variables: { ...q.variables, cursor } })
        .then(path(['data', 'transactions']))

      if (result.edges && result.edges.length) {
        edges = edges.concat(result.edges)
        cursor = result.edges[result.edges.length - 1].cursor
      }
      hasNextPage = result.pageInfo.hasNextPage
    }

    return edges
  }

  return {
    publish,
    getData,
    gql
  }

}
