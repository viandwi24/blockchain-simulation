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
import Blockchain from '@/lib/blockchain'
import Transaction from '@/lib/transaction'
import Block from '@/lib/block'
import { KeyGenerator } from '@/lib/signature'
import { useSelectLanguage } from '@/api/composable/lang'
import { useTour } from '@/api/composable/tour'

export default defineComponent({
  setup() {
    // Setup blockchain
    const blockchain = reactive(new Blockchain())
    const wallets = reactive([])

    // ui
    const { tabs, activeTab, componentTab, onTabClick } = useUI({ blockchain, wallets })

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
      setTimeout(() => startSelectLanguage().then(() => setTimeout(startTour, 500)), 500)
      // # simulateTransactions
      // createWallet('Alfian Dwi N', 0)
      // const from = wallets[0]
      // const to = wallets[1]
      // blockchain.addTransaction(
      //   (new Transaction(from.publicKey, to.publicKey, 100)).sign(from.privateKey)
      // )
      // onTabClick(2)
      // console.log(startSelectLanguage, startTour)
    })

    return {
      blockchain,
      wallets,

      tabs,
      activeTab,
      componentTab,
      onTabClick,
    }
  },
  head() {
    return {
      title: 'Blockchain Simulation',
    }
  },
})

function useUI({ blockchain, wallets }) {
  //
  const { $t } = useContext()

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

  return {
    tabs,
    activeTab,
    onTabClick,
    componentTab
  }
}
</script>
