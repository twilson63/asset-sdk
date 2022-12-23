import { EnvironmentType } from '../types'

import { map, path, prop } from 'ramda'

//const URL = 'https://gateway.redstone.finance/gateway/contracts/deploy'

// need to inject env into service...
export default function (env: EnvironmentType) {

  //const ARWEAVE_URL = `${env.arweaveInfo.protocol}://${env.arweaveInfo.host}:${env.arweaveInfo.port}`

  //const URL = `${env.warpGateway}/gateway/contracts/register`

  //const arweave = Arweave.default ? Arweave.default.init(env.arweaveInfo) : Arweave.init(env.arweaveInfo)

  const getData = (id: string) => env.arweave.api.get(id).then(prop('data'))

  /*
  const publish = (asset) => {
    return dispatch(asset.source)
      .then(() => dispatch(asset.asset))
    //.then(({ id }) => post({ id, ...asset.asset }))
  }

  async function dispatch({ data, tags }) {
    return env.bundlr.upload(data, { tags })
  }
  */
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


  return {
    //publish,
    getData,
    gql
  }

}
