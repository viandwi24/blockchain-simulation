<template>
  <div>
    <Menu :tabs="tabs" :active-tab="activeTab" @onTabClick="onTabClick" />
    <component :is="componentTab" :blockchain.sync="blockchain" :wallets.sync="wallets" @changeTab="onTabClick" />
  </div>
</template>

<script>
import { computed, defineAsyncComponent, defineComponent, onMounted, reactive, ref } from '@nuxtjs/composition-api'
import Blockchain from '@/lib/blockchain'
import Transaction from '@/lib/transaction'
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
      { label: `Pending (${blockchain.pendingTransactions.length})` }
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
        default:
          component = defineAsyncComponent(() => import('@/components/Blocks.vue'))
          break;
      }
      return component
    })

    // methods
    const addTransaction = (from, to, amount) => {
      blockchain.addTransaction((new Transaction(from.publicKey, to.publicKey, amount)).sign(from.privateKey))
      blockchain.mine(from.publicKey)
      // setTimeout(blocksScrollLeft, 100)
    }
    const createWallet = (name, amount = 0) => {
      const { publicKey, privateKey } = (new KeyGenerator).generate()
      wallets.push({
        name,
        publicKey,
        privateKey
      })
      if (amount > 0) {
        blockchain.pendingTransactions.push(new Transaction(blockchain.system.publicKey, publicKey, amount).sign(blockchain.system.privateKey))
        blockchain.mine(publicKey)
      }
    }

    // events
    onMounted(() => {
      createWallet('Alfian Dwi Nugraha')
      // createWallet('Wildan Firdaus')
      // for (let i = 0; i < 1; i++) {
      //   addTransaction(wallets[0], wallets[1], 200)
      // }
    })

    return {
      blockchain,
      wallets,

      addTransaction,
      createWallet,

      componentTab,
      onTabClick,
      tabs,
      activeTab,
    }
  }
})
</script>
