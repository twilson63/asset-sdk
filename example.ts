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

// create a video asset

