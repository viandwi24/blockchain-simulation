<template>
  <div class="screen flex flex-col min-h-screen max-h-screen overflow-x-hidden shadow-xl">
    <Navbar />
    <div class="flex-1 flex flex-col max-h-full overflow-y-auto overflow-x-hidden bg-blue-500">
      <div class="flex-1 container p-4 mx-auto flex flex-col justify-center">
        <Menu :tabs.sync="tabs" :active-tab.sync="activeTab" @onTabClick="onTabClick" />
        <component :is="componentTab" :blockchain.sync="blockchain" :wallets.sync="wallets" @changeTab="onTabClick" />
      </div>
    </div>
    <Log />
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
    //
    const { $t } = useContext()

    // Setup blockchain
    const blockchain = reactive(new Blockchain())
    const wallets = reactive([])

    // ui
    const tabs = computed(() => {
      const blocks = blockchain.chain.length
      const walletsCount = wallets.length
      const pending = blockchain.pendingTransactions.length
      return [
        { label: `${$t('menu.blocks')} (${blocks})` },
        { label: `${$t('menu.wallets')} (${walletsCount})` },
        { label: `${$t('menu.pending')} (${pending})` },
        { label: `${$t('menu.newTransaction')}` },
        { label: `${$t('menu.setting')}` },
      ]
    })
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
    const { startSelectLanguage } = useSelectLanguage()
    const { startTour } = useTour({ onTabClick })

    // events
    onMounted(() => {
      createWallet('My Wallet', 1000000)
      // createWallet('John Doe', 0)
      // const from = wallets[0]
      // const to = wallets[1]
      // blockchain.addTransaction((new Transaction(from.publicKey, to.publicKey, 1)).sign(from.privateKey))
      // onTabClick(2)
      setTimeout(() => startSelectLanguage().then(() => setTimeout(startTour, 500)), 500)
      // console.log(startSelectLanguage, startTour)
    })

    return {
      blockchain,
      wallets,

      componentTab,
      onTabClick,
      tabs,
      activeTab,
    }
  },
  head() {
    return {
      title: 'Blockchain Simulation',
    }
  },
})

function useSelectLanguage() {
  const { i18n } = useContext()
  const startSelectLanguage = () => new Promise((resolve) => {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shepherd-theme-square',
      }
    })
    tour.addStep({
      title: 'Language',
      text: 'Select your language want to use!',
      buttons: [
        {
          text: 'English',
          action() {
            i18n.setLocale('en')
            this.hide()
            resolve()
          }
        },
        {
          text: 'Indonesian',
          action() {
            i18n.setLocale('id')
            this.hide()
            resolve()
          }
        }
      ]
    })
    tour.start()
  })

  return {
    startSelectLanguage
  }
}

function useTour({ onTabClick }) {
  //
  const { $sleep, $t } = useContext()

  //
  const defaultButtons = [
    {
      action() {
        return this.back();
      },
      classes: 'shepherd-button-secondary',
      text: $t('tour.button.prev')
    },
    {
      action() {
        return this.next();
      },
      text: $t('tour.button.next')
    }
  ]
  const withDefaultButton = (next) => {
    const btn = [ defaultButtons[0] ]
    btn.push(next)
    return btn
  }

  const addSteps = (tour) => {
    addGroupStep1({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep2({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep3({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    addGroupStep4({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick })
    return tour
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

    // adding steps to the tour
    addSteps(tour)

    // start tour
    tour.start();
  }

  return {
    startTour
  }
}

function addGroupStep1({ $t, $sleep, tour, defaultButtons, withDefaultButton, onTabClick }) {
  tour.addStep({
    title: $t('tour.steps[0].title'),
    text: $t('tour.steps[0].text'),
    buttons: [
    {
      text: $t('tour.steps[0].prev'),
      classes: 'shepherd-button-secondary',
      action() {
        return this.hide();
      },
    },
    {
      action() {
        return this.next();
      },
      text: $t('tour.steps[0].next')
    }
  ]
  });
  tour.addStep({
    title: $t('tour.steps[1].title'),
    text: $t('tour.steps[1].text'),
    attachTo: {
      element: '.panel-blocks',
      on: 'bottom'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps[2].title'),
    text: $t('tour.steps[2].text'),
    attachTo: {
      element: '.panel-blocks > div:nth-child(3) > span',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps[3].title'),
    text: $t('tour.steps[3].text'),
    attachTo: {
      element: '.block-chain:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps[4].title'),
    text: $t('tour.steps[4].text'),
    attachTo: {
      element: '.block-chain:nth-child(2) div:nth-child(2) div:nth-child(1)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
    title: $t('tour.steps[5].title'),
    text: $t('tour.steps[5].text'),
    attachTo: {
      element: '.block-chain:nth-child(2) > div:nth-child(2) > div:nth-child(2)',
      on: 'right'
    },
    buttons: defaultButtons
  });
  tour.addStep({
      title: $t('tour.steps[6].title'),
      text: $t('tour.steps[6].text'),
      attachTo: {
        element: '.block-chain:nth-child(1) > div:nth-child(2) > div:nth-child(1)',
        on: 'right'
      },
      buttons: withDefaultButton({
        text: $t('tour.button.next'),
        async action () {
          onTabClick(1)
          this.hide()
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
          this.hide()
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
          this.hide()
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
        this.hide()
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
        this.hide()
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
        this.hide()
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
          this.hide()
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
          this.hide()
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
        this.hide()
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
          this.hide()
          await $sleep(200)
          return this.back();
        },
        classes: 'shepherd-button-secondary',
        text: 'Back'
      },
      {
        text: 'Next',
        action () {
          return this.next()
        }
      }
    ]
  });
  tour.addStep({
    title: 'Proof of Work',
    text: `
      This is called Proof of Work, to ensure that existing transactions must be valid, sent by a valid person and valid funds as well.
      So miners are needed to do mining with their computing resources. Miners have to scramble the hashes to get the hash that suits their needs
       Because the hash is unpredictable, the hash will continue to be scrambled until it is completely solved.
    `,
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        this.hide()
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
    })
  });
  tour.addStep({
    title: 'New Block',
    text: `
      Now, the new Block has been added successfully.
    `,
    attachTo: {
      element: '.block-chain:nth-child(3)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'New Hash',
    text: `
      This is the hash generated from the previous proof of work.
      This hash contains the data contained in the transaction, plus a timestamp, and added a nonce then the data will be hashed.
      Therefore if the data is changed, then the hash will not match and is considered invalid.
    `,
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(2) > div:nth-child(1)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Previous Hash',
    text: `
      Don't forget to add the hash of the previous block.
    `,
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(2) > div:nth-child(2)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Nonce',
    text: `
      Nonce is a number that is added to the hash to ensure that the hash is unique.
      A nonce is a random number added when mining, useful for finding a matching hash.
      Because when the hash method is running, to get a more different hash, we add random numbers in it every time we try.
      In this simulation, Nonce is not random, but Nonce starts from 0 and will increment until the hash is found.
    `,
    attachTo: {
      element: '.block-chain:nth-child(3) > div:nth-child(3) > div:nth-child(2)',
      on: 'right'
    },
    buttons: withDefaultButton({
      text: 'Next',
      async action () {
        const block = document.querySelector('.block-chain:nth-child(3)')
        block.click()
        this.hide()
        await $sleep(500)
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Detail Block',
    text: `
      Body of block, can contain more than one transaction. In this case there are two transactions.
    `,
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(1)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Signature',
    text: `
      We also added a signature, the signature is the hash sentence generated from the contents of the transaction with the sender's private key.
      That way we can ensure that this transaction is valid from the sender.
    `,
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(5)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Mining Reward',
    text: `
      in the second transaction here is mining rewards. as a reward for the miners who have been mining we will give them a coin prize.
      so in this simulation we also add system transactions to this block.
    `,
    attachTo: {
      element: '.panel-block-detail > div:nth-child(2) > div:nth-child(2)',
      on: 'top'
    },
    buttons: withDefaultButton({
      text: 'Next',
      action () {
        return this.next()
      }
    })
  });
  tour.addStep({
    title: 'Finished!',
    text: `
      Thank you for following the tour guide this time! Have fun and have a nice day!
    `,
    buttons: withDefaultButton({
      text: 'Finish',
      action () {
        return this.hide()
      }
    })
  });
}


// You can click the block to see the details of what transactions are in it.
</script>
