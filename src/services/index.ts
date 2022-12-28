import { EnvironmentType } from '../types'
import { v4 } from 'uuid'
import { compose, concat, map, path, prop, propEq, find, propOr, startsWith, filter } from 'ramda'

interface DataItem {
  data: any,
  tags: { name: string, value: string }[]
}

export default function (env: EnvironmentType) {
  const getData = (id: string) => env.arweave.api.get(id).then(prop('data'))

  const publish = (asset: { source: DataItem, target: DataItem }) => {
    return dispatch(asset.source)
      .then(({ id }) => {
        asset.target.tags = [...asset.target.tags, { name: 'META', value: id }]
        return dispatch(asset.target)
      })
      .then(({ id }) => deployToWarp(id))
  }

  async function dispatch(dataItem: DataItem) {
    return env.bundlr.upload(dataItem.data, {
      tags: [
        { name: 'App-Name', value: 'SmartWeaveContract' },
        { name: 'App-Version', value: '0.3.0' },
        { name: 'Contract-Src', value: env.sources.asset },
        ...dataItem.tags
      ]
    })
  }

  async function deployToWarp(id: string) {
    const { contractTxId } = await env.warp.register(id, 'node2')
    return { id: contractTxId }
  }

  function run(data: { query: string, variables: Record<string, any> }): Promise<any> {
    return env.arweave.api.post('graphql', data)
      .then(x => (console.log('result', x.data.errors), x))
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

  return {
    randomUUID,
    publish,
    getData,
    gql
  }

}
