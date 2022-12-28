import { EnvironmentType } from '../types'
import { v4 } from 'uuid'
import { compose, concat, map, path, prop, propEq, find, propOr, startsWith, filter } from 'ramda'
import { ArweaveSigner } from 'arbundles/src/signing'
import { createData } from 'arbundles'

interface DataItem {
  data: any,
  tags: { name: string, value: string }[]
}

export default function (env: EnvironmentType) {
  const getData = (id: string) => env.arweave.api.get(id).then(prop('data'))

  const publish = (asset: { source: DataItem, asset: DataItem }) => {
    console.log(JSON.stringify(asset.source, null, 2))
    console.log(JSON.stringify(asset.asset, null, 2))
    // asset.asset.tags = concat([
    //   { name: 'App-Name', value: 'SmartWeaveContract' },
    //   { name: 'App-Version', value: '0.3.0' },
    //   { name: 'Contract-Src', value: env.sources.asset }
    // ], asset.asset.tags)
    return dispatch(asset.source)
      .then(() => dispatch(asset.asset))
      .then(({ id }) => deployToWarp(asset.asset, id))

    //.then(({ id }) => post({ id, ...asset.asset }))
  }

  async function dispatch(dataItem: DataItem) {
    return env.bundlr.upload(dataItem.data, { tags: dataItem.tags })
  }

  async function deployToWarpManually(dataItem: DataItem, id: string) {
    if (!env.wallet) {
      throw new Error('Wallet is required!')
    }

    const signer = new ArweaveSigner(env.wallet)

    const getTag = (name: string) => compose(
      propOr('', 'value'),
      find(propEq('name', name))
    )(dataItem.tags)

    const getTopics = filter(
      compose(
        startsWith('Topic:'),
        prop('name')
      )
    )(dataItem.tags)

    const warpTags: { name: string, value: string }[] = [
      { name: 'App-Name', value: 'SmartWeaveContract' },
      { name: 'App-Version', value: '0.3.0' },
      { name: 'Contract-Src', value: env.sources.asset },
      { name: 'Content-Type', value: "application/x.arweave-manifest+json" },
      { name: 'Title', value: getTag('Title') as string },
      { name: 'Description', value: getTag('Description') as string },
      { name: 'Type', value: getTag('Type') as string },
      //{ name: 'Published', value: getTag('Published') as string },
      { name: 'Asset-Id', value: getTag('Asset-Id') as string },
      { name: 'Init-State', value: getTag('Init-State') as string },
      // need to add topics
      ...getTopics
    ]
    const item = createData(JSON.stringify({
      manifest: 'arweave/paths',
      version: '0.1.0',
      index: { path: 'index.html' },
      paths: { 'index.html': { id } }
    }), signer, { tags: warpTags })

    await item.sign(signer)

    await fetch('https://d1o5nlqr4okus2.cloudfront.net/gateway/contracts/deploy-bundled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-sream',
        Accept: 'application/json'
      },
      body: item.getRaw()
    }).then(r => {
      if (r.ok) {
        return r.json()
      } else {
        console.log(r)
        throw new Error('Could not deploy data item.')
      }
    })

    return { contract: item.id, id: getTag('Asset-Id') }

  }

  async function deployToWarp(dataItem: DataItem, id: string) {
    if (!env.wallet) {
      throw new Error('Wallet is required!')
    }

    const signer = new ArweaveSigner(env.wallet)

    const getTag = (name: string) => compose(
      propOr('', 'value'),
      find(propEq('name', name))
    )(dataItem.tags)

    const getTopics = filter(
      compose(
        startsWith('Topic:'),
        prop('name')
      )
    )(dataItem.tags)

    const warpTags: { name: string, value: string }[] = [
      { name: 'App-Name', value: 'SmartWeaveContract' },
      { name: 'App-Version', value: '0.3.0' },
      { name: 'Contract-Src', value: env.sources.asset },
      { name: 'Content-Type', value: "application/x.arweave-manifest+json" },
      { name: 'Title', value: getTag('Title') as string },
      { name: 'Description', value: getTag('Description') as string },
      { name: 'Type', value: getTag('Type') as string },
      //{ name: 'Published', value: getTag('Published') as string },
      { name: 'Asset-Id', value: getTag('Asset-Id') as string },
      { name: 'Init-State', value: getTag('Init-State') as string },
      // need to add topics
      ...getTopics
    ]

    const item = createData(JSON.stringify({
      manifest: 'arweave/paths',
      version: '0.1.0',
      index: { path: 'index.html' },
      paths: { 'index.html': { id } }
    }), signer, { tags: warpTags })

    await item.sign(signer)

    await env.warp.createContract.deployBundled(item.getRaw())
      .catch(e => console.log(e))
    return { contract: item.id, id: getTag('Asset-Id') }
  }

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
