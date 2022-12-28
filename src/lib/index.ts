import { compose, find, pluck, propEq, prop, join, filter } from 'ramda'
import { AtomicAssetType } from '../types'
import createAppAssetData from './app'

// @ts-ignore
const findSource = find(compose(
  propEq('value', 'source'),
  find(propEq('name', 'Type')),
  prop('tags')))

// @ts-ignore
const findContent = type => find(compose(
  propEq('value', type),
  find(propEq('name', 'Type')),
  prop('tags')))

export default function (svc: any) {
  function createAsset(asset: AtomicAssetType) {
    if (!asset.id) {
      asset.id = svc.randomUUID()
    }

    return svc.publish(createAppAssetData(asset))
  }

  function getAsset(id: string, type: string) {
    return buildQuery(id, type)
      .then(svc.gql)
      .then(
        pluckData(type)
      )
      .then(
        asset => Promise.all([
          asset.source ? svc.getData(asset.asset.meta) : Promise.resolve('No Source Found.'),
          asset.asset ? svc.getData(asset.asset.id) : Promise.resolve('No Content Found')
        ]).then(([content, html]) => ({
          ...toAssetItem(asset.asset),
          content,
          html
        }))
      )

  }
  return {
    getAsset,
    createAsset
  }
}

function toAssetItem(node: any) {
  const getTag = compose(prop('value'), n => find(propEq('name', n), node.tags))
  const published = getTag('Published') ? Number(getTag('Published')) : Date.now()
  // @ts-ignore
  const topics = join(', ', pluck('value', filter(t => /^Topic:/.test(t.name), node.tags)))
  return {
    id: node.id,
    type: getTag('Type'),
    title: getTag('Title'),
    description: getTag('Description'),
    meta: getTag('META'),
    published,
    stamps: 0,
    topics
  }
}

function pluckData(type: string) {
  return (data: any) => ({
    source: compose(findSource, pluck('node'))(data),
    asset: compose(findContent(type), pluck('node'))(data)
  })
}

function buildQuery(id: string, type: string) {
  return Promise.resolve({
    query: `query ($ids: [ID!], $cursor: String, $type: String!) {
      transactions(first: 3, after: $cursor, 
        ids: $ids,
        tags: [
          { name: "Type", values: [$type] }
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
  })
}