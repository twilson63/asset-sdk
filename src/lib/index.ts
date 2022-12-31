import { always, compose, find, pluck, propEq, prop, join, filter, assoc, map } from 'ramda'
import { AtomicAssetType } from '../types'

export default function (svc: any) {
  function createAsset(asset: AtomicAssetType) {
    if (!asset.groupId) {
      asset.groupId = svc.randomUUID()
    }

    return svc.publish(createAssetData(asset))
  }

  function getAsset(id: string) {
    return buildQuery(id)
      .then(svc.gql)
      .then(
        pluckData
      )
      .then(
        asset => Promise.all([
          svc.getData(asset.source).catch(always('No meta data...')),
          svc.getData(asset.asset.id).catch(always('No data...'))
        ]).then(([meta, data]) => ({
          ...toAssetItem(asset.asset),
          meta,
          data
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

  function getItemsByGroupId(groupId: string) {
    // get assetItems not data
    const query = `query ($groupIds: [String!]!, $cursor: String) {
      transactions(first: 100, after: $cursor, tags: [
        { name: "Group-Id", values: $groupIds }
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
      variables: { groupIds: [groupId] }
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
    groupId: getTag('Group-Id'),
    published,
    stamps: 0,
    topics
  }
}

function pluckData(data: any) {
  return ({
    source: data[0].node.tags.find(propEq('name', 'META')).value,
    asset: data[0].node
  })
}

function buildQuery(id: string) {
  return Promise.resolve({
    query: `query ($ids: [ID!], $cursor: String) {
      transactions(first: 1, after: $cursor, 
        ids: $ids) {
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
      ids: [id]
    }
  })
}

function createAssetData(asset: AtomicAssetType) {
  const topicTags = map(v => ({ name: `Topic:${v}`, value: v }), asset.topics)
  return {
    target: {
      data: asset.data,
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
      data: asset.meta,
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