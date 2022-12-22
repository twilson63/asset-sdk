// @ts-nocheck
import { map } from 'ramda'

/**
 * handle creating a web-page asset
 */

export default function (asset) {
  const topicTags = map(v => ({ name: `Topic:${v}`, value: v }), asset.topics)
  return {
    id: asset.id,
    asset: {
      data: asset.html,
      tags: [
        { name: 'Content-Type', value: 'text/html' },
        { name: 'App-Name', value: 'SmartWeaveContract' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: 'app' },
        { name: 'Published', value: String(Date.now()) },
        { name: 'Asset-Id', value: asset.id },
        { name: 'App-Version', value: '0.3.0' },
        { name: 'Contract-Src', value: asset.contractSRC },
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
        { name: 'Type', value: 'source' },
        { name: 'Asset-Id', value: asset.id }
      ]
    }
  }
}