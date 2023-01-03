import Arweave from 'arweave'
import fs from 'fs'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })

arweave.wallets.generate().then(jwk => {
  fs.writeFileSync('./wallet.json',
    JSON.stringify(
      jwk
    )
  )
})

