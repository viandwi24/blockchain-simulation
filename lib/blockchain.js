const dayjs = require('dayjs')
const Log = require('./log')
const Block = require('./block')
const Transaction = require('./transaction')
const { KeyGenerator } = require('./signature')

class Blockchain {
  /**
   * Create a Blockchain
   */
  constructor() {
    Log.add('[Blockchain] Init')

    //
    this.blockProofOfWorkDifficulty = 2
    this.blockMineReward = 1

    //
    this.chain = []
    this.pendingTransactions = []

    // system
    Log.add('[Blockchain] Generating key for system')
    this.system = new KeyGenerator().generate()
    Log.add('[Blockchain] Generate complete', this.system)
    // console.log(Log)

    // create a genesis block
    Log.add('[Blockchain] Generate genesis block')
    this.chain.push(new Block([], dayjs().toDate(), '0'))
  }

  /**
   * Get the last block of the blockchain
   * @returns {Block}
   */
  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  /**
   * Add a new block to the blockchain
   *
   * @param  {Block} block
   * @return {void}
   */
  addBlock(block) {
    block.previousHash = this.getLastBlock().hash
    block.hash = block.calculateHash()
    this.chain.push(block)
  }

  /**
   * Add a new transaction to the blockchain
   * @param  {Transaction} transaction
   * @return {void}
   */
  addTransaction(transaction) {
    Log.add(`[Blockchain] Adding new transaction`, transaction)
    this.pendingTransactions.push(transaction)
  }

  /**
   * Mine the blockchain
   * @param  {string} mineAddress
   * @returns {Promise}
   */
  mine(mineAddress) {
    Log.add(`[Blockchain] Starting mining with miner ${mineAddress}`)
    return new Promise((resolve, reject) => {
      this.addTransaction(
        new Transaction(
          this.system.publicKey,
          mineAddress,
          this.blockMineReward
        ).sign(this.system.privateKey)
      )
      const block = new Block(this.pendingTransactions, dayjs().toDate())
      block.previousHash = this.getLastBlock().hash

      block.mine(this.blockProofOfWorkDifficulty).then(() => {
        this.chain.push(block)
        this.pendingTransactions = []
        Log.add(`[Blockchain] Mining complete`)
        resolve(this)
      })
    })
  }

  /**
   * Check if the blockchain is valid
   * @returns {boolean}
   */
  isValid() {
    // check every has in block
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.previousHash !== previousBlock.hash) return false
      if (currentBlock.hash !== currentBlock.calculateHash()) return false

      // check every transaction in block
      for (let i = 1; i < this.chain.length; i++) {
        const transactions = this.chain[i].data
        for (let j = 0; j < transactions.length; j++) {
          if (!transactions[j].isValid()) return false
        }
      }
    }

    //
    return true
  }

  /**
   * Get balance of a given address
   * @param  {string} address
   */
  getBalance(address) {
    let balance = 0
    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i]
      for (let j = 0; j < block.data.length; j++) {
        const transaction = block.data[j]
        if (transaction.fromAddress === address) {
          balance -= transaction.amount
        }
        if (transaction.toAddress === address) {
          balance += transaction.amount
        }
      }
    }
    return balance
  }

  /**
   * Print the blockchain
   */
  print() {
    // console.log(JSON.stringify(this.chain, null, 4))
  }
}

module.exports = Blockchain
