const dayjs = require('dayjs')
const Block = require('./block')
const Transaction = require('./transaction')
const { KeyGenerator } = require('./signature')

class Blockchain {
    /**
     * Create a Blockchain
     */
    constructor() {
        this.chain = []
        this.pendingTransactions = []

        // system
        this.system = (new KeyGenerator).generate()

        // create a genesis block
        this.chain.push(new Block([], dayjs().toDate(), "0"))
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
        this.pendingTransactions.push(transaction)
    }

    /**
     * Mine the blockchain
     * @return {void}
     */
    mine(mineAddress) {
        this.addTransaction((new Transaction(this.system.publicKey, mineAddress, 1)).sign(this.system.privateKey))
        const block = new Block(this.pendingTransactions, dayjs().toDate())
        block.previousHash = this.getLastBlock().hash
        block.mine()
        this.chain.push(block)
        this.pendingTransactions = []
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
