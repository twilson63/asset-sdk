// @ts-nocheck
import crocks from 'crocks'
import { lensProp, over, propEq, compose, find, filter, pluck, assoc, join, head } from 'ramda'
import createWebPageAsset from './web-page/index.js'
import createAppAsset from './app/index.js'

const { ReaderT, Async } = crocks
const { of, ask, lift } = ReaderT(Async)

const doPost = (svc, asset) => Async.of(asset)
  // generate AssetId or use the one provided
  .map(over(lensProp('id'), (id) => id || crypto.randomUUID()))
  .map(asset => {
    if (propEq('type', 'web-page', asset)) {
      return createWebPageAsset(asset)
    } else if (propEq('type', 'app', asset)) {
      return createAppAsset(asset)
    }
  })
  .chain(asset =>
    Async.fromPromise(svc.publish)(asset)
      .map(result => ({ ok: true, id: asset.id, contract: result.id }))
  )


const flow = asset => ask(svc => doPost(svc, asset)).chain(lift)

export const CreateAsset = (asset) => flow(asset)
export const GetAsset = (id, type) => ask(svc => Async.of({ id, type })
  .map(({ id, type }) => buildQuery(id, type))
  .chain(Async.fromPromise(svc.gql))
  .chain(edges => {
    console.log(edges)
    const source = compose(
      find(n => find(t => t.name === 'Type', n.tags).value === 'source'),
      pluck('node')
    )(edges)

    const asset = compose(
      head,
      filter(n => find(t => t.name === 'Type', n.tags).value === type && find(t => t.name === 'Uploader', n.tags) === undefined),
      pluck('node')
    )(edges)

    return Async.all([
      Async.Resolved({ data: 'No Source Data...' }), // Async.fromPromise(svc.getData)(source.id)
      Async.fromPromise(svc.getData)(asset.id)
    ])
      .map(
        ([s, a]) => ({
          ...toAssetItem(asset),
          content: s.data,
          html: a.data
        })
      )
    // .chain(asset =>
    //   Async.fromPromise(svc.query)(asset.transaction, ['prop', 'balances'])
    //     .map(assoc('balances', __, asset))

    // )
  })
).chain(lift)

function buildQuery(id, type) {
  return {
    query: `query ($ids: [String!]!, $cursor: String, $type: String!) {
      transactions(first: 3, after: $cursor, 
        tags: [
          { name: "Type", values: [$type] },
          { name: "Asset-Id", values: $ids }
        ]) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            tags {
              name
              value
            }
          }
        }
      }
    }`,
    variables: {
      ids: [id],
      type
    }
  }
}

function toAssetItem(node) {
  const getTag = compose(prop('value'), n => find(propEq('name', n), node.tags))
  const published = getTag('Published') ? Number(getTag('Published')) : Date.now()
  const topics = join(', ', pluck('value', filter(t => /^Topic:/.test(t.name), node.tags)))
  return {
    id: getTag('Asset-Id'),
    type: getTag('Type'),
    title: getTag('Title'),
    description: getTag('Description'),
    transaction: node.id,
    published,
    stamps: 0,
    topics
  }
}