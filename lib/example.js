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
const sustemTransaction = (new Transaction(mycoin.system.publicKey, mywallet.publicKey, 1000)).sign(mycoin.system.privateKey)
mycoin.addTransaction(sustemTransaction)
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
})
