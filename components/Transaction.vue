<template>
  <div class="relative">
    <div class="rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          New Transactions
        </div>
        <div class="pt-1 text-xs text-gray-500">
          * Add new transactions, this transaction will be added to the pending transaction
        </div>
        <div class="mt-4">
          <form class="w-full">
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12 pt-2">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  From
                </label>
              </div>
              <div class="md:w-9/12">
                <input id="from" v-model="transaction.from" :disabled="true" readonly type="text" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                <span class="text-xs text-gray-500">* Your wallet</span>
              </div>
            </div>
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12 pt-2">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  To
                </label>
              </div>
              <div class="md:w-9/12">
                <select id="to" v-model="transaction.to" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                  <template v-for="(wallet, i) in wallets">
                    <option v-if="wallet.publicKey !== wallets[0].publicKey" :key="`key-${i}`" :value="i">
                      {{ wallet.name }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12 pt-2">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Amount
                </label>
              </div>
              <div class="md:w-9/12">
                <input id="from" v-model="transaction.amount" type="number" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              </div>
            </div>
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12"></div>
              <div class="md:w-9/12">
                <Button v-if="transaction.from !== null && transaction.to !== null && transaction.amount > 0" text="Create Transaction" @click.prevent.native="create" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "@nuxtjs/composition-api"
import Transaction from '@/lib/transaction'

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
    const { wallets, blockchain } = props
    const transaction = reactive({
      from: wallets[0].publicKey,
      to: null,
      amount: 0,
    })

    const create = () => {
      const from = wallets[0]
      const to = wallets[transaction.to]
      blockchain.addTransaction((new Transaction(from.publicKey, to.publicKey, transaction.amount)).sign(from.privateKey))
      emit('changeTab', 2)
    }

    return {
      transaction,
      create
    }
  }
})
</script>
