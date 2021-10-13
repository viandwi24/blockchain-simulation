export default {
  nav: {
    new: 'New',
    edit: 'Edit',
    save: 'Save',
  },
  other: {
    to: 'To',
    from: 'From',
    amount: 'Amount',
  },
  menu: {
    blocks: 'Blocks',
    wallets: 'Wallets',
    pending: 'Pending',
    newTransaction: 'New Transaction',
    setting: 'Settings',
  },
  components: {
    blocks: {
      title: 'Blocks',
      description: '* For creating block, you must make transaction first.',
      block: {
        title: 'Block',
        genesisBlock: 'Genesis Block',
        hash: 'Hash',
        previousBlockHash: 'Previous Block Hash',
        timestamp: 'Timestamp',
        datetime: 'Datetime',
        nonce: 'Nonce',
        transactionCount: 'Transaction Count',
      }
    },
    wallets: {
      title: 'Wallets',
    },
    pending: {
      title: 'Pending',
      description: '* Start mining to include all pending transactions in the next block.',
      loading: 'Loading...',
      noTransactions: 'No transactions',
      miningInProgress: 'Mining in progress...',
      noteInProgress: 'You can open Console / Dev Panel in your browser to see what happening...',
      startMining: 'Start Mining',
      visualizer: {
        title: 'Mining Visualizer',
        newBlockCandidate: 'New Block Candidate',
        hashRules: 'Hash Rules',
        generatedHash: 'Generated Hash',
        timeElapsed: 'Time Elapsed',
        powDifficulty: 'PoW Difficulty',
      },
      dialog: {
        title: 'Before Mining',
        text: 'I suggest you to open the javascript console / dev panel in your browser, to see a simulation of what happens when mining.',
        next: 'Okay, Lets go',
        prev: 'No',
      }
    },
    newTransaction: {
      title: 'New Transaction',
      description: '* Add new transactions, this transaction will be added to the pending transaction',
      createTransaction: 'Create Transaction',
    },
    setting: {
      title: 'Setting',
      difficulty: 'Difficulty Proof of work',
      difficultyDescription: '* Difficulty Proof of work controls how long the mining process takes.',
      miningReward: 'Mining reward',
      miningRewardDescription: '* How much "coins" a miner receives for successfully creating a new block for the chain.',
    }
  },
  tour: {
    button: {
      next: 'Next',
      prev: 'Previous',
      finish: 'Finish',
    },
    steps: {
      group1: [
        {
          title: 'Hello, welcome !',
          text: 'Welcome to blockchain simulation!!! <br> I will guide you how this blockchain works.',
          prev: 'No',
          next: `Yes, let's tour`,
        },
        {
          title: 'Blokchain',
          text: 'This is a chained collection of blocks, this block is a representation of a record.'
        },
        {
          title: 'Blokchain',
          text: 'In short, Blockchain is a technology that includes technical concepts for a digital data storage system. Blockchain can be likened to a database too, which contains a collection of blocks, these blocks represent a single record. In one block can contain a lot of data also in it. Blockchain is now very popular thanks to its use in cryptocurrency systems.This is a chained collection of blocks, this block is a representation of a record.'
        },
        {
          title: 'Chained Block',
          text: `
            Each block has an identity (hash) that represents the data in it,
            and each block will store the identity (has) of the previous block, that's why it is called Blockchain because the blocks will be chained.
          `
        },
        {
          title: 'Genesis Block',
          text: `
            Genesis Block is the first block or so-called block number 0.
            This block does not contain transaction data, only as the first block.
            In the real world to be precise Bitcoin, the first Block was mined directly by its creator, Satoshi Nakamoto.
            And he pinned the message "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
          `
        },
        {
          title: 'Hash Block (1)',
          text: 'This is a hash of block 2'
        },
        {
          title: 'Hash Block (2)',
          text: 'This block also records the hash of the previous block'
        },
        {
          title: 'Hash Block (3)',
          text: 'The result of hash in block 1 will also be included in the data record from block 2'
        }
      ],
      group2: [
        {
          title: 'Wallet',
          text: `The digital wallet will store a key for our account, simply there will be a public key and a private key.
          So lets create a example wallet.`
        },
        {
          title: 'Create wallet',
          text: `For create a new wallet click this button`
        },
        {
          title: 'Fill name',
          text: `Give a name for the wallet`
        },
        {
          title: 'Detail Wallet',
          text: `You cant click the wallet for see the detail, you can see the public key and private key. in the real world, only the public key can be shared, you must keep the private key as well as possible)`
        },
      ],
      group3: [
        {
          title: 'Transaction',
          text: `Transactions will record your transaction data, and later some transactions will be entered into the block. For that, let's make a transaction first.`
        },
        {
          title: 'Select Destination Address',
          text: `You have to write down the destination address of someone's wallet`
        },
      ],
      group4: [
        {
          title: 'Pending Transaction',
          text: `
            Transactions that occur will not go directly to the block, will enter the pending queue.
            To be able to verify transactions and provide a hash for the next block it takes extra work, this is called mining.
            So lets Start Mining.
          `
        },
        {
          title: 'Proof of Work',
          text: `
            This is called Proof of Work, to ensure that existing transactions must be valid, sent by a valid person and valid funds as well.
            So miners are needed to do mining with their computing resources. Miners have to scramble the hashes to get the hash that suits their needs
            Because the hash is unpredictable, the hash will continue to be scrambled until it is completely solved.
          `
        },
        {
          title: 'New Block',
          text: `
            Now, the new Block has been added successfully.
          `
        },
        {
          title: 'New Hash',
          text: `
            This is the hash generated from the previous proof of work.
            This hash contains the data contained in the transaction, plus a timestamp, and added a nonce then the data will be hashed.
            Therefore if the data is changed, then the hash will not match and is considered invalid.
          `
        },
        {
          title: 'Previous Hash',
          text: `
            Don't forget to add the hash of the previous block.
          `,
        },
        {
          title: 'Nonce',
          text: `
            Nonce is a number that is added to the hash to ensure that the hash is unique.
            A nonce is a random number added when mining, useful for finding a matching hash.
            Because when the hash method is running, to get a more different hash, we add random numbers in it every time we try.
            In this simulation, Nonce is not random, but Nonce starts from 0 and will increment until the hash is found.
          `,
        },
        {
          title: 'Detail Block',
          text: `
            Body of block, can contain more than one transaction. In this case there are two transactions.
          `,
        },
        {
          title: 'Signature',
          text: `
            We also added a signature, the signature is the hash sentence generated from the contents of the transaction with the sender's private key.
            That way we can ensure that this transaction is valid from the sender.
          `,
        },
        {
          title: 'Mining Reward',
          text: `
            in the second transaction here is mining rewards. as a reward for the miners who have been mining we will give them a coin prize.
            so in this simulation we also add system transactions to this block.
          `,
        },
        {
          title: 'Finished!',
          text: `
            Thank you for following the tour guide this time! Have fun and have a nice day!
          `,
        },
      ]
    }
  }
}
