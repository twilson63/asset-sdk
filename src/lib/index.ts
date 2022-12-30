import { compose, find, pluck, propEq, prop, join, filter, assoc, map } from 'ramda'
import { AtomicAssetType } from '../types'

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
    if (!asset.groupId) {
      asset.groupId = svc.randomUUID()
    }

    return svc.publish(createAssetData(asset))
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
      .then(asset =>
        svc.stampCache(['compose',
          ['length'],
          ['filter', ['propEq', 'asset', asset.id]],
          ['values'],
          ['prop', 'stamps']
        ]).then((stamps: { result: number }) => {
          return assoc('stamps', stamps.result, asset)
        })
      )
    // get stamp count via cache
    // svc.stampCache([FPJSON])


  }

  function stampAsset(id: string) {
    return svc.stamp(id)
  }

  function getItemsByGroupId(groupId: string, type: string) {
    // get assetItems not data
    const query = `query ($groupIds: [String!]!, $cursor: String, $types: [String!]!) {
      transactions(first: 100, after: $cursor, tags: [
        { name: "Group-Id", values: $groupIds },
        { name: "Type", values: $types}
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
    }`

    return svc.gql({
      query,
      variables: { groupIds: [groupId], types: [type] }
    }).then(map(compose(
      toAssetItem,
      prop('node')
    )))
  }

  return {
    getAsset,
    createAsset,
    stampAsset,
    getItemsByGroupId
  }
}

function toAssetItem(node: any) {
  //console.log('node: ', node)
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

function createAssetData(asset: AtomicAssetType) {
  const topicTags = map(v => ({ name: `Topic:${v}`, value: v }), asset.topics)
  return {
    target: {
      data: asset.html,
      tags: [
        { name: 'Content-Type', value: asset.contentType },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: asset.type },
        { name: 'Published', value: String(Date.now()) },
        { name: 'Page-Code', value: asset.groupId },
        { name: 'Group-Id', value: asset.groupId },
        {
          name: 'Init-State', value: JSON.stringify({
            balances: asset.balances,
            pairs: [],
            name: `${asset.type}-${asset.groupId}`,
            ticker: asset.type.toUpperCase(),
            settings: [['isTradeable', true]]
          })
        },
        ...topicTags
      ]
    },
    meta: {
      data: asset.content,
      tags: [
        { name: 'Content-Type', value: 'text/markdown' },
        { name: 'App-Name', value: 'AssetSDK' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: `${asset.type}-meta` }
      ]
    }
  }
}