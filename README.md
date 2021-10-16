# Blockchain Simulation
This is just a Web to simulate how Blockchain works in a short and simple way. Built on javascript (nodejs) and using Vuejs as Front End. (Just for education only)

![Preview](https://github.com/viandwi24/blockchain-simulation/blob/main/static/preview.gif?raw=true)

## Demo
To see directly, you can see via the following link : [Live Demo](https://viandwi24.github.io/blockchain-simulation/)
Loader Animation create in After Effect, if you wanna see :
* [Loader render in mp4](https://viandwi24.github.io/blockchain-simulation/loader.mp4)
* [Loader converted in lottie files (json)](https://github.com/viandwi24/blockchain-simulation/blob/main/static/blockchain.json)


## Usage
You can see the base lib in `/blockchain-simulation/lib`
```js
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const { KeyGenerator } = require('./signature')

// Create a new blockchain
const mycoin = new Blockchain()

// Configure the blockchain
mycoin.blockProofOfWorkDifficulty = 4

// create a new wallet
const mywallet = (new KeyGenerator()).generate() // { publicKey: '...', privateKey: '...' }

// make default balance of wallet
const systemTransaction = (new Transaction(mycoin.system.publicKey, mywallet.publicKey, 1000)).sign(mycoin.system.privateKey)
mycoin.addTransaction(systemTransaction)
// mycoin.mine(mycoin.system.privateKey)

// create a new transaction
const destinationAddress = 'my-friend-address'
const mytransaction = new Transaction(mywallet.publicKey, destinationAddress, 10)

// sign the transaction with my wallet private key
mytransaction.sign(mywallet.privateKey)

// add the transaction to the blockchain
mycoin.addTransaction(mytransaction)

//
const mineAddress = 'miner-address'
mycoin.mine(mineAddress).then(() => {
  // mine was successful
  console.log({
    myballance: mycoin.getBalance(mywallet.publicKey),
    myfrinedballance: mycoin.getBalance(destinationAddress),
    minerballance: mycoin.getBalance(mineAddress),
  })
  // get last block
  const lastBlock = mycoin.getLastBlock()
  console.log(lastBlock)
  // check valid chain
  console.log(mycoin.isValid()) // true
})
```
This script you can see in `/blockchain-simulation/lib/example.js`

## Contributors
<a href="https://github.com/viandwi24/blockchain-simulation/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=viandwi24/blockchain-simulation"/>
</a>

## You Can Contribute!!!
I will gladly accept your contribution for the better.
You can follow the contributing guide listed [here](./CONTRIBUTING.md)

## Donate
You can support the development of this project at :
- [Saweria](https://saweria.co/viandwi24)
- [Trakteer](https://trakteer.id/viandwi24)
- [Ko-fi](https://ko-fi.com/viandwi24)

## License
Blockchain Simulation is open-sourced software licensed under the [MIT license](./LICENSE.md).

---

-   Created by [Alfian Dwi Nugraha](https://www.facebook.com/viandwi24)
