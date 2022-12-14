import * as asset from './src'

// create a web-page asset
const result = await asset.create({
  content: "My Markdown",
  html: "My HTML",
  type: "web-page",
  title: "Beep Boop",
  description: "A Description",
  topics: ['one', 'two'],
  balances: {
    '1': 10000
  },
  fork: 'XXXX'
})


// create a blog-post asset

// create a image asset
const result = await asset.create({
  type: 'image',
  title: 'Avatar',
  description: 'A description of an avatar',
  topics: [],
  balances: {
    'MY_WALLET': 1000000
  },
  currency: 'matic'
})

// create a video asset

