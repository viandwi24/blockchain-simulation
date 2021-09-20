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
    }
  }
}
