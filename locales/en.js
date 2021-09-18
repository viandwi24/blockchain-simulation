export default {
  nav: {
    new: 'New',
    edit: 'Edit',
    save: 'Save',
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
      dialog: {
        title: 'Before Mining',
        text: 'I suggest you to open the javascript console / dev panel in your browser, to see a simulation of what happens when mining.',
        next: 'No',
        prev: 'Okay, Lets go'
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
    steps: [
      {
        title: 'Hello, welcome !',
        text: 'Welcome to blockchain simulation!!! <br> I will guide you how this blockchain works.',
        prev: 'No',
        next: `Yes, let's tour`,
      }
    ]
  }
}
