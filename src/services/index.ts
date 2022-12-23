import { EnvironmentType } from '../types'
import { v4 } from 'uuid'
import { concat, map, path, prop } from 'ramda'

interface DataItem {
  data: any,
  tags: { name: string, value: string }[]
}

export default function (env: EnvironmentType) {
  const getData = (id: string) => env.arweave.api.get(id).then(prop('data'))

  const publish = (asset: { source: DataItem, asset: DataItem }) => {
    asset.asset.tags = concat([
      { name: 'App-Name', value: 'SmartWeaveContract' },
      { name: 'App-Version', value: '0.3.0' },
      { name: 'Contract-Src', value: env.sources.asset }
    ], asset.asset.tags)
    return dispatch(asset.source)
      .then(() => dispatch(asset.asset))
    //.then(({ id }) => post({ id, ...asset.asset }))
  }

  async function dispatch(dataItem: DataItem) {
    return env.bundlr.upload(dataItem.data, { tags: dataItem.tags })
  }

  /*
  async function post({ id }) {
    if (!fetch) {
      return Promise.reject('fetch is required!')
    }

    const res = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        console.log(res)
        throw new Error('Error while registering item!')
      }
    })

    return { id, ...res }
  }
  */


  function run(data: { query: string, variables: Record<string, any> }): Promise<any> {
    return env.arweave.api.post('graphql', data).then(path(['data', 'data', 'transactions']))
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
