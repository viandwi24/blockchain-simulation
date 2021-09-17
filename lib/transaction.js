const SHA256 = require('crypto-js/sha256');
const dayjs = require('dayjs');
const { SignatureGenerator } = require('./signature')

class Transaction {
    constructor(fromAddress, toAddress, amount, date = dayjs()) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = parseInt(amount);
        this.timestamp = dayjs(date).unix()
    }

    calculateHash() {
        const pattern = this.fromAddress + this.toAddress + this.amount
        return SHA256(pattern).toString()
    }

    sign(signingKey) {
        const signatureGenerator = (new SignatureGenerator(signingKey)).fromPrivate(signingKey)
        if (signatureGenerator.getAddress() !== this.fromAddress) {
            throw new Error('Invalid signing key')
        }
        this.signature = signatureGenerator.generate(this.calculateHash())
        return this
    }

    isValid() {
        // check address
        if (!this.fromAddress || !this.toAddress) return false

        // Check signature
        if (!this.signature) return false
        const signatureGenerator = (new SignatureGenerator).fromPublic(this.fromAddress)
        if (!signatureGenerator.verify(this.calculateHash(), this.signature)) {
            console.log({
                hash: this.calculateHash(),
                signature: this.signature,
            })
            return false
        }
        return true
    }
}

module.exports = Transaction
