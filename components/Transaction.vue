<template>
  <div class="relative">
    <div class="panel-transaction rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          {{ $t('components.newTransaction.title') }}
        </div>
        <div class="pt-1 text-xs text-gray-500">
          {{ $t('components.newTransaction.description') }}
        </div>
        <div class="mt-4">
          <form class="w-full">
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12 pt-2">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  {{ $t('other.from') }}
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
                  {{ $t('other.to') }}
                </label>
              </div>
              <div class="md:w-9/12">
                <select id="to" v-model="transaction.to" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                  <template v-for="(wallet, i) in wallets">
                    <option v-if="wallet.publicKey !== wallets[0].publicKey" :key="`key-${i}`" :value="i">
                      {{ wallet.name }} [{{ wallet.publicKey }}]
                    </option>
                  </template>
                </select>
                <div class="text-xs text-gray-500">
                  <span v-if="wallets.filter(w => w.publicKey !== wallets[0].publicKey).length === 0">
                    * Create wallet before make transaction
                  </span>
                  <span v-else>
                    * select the address of the recipient
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12 pt-2">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                  {{ $t('other.amount') }}
                </label>
              </div>
              <div class="md:w-9/12">
                <input id="from" v-model="transaction.amount" min="1" type="number" class="bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              </div>
            </div>
            <div class="w-full md:flex mb-6">
              <div class="md:w-2/12"></div>
              <div class="md:w-9/12">
                <Button v-if="transaction.from !== null && transaction.to !== null && transaction.amount > 0" :text="$t('components.newTransaction.createTransaction')" @click.prevent.native="create" />
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
      amount: 1,
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
