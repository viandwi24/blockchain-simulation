<template>
  <div class="relative">
    <div class="panel-pending-transaction rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          Pending Transactions
        </div>
        <div class="pt-1 text-xs text-gray-500">
          * Start mining to include all pending transactions in the next block.
        </div>
        <div class="relative py-4 flex flex-col">
          <div v-if="pendingTransactions.length === 0">
            No pending transactions.
          </div>
          <div
            v-for="(transaction, i) in pendingTransactions"
            :key="i"
            class="
              rounded
              text-gray-700 bg-gray-100 hover:bg-gray-200
              px-4 py-2
              flex flex-col md:flex-row space-x-4
              mb-2
              overflow-x-hidden
            "
          >
            <div class="w-1/12 text-3xl text-center self-center text-blue-500">
              {{ i+1 }}
            </div>
            <div class="w-10/12 flex flex-col">
              <div class="flex">
                <div class="truncate font-semibold">
                  From :
                  <span v-if="transaction.fromAddress === blockchain.system.publicKey" class="text-blue-500">
                    System
                  </span>
                  <span v-else class="text-gray-500">
                    {{ transaction.fromAddress }}
                  </span>
                </div>
              </div>
              <div class="flex">
                <div class="truncate font-semibold">
                  To :
                  <span class="text-gray-500">{{ transaction.toAddress }}</span>
                </div>
              </div>
              <div class="flex">
                <div class="truncate font-semibold">
                  Amount :
                  <span class="text-gray-500">{{ transaction.amount }} Coin</span>
                </div>
              </div>
            </div>
            <div class="w-1/12 text-3xl text-center self-center text-gray-400">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-gray-300" />
            </div>
          </div>
          <Button v-if="pendingTransactions.length !== 0" text="Start mining" @click.native="openDialog" />
        </div>
      </div>
    </div>
    <div v-if="loading" class="z-10 absolute top-0 left-0 w-full h-full bg-black text-gray-100 flex flex-col text-center justify-center">
      <div class="text-center">
        <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
      </div>
      <div>
        Mining in progress...
        <div class="text-xs">You can open Console / Dev Panel in your browser to see what happening...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, useContext } from "@nuxtjs/composition-api"
import Shepherd from 'shepherd.js'

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
  setup(props, { emit }) {
    //
    const { $sleep } = useContext()
    //
    const { blockchain, wallets } = props
    const pendingTransactions = computed(() => blockchain.pendingTransactions)
    const loading = ref(false)

    //
    const openDialog = () => {
      const tour = new Shepherd.Tour({
        useModalOverlay: true,
        defaultStepOptions: {
          cancelIcon: {
            enabled: true
          },
          classes: 'shepherd-theme-square',
        },
      })
      tour.addStep({
        title: 'Before Mining',
        text: 'I suggest you to open the javascript console / dev panel in your browser, to see a simulation of what happens when mining.',
        buttons: [
          {
            text: 'No',
            classes: 'shepherd-button-secondary',
            action() {
              return this.hide();
            },
          },
          {
            text: "Okay, Lets Go",
            action() {
              setTimeout(() => startMining(), 500)
              return this.hide();
            }
          }
        ]
      })
      tour.start()
    }
    const startMining = async () => {
      console.clear()
      loading.value = true
      await $sleep(500)
      await blockchain.mine(wallets[0].publicKey)
      loading.value = false
      emit('changeTab', 0)
    }

    return {
      openDialog,
      startMining,
      pendingTransactions,
      loading
    }
  }
})
</script>
