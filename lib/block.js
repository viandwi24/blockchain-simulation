const SHA256 = require('crypto-js/sha256')
const dayjs = require('dayjs')

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
    mine(difficulty = 4) {
        const start = Date.now()
        while(this.hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
            this.nonce++
            this.hash = this.calculateHash()
            // Log.add('[+] Mining Block - generate hash and found : ' + this.hash)
        }
        const end = Date.now()
        // eslint-disable-next-line no-unused-vars
        const time = (end - start) / 1000
        // Log.add(`[+] Mining Block - Success in ${time}s with nonce ${this.nonce}`)
    }
}

module.exports = Block
