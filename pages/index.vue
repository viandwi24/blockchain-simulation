<template>
  <div>
    <Menu :tabs="tabs" :active-tab="activeTab" @onTabClick="onTabClick" />
    <component :is="componentTab" :blockchain.sync="blockchain" :wallets.sync="wallets" @changeTab="onTabClick" />
  </div>
</template>

<script>
import { computed, defineAsyncComponent, defineComponent, onMounted, reactive, ref, useContext } from '@nuxtjs/composition-api'
import Shepherd from 'shepherd.js'
import Blockchain from '@/lib/blockchain'
import Transaction from '@/lib/transaction'
import Block from '@/lib/block'
import { KeyGenerator } from '@/lib/signature'

export default defineComponent({
  setup() {
    // Setup blockchain
    const blockchain = reactive(new Blockchain())
    const wallets = reactive([])

    // ui
    const tabs = computed(() => [
      { label: `Blocks (${blockchain.chain.length})` },
      { label: `Wallets (${wallets.length})` },
      { label: `Pending (${blockchain.pendingTransactions.length})` },
      { label: `New Transaction` },
      { label: `Setting` },
    ])
    const activeTab = ref(0)
    const onTabClick = (i) => {
      activeTab.value = i
    }
    const componentTab = computed(() => {
      let component = null
      switch (activeTab.value) {
        case 1:
          component = defineAsyncComponent(() => import('@/components/Wallets.vue'))
          break;
        case 2:
          component = defineAsyncComponent(() => import('@/components/Pending.vue'))
          break;
        case 3:
          component = defineAsyncComponent(() => import('@/components/Transaction.vue'))
          break;
        case 4:
          component = defineAsyncComponent(() => import('@/components/Setting.vue'))
          break;
        default:
          component = defineAsyncComponent(() => import('@/components/Blocks.vue'))
          break;
      }
      return component
    })

    // methods
    const createWallet = (name, amount = 0) => {
      const { publicKey, privateKey } = (new KeyGenerator).generate()
      wallets.push({
        name,
        publicKey,
        privateKey
      })
      if (amount > 0) {
        const tx = new Transaction(blockchain.system.publicKey, publicKey, amount).sign(blockchain.system.privateKey)
        const block = new Block([tx])
        block.previousHash = blockchain.getLastBlock().hash
        block.mine(2)
        blockchain.chain.push(block)
      }
    }

    //
    const { startTour } = useTour({ onTabClick })

    // events
    onMounted(() => {
      createWallet('My Wallet', 1000000)
      setTimeout(startTour, 1000)
    })

    return {
      blockchain,
      wallets,

      componentTab,
      onTabClick,
      tabs,
      activeTab,
    }
  }
})

function useTour({ onTabClick }) {
  //
  const { $sleep } = useContext()

  //
  const defaultButtons = [
    {
      action() {
        return this.back();
      },
      classes: 'shepherd-button-secondary',
      text: 'Back'
    },
    {
      action() {
        return this.next();
      },
      text: 'Next'
    }
  ]
  const withDefaultButton = (next) => {
    const btn = [ defaultButtons[0] ]
    btn.push(next)
    return btn
  }

  const startTour = () => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'shepherd-theme-square',
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    })

    // group step 1 : block
    addGroupStep1({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep2({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep3({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep4({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    tour.start();
  }

  return {
    startTour
  }
}

function addGroupStep1({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: 'Hello, welcome !',
    text: `
      Welcome to blockchain simulation, i will guide you how this blockchain works.
    `,
    buttons: [
    {
      text: 'No',
      classes: 'shepherd-button-secondary',
      action() {
        return this.hide();
      },
    },
    {
      action() {
        return this.next();
      },
      text: "Yes, let's tour"
    }
  ]
  });
  tour.addStep({
    title: 'Blocks',
    text: `
      This is a chained collection of blocks, this block is a representation of a record.
    `,
    attachTo: {
      element: '.panel-blocks',
      on: 'bottom'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: 'Block',
    text: `
      Each block has an identity (hash) that represents the data in it,
      and each block will store the identity (has) of the previous block, that's why it is called Blockchain because the blocks will be chained.
    `,
    attachTo: {
      element: '.block-chain:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: 'Hash Block (1)',
    text: `
      This is a hash of block 2
    `,
    attachTo: {
      element: '.block-chain:nth-child(2) div:nth-child(2) div:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: 'Hash Block (2)',
    text: `
      This block also records the results of the previous block
    `,
    attachTo: {
      element: '.block-chain:nth-child(2) > div:nth-child(2) > div:nth-child(2)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
      title: 'Hash Block (3)',
      text: `
        The result of block 1 will also be included in the data record from block 2
      `,
      attachTo: {
        element: '.block-chain:nth-child(1) > div:nth-child(2) > div:nth-child(1)',
        on: 'right'
      },
      buttons: withDefaultButton({
        text: 'Next',
        async action () {
          onTabClick(1)
          await $sleep(500)
          return this.next()
        }
      })
    });
}

function addGroupStep2({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: 'Wallet',
    text: `
      The digital wallet will store a key for our account, simply there will be a public key and a private key.
      So lets create a example wallet.
    `,
    attachTo: {
      element: '.panel-wallet',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(0)
          await $sleep(500)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        text: 'Next',
        async action () {
          onTabClick(1)
          await $sleep(500)
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: 'Create wallet',
    text: `
      For create a new wallet click this button
    `,
    attachTo: {
      element: '.panel-wallet > div:nth-child(1) > div:nth-child(2)',
      on: 'left'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        const btn = document.querySelector('.panel-wallet > div:nth-child(1) > div:nth-child(2) > button')
        btn.click()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Fill name',
    text: `
      Give a name for the wallet
    `,
    attachTo: {
      element: '.panel-wallet-action > div:nth-child(2) > form > div:nth-child(1)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        const input = document.querySelector('.panel-wallet-action > div:nth-child(2) > form > div:nth-child(1) > div:nth-child(2) > input')
        input.setAttribute('value', 'John Doe')
        const event = new Event('input')
        input.dispatchEvent(event)
        await $sleep(500)
        const btn = document.querySelector('.panel-wallet-action > div:nth-child(2) > form > div:nth-child(3) > div:nth-child(2) > button')
        btn.click()
        await $sleep(1000)
        const wallet = document.querySelector('.panel-wallet > div:nth-child(2) > span > div:nth-child(2)')
        wallet.click()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Detail Wallet',
    text: `
      You cant click the wallet for see the detail, you can see the public key and private key. in the real world, only the public key can be shared, you must keep the private key as well as possible)
    `,
    attachTo: {
      element: '.panel-wallet > div:nth-child(2) > span > div:nth-child(2)',
      on: 'left'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        onTabClick(3)
        await $sleep(500)
        return this.next()
      }
    })
  });
}

function addGroupStep3({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: 'Transaction',
    text: `
      Transactions will record your transaction data, and later some transactions will be entered into the block. For that, let's make a transaction first.
    `,
    attachTo: {
      element: '.panel-transaction',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(1)
          await $sleep(500)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        text: 'Next',
        async action () {
          const select = document.querySelector('.panel-transaction > div > div:nth-child(3) > form > div:nth-child(2) > div:nth-child(2) > select')
          select.setAttribute('value', 0)
          select.querySelector('option:nth-child(1)').setAttribute('selected', 'selected')
          const event = new Event('input')
          select.dispatchEvent(event)
          if ("createEvent" in document) {
            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            select.dispatchEvent(evt);
          } else {
            select.fireEvent("onchange");
          }
          await $sleep(500)
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: 'Select Destination Address',
    text: `
      You have to write down the destination address of someone's wallet
    `,
    attachTo: {
      element: '.panel-transaction > div > div:nth-child(3) > form > div:nth-child(2) > div:nth-child(2)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        const btn = document.querySelector('.panel-transaction > div > div:nth-child(3) > form > div:nth-child(4) > div:nth-child(2) > button')
        btn.click()
        await $sleep(500)
        return this.next()
      }
    })
  });
}

function addGroupStep4({ $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: 'Pending Transaction',
    text: `
      Transactions that occur will not go directly to the block, will enter the pending queue.
      To be able to verify transactions and provide a hash for the next block it takes extra work, this is called mining.
      So lets Start Mining.
    `,
    attachTo: {
      element: '.panel-pending-transaction',
      on: 'top'
    },
    buttons: [
      {
        async action() {
          onTabClick(3)
          await $sleep(200)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        text: 'Next',
        async action () {
          const btn = document.querySelector('.panel-pending-transaction > div:nth-child(1) > div:nth-child(3) > button')
          btn.click()
          console.log('Tour listening navigating to panel blocks')
          while(true) {
            if (document.querySelector('.panel-blocks')) {
              break
            }
            await $sleep(100)
          }
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: 'New Block',
    text: `
      Now, the new Block has been added successfully. You can click the block to see the details of what transactions are in it.
    `,
    attachTo: {
      element: '.block-chain:nth-child(3)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Finish',
      action () {
        return this.hide()
      }
    })

  });
}
</script>
