# Blockchain Simulation
This is just a Web to simulate how Blockchain works in a short and simple way. Built on javascript (nodejs) and using Vuejs as Front End. (Just for education only.)

![Preview](https://github.com/viandwi24/blockchain-simulation/blob/main/static/preview.gif?raw=true)

## Demo
To see directly, you can see via the following lin : [Live Demo](https://viandwi24.github.io/blockchain-simulation/)


## Usage
You can see the base lib in /path/to/blockchain-simulation/lib
```js
const Blockchain = require('./lib/blockchain.js')
const Transaction = require('./lib/transaction.js')
const { KeyGenerator } = require('./lib/signature')

// create instance
const mycoin = new Blockchain

// make wallet
// const { publicKey, privateKey } = (new KeyGenerator).generate()
const my = (new KeyGenerator).generate() // { publicKey, privateKey }

// make transaction
const destinationAddress = 'my-friend-address'
const newTransaction = (new Transaction(my.publicKey, destinationAddress, 1))

// signing a transaction
newTransaction.sign(my.privateKey)

// send transaction
mycoin.addTransaction(newTransaction)

// mining
await mycoin.mine('mine-address')

// get block
console.log(mycoin.getLastBlock()) // Block { data: {} }

// check valid chain
console.log(mycoin.isValid()) // true
```

## Contributors
<a href="https://github.com/viandwi24/blockchain-simulation/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=viandwi24/forum"/>
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
