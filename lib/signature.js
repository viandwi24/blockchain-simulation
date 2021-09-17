const elliptic = require('elliptic')

class KeyGenerator {
    generate() {
        const EC = new (elliptic.ec)('secp256k1')
        const key = EC.genKeyPair()
        return {
            privateKey: key.getPrivate('hex'),
            publicKey: key.getPublic('hex'),
        }
    }
}

class SignatureGenerator {
    constructor() {
        this.key = undefined
    }

    fromPrivate(privateKey) {
        this.key = (new (elliptic.ec)('secp256k1')).keyFromPrivate(privateKey, 'hex')
        return this
    }

    fromPublic(publicKey) {
        this.key = (new (elliptic.ec)('secp256k1')).keyFromPublic(publicKey, 'hex')
        return this
    }

    getAddress() {
        return (this.key) ? this.key.getPublic('hex') : undefined
    }

    generate(hash) {
        const signature = this.key.sign(hash, 'base64')
        return signature.toDER('hex')
    }

    verify(hash, signature) {
        return this.key.verify(hash, signature)
    }
}

exports.KeyGenerator = KeyGenerator
exports.SignatureGenerator = SignatureGenerator
