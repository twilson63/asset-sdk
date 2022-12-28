import { map } from 'ramda'
import { AtomicAssetType } from '../types'

export default function (asset: AtomicAssetType) {
  const topicTags = map(v => ({ name: `Topic:${v}`, value: v }), asset.topics)
  return {
    target: {
      data: asset.html,
      tags: [
        { name: 'Content-Type', value: 'text/html' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: 'app' },
        { name: 'Published', value: String(Date.now()) },
        { name: 'Page-Code', value: asset.id },
        { name: 'App-Id', value: asset.appId },
        {
          name: 'Init-State', value: JSON.stringify({
            balances: asset.balances,
            pairs: [],
            name: "App-" + asset.id,
            ticker: "APP",
            settings: [['isTradeable', true]]
          })
        },
        ...topicTags
      ]
    },
    source: {
      data: asset.content,
      tags: [
        { name: 'Content-Type', value: 'text/markdown' },
        { name: 'App-Name', value: 'AssetSDK' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: 'source' }
      ]
    }
  }
}