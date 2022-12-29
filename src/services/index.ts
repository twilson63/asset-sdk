import { EnvironmentType, FPJSON } from '../types'
import { v4 } from 'uuid'
import { compose, concat, map, path, prop, propEq, find, propOr, startsWith, filter, equals, not } from 'ramda'
// @ts-ignore
import fpjson from 'fpjson-lang'

interface DataItem {
  data: any,
  tags: { name: string, value: string }[]
}

export default function (env: EnvironmentType) {
  const getData = (id: string) => env.arweave.api.get(id).then(prop('data'))

  const publish = (asset: { meta: DataItem, target: DataItem }) => {
    return dispatch(asset.meta)
      .then(({ id }) => {
        asset.target.tags = [
          ...asset.target.tags,
          { name: 'META', value: id },
          { name: 'App-Name', value: 'SmartWeaveContract' },
          { name: 'App-Version', value: '0.3.0' },
          { name: 'Contract-Src', value: env.sources.asset }
        ]
        return dispatch(asset.target)
      })
      .then(({ id }) => deployToWarp(id))
  }

  async function dispatch(dataItem: DataItem) {
    return env.bundlr.upload(dataItem.data, { tags: dataItem.tags })
  }

  async function deployToWarp(id: string) {
    const { contractTxId } = await env.warp.register(id, 'node2')
    return { id: contractTxId }
  }

  function run(data: { query: string, variables: Record<string, any> }): Promise<any> {
    return env.arweave.api.post('graphql', data)
      //.then(x => (console.log('result', x.data.errors), x))
      .then(path(['data', 'data', 'transactions']))
  }

  async function gql(q: { query: string, variables: Record<string, any> }) {
    let hasNextPage = true;
    let edges: any[] = []
    let cursor = ""

    while (hasNextPage) {
      const result = await run({ query: q.query, variables: { ...q.variables, cursor } })

      if (result.edges && result.edges.length) {
        // @ts-ignore
        edges = edges.concat(result.edges)
        cursor = result.edges[result.edges.length - 1].cursor
      }
      hasNextPage = result.pageInfo.hasNextPage
    }

    return edges
  }

  function randomUUID() {
    return v4()
  }

  function stampCache(filter: FPJSON) {
    return fetch(`${env.warpCacheURL}/${env.contracts.stamp}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(filter)
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          // fallback to warp
          return env.warp
            .contract(env.contracts.stamp)
            .connect(env.wallet)
            .setEvaluationOptions({
              internalWrites: true,
              allowBigInt: true
            })
            .readState()
            .then((result) => fpjson([filter, result.cachedValue.state]))
        }
      })

  }

  function stamp(asset: string) {
    // check if vouched
    // then post interaction via bundlr
    // const addr = env.arweave.wallets.getAddress(env.wallet)
    // // TODO: check if vouched first
    // return isVouched(addr)
    //   .then(result => env.warp.contract(env.contracts.stamp)
    //     .connect(env.wallet)
    //     .setEvaluationOptions({
    //       internalWrites: true,
    //       allowBigInt: true,
    //       unsafeClient: 'allow'
    //     })
    //     .writeInteraction({
    //       function: 'stamp',
    //       transactionId: asset,
    //       timestamp: Date.now()
    //     })
    //   )
  }

  function isVouched(addr: Promise<string>) {
    return env.warp
      .contract(env.contracts.vouchdao)
      .setEvaluationOptions({
        allowBigInt: true
      })
      .readState()
      .then(compose(
        not,
        equals(undefined),
        path(['cachedValue', 'state', 'vouched'])
      ))
  }

  return {
    randomUUID,
    publish,
    getData,
    gql,
    stampCache,
    stamp
  }

}
