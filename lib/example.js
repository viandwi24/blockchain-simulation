// const readline = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const { KeyGenerator } = require('./signature')

// Create a new blockchain
const mycoin = new Blockchain()

// Configure the blockchain
mycoin.blockProofOfWorkDifficulty = 6

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
// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
function main() {
  const minerAddress = 'miner-address'
  mycoin.mine(minerAddress).then(() => {
    // mine was successful
    console.log({
      myBalance: mycoin.getBalance(mywallet.publicKey),
      myFriendBalance: mycoin.getBalance(destinationAddress),
      minerBalance: mycoin.getBalance(minerAddress),
    })
    // get last block
    const lastBlock = mycoin.getLastBlock()
    console.log(lastBlock)
  })
}
main()
