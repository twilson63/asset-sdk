// @ts-nocheck
import { map } from 'ramda'
/**
 * handle creating a web-page asset
 */

export default function (asset) {
  const topicTags = map(v => ({ name: `Topic:${v}`, value: v }), post.topics)
  return {
    asset: {
      data: asset.html,
      tags: [
        { name: 'Content-Type', value: 'text/html' },
        { name: 'App-Name', value: 'SmartWeaveContract' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: 'web-page' },
        { name: 'Published', value: Date.now() },
        { name: 'Asset-Id', value: asset.id },
        { name: 'App-Version', value: '0.3.0' },
        { name: 'Contract-Src', value: asset.contractSRC },
        { name: 'Page-Code', value: asset.id },
        {
          name: 'Init-State', value: JSON.stringify({
            balances: asset.balances,
            pairs: [],
            name: "Page-" + asset.id,
            ticker: "WEB-PAGE",
            settings: [['isTradeable', true]]
          })
        },
        ...topicTags
      ]
    },
    source: {
      data: post.content,
      tags: [
        { name: 'Content-Type', value: 'text/markdown' },
        { name: 'App-Name', value: 'Permapages' },
        { name: 'Title', value: asset.title },
        { name: 'Description', value: asset.description },
        { name: 'Type', value: 'page-source' },
        { name: 'Asset-Id', value: asset.id },
        { name: 'Page-Code', value: asset.id },
        ...topicTags
      ]
    }
  }
}