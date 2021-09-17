const SHA256 = require('crypto-js/sha256')
const dayjs = require('dayjs')
const Log = require('./log')

class Block {
  constructor(data, date, previousHash = '') {
    this.data = data
    this.timestamp = dayjs(date).unix()
    this.hash = undefined
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  /**
   * Calculate the hash of the block
   * @returns  {string}
   */
  calculateHash() {
    const payload = JSON.stringify(this.data)
    const pattern = this.previousHash + this.timestamp + this.nonce + payload
    return SHA256(pattern).toString()
  }

  /**
   * Mined the block
   * @param  {number} difficulty=1
   */
  mine(difficulty = 2) {
    return new Promise((resolve, reject) => {
      const start = Date.now()
      while (this.hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
        this.nonce++
        this.hash = this.calculateHash()
        console.log(`[Block] Mining Block - generate hash and found ${this.hash}`)
      }
      const end = Date.now()
      // eslint-disable-next-line no-unused-vars
      const time = (end - start) / 1000
      console.log(`[Block] Mining Block - Success in ${time}s with nonce ${this.nonce}`)
      Log.add(`[Block] Mining Block - Success in ${time}s with nonce ${this.nonce}`)
      resolve(this)
    })
  }
}

module.exports = Block
