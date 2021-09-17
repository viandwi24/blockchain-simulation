<template>
  <div>
    <!-- Wallets -->
    <transition>
      <div class="rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
        <div class="px-4 flex justify-between">
          <div class="text-2xl font-semibold">
            Wallets
          </div>
          <div>
            <button
              class="
                rounded
                px-2 py-1 text-xs
                bg-gray-100 text-gray-600
              "
              @click="createWallet"
            >
              <font-awesome-icon :icon="['fas', 'plus']" /> New
            </button>
          </div>
        </div>
        <div class="relative">
          <transition-group name="block" class="wallets transition-all duration-300 relative flex flex-row space-x-10">
            <div
              v-for="(wallet, i) in wallets"
              :key="`key-${i}`"
              class="
                transition-all duration-300 cursor-pointer
                wallet flex flex-col justify-center
                text-center hover:bg-blue-700 hover:border-blue-800
              "
              @click="onWalletClick(wallet, i)"
            >
              <div class="text-xl font-semibold text-gray-100">
                {{ wallet.name }}
              </div>
              <div class="text-gray-200">
                {{ blockchain.getBalance(wallet.publicKey) }} Coin
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
    <!-- Actions -->
    <transition name="panels">
      <div v-if="action" class="mt-4 flex-1 rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
        <div class="px-4 flex space-x-2">
          <div>
            <button class="rounded px-2 py-1 text-xs bg-red-100 text-red-600" @click="closePanel">
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
          <div class="text-2xl font-bold self-center">
            <template v-if="action === 'create'">
              New Wallet
            </template>
            <template v-if="action === 'edit'">
              Edit Wallet
            </template>
          </div>
        </div>
        <div class="px-4 py-4 flex-1 w-full">
          <template v-if="action === 'edit'">
            <form class="w-full">
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Name
                  </label>
                </div>
                <div class="md:w-9/12">
                  <input id="name" v-model="selectedWallet.name" type="text" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                </div>
              </div>
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Public Key
                  </label>
                </div>
                <div class="md:w-9/12">
                  <input id="publicKey" :value="selectedWallet.publicKey" :disabled="true" readonly type="text" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                </div>
              </div>
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Private Key
                  </label>
                </div>
                <div class="md:w-9/12">
                  <input id="privateKey" :value="selectedWallet.privateKey" :disabled="true" readonly type="text" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                </div>
              </div>
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12"></div>
                <div class="md:w-9/12">
                  <Button text="Save" @click.prevent.native="actionSaveEdit" />
                </div>
              </div>
            </form>
          </template>
          <template v-else-if="action === 'create'">
            <form class="w-full">
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Name
                  </label>
                </div>
                <div class="md:w-9/12">
                  <input id="name" v-model="selectedWallet.name" type="text" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                </div>
              </div>
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12">
                  <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Initial Balance
                  </label>
                </div>
                <div class="md:w-9/12">
                  <input id="name" v-model="selectedWallet.amount" type="number" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                </div>
              </div>
              <div class="w-full md:flex md:items-center mb-6">
                <div class="md:w-2/12"></div>
                <div class="md:w-9/12">
                  <Button text="Save" @click.prevent.native="actionSaveCreate" />
                </div>
              </div>
            </form>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api"
import { KeyGenerator } from '@/lib/signature'
import Transaction from '@/lib/transaction'
// import copy from 'copy-to-clipboard'

export default defineComponent({
  props: {
    blockchain: {
      type: Object,
      required: true,
    },
    wallets: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    //
    const { $sleep } = useContext()
    const { wallets, blockchain } = props

    //
    const action = ref(null)
    const selectedWallet = ref(null)

    // methods
    const closePanel = () => {
      action.value = null
      selectedWallet.value = null
    }
    const onWalletClick = async (wallet, index) => {
      if (selectedWallet.value) {
        if (selectedWallet.value.index === index) {
          return closePanel()
        }
        action.value = null
        selectedWallet.value = null
        await $sleep(500)
      }
      // copy(wallet.publicKey);
      selectedWallet.value = Object.assign({}, wallet, { index })
      action.value = 'edit'
    }
    const createWallet = () => {
      closePanel()
      onWalletClick({
        name: '',
        amount: 0,
      }, wallets.length)
      action.value = 'create'
    }

    //
    const actionSaveEdit = () => {
      wallets[selectedWallet.value.index].name = selectedWallet.value.name
      closePanel()
    }
    const actionSaveCreate = () => {
      const { publicKey, privateKey } = (new KeyGenerator).generate()
      wallets.push({
        name: selectedWallet.value.name,
        publicKey,
        privateKey
      })
      if (selectedWallet.value.amount > 0) {
        blockchain.pendingTransactions.push(new Transaction(blockchain.system.publicKey, publicKey, selectedWallet.value.amount).sign(blockchain.system.privateKey))
      }
      closePanel()
    }

    return {
      action,
      closePanel,
      onWalletClick,
      selectedWallet,

      createWallet,
      actionSaveCreate,
      actionSaveEdit
    }
  }
})
</script>

<style lang="scss">

.wallets {
  overflow: hidden;
  overflow-x: auto;
  padding: 1rem;
  background: theme('colors.gray.50');
  & > .wallet {
    @apply shadow-lg rounded-lg border border-gray-500;
    white-space: nowrap;
    min-width: 300px;
    max-width: 300px;
    min-height: 150px;
    max-height: 150px;
    height: 100%;
    background: theme('colors.blue.400');
    z-index: 1;
  }
}
</style>
