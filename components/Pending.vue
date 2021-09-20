<template>
  <div class="relative">
    <div v-if="showVisualizer" class="panel-visualizer-mining rounded pt-4 overflow-hidden flex flex-col mb-4 bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          {{ $t('components.pending.visualizer.title') }}
        </div>
        <div class="py-4 flex flex-row">
          <div class="blocks transition-all duration-300 relative flex flex-row">
            <div
              class="
                transition-all duration-300 cursor-pointer
                block-chain relative rounded border-2 border-gray-500
                hover:border-blue-500
              "
            >
              <div class="title py-2 px-3 font-semibold border-b border-gray-500">
                {{ $t('components.pending.visualizer.newBlockCandidate') }}
              </div>
              <div class="text-sm p-2 border-b border-gray-500">
                <div class="mb-2">
                  <div class="font-semibold">{{ $t('components.blocks.block.previousBlockHash') }}</div>
                  <div class="text-purple-600">
                    <span class="break-words">
                      {{ blockchain.getLastBlock().previousHash }}
                    </span>
                  </div>
                </div>
                <div class="mb-2">
                  <div class="font-semibold">{{ $t('components.blocks.block.hash') }}</div>
                  <div class="text-pink-600">
                    <span class="break-words">
                      {{ visualizer.hash }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-sm p-2">
                <div class="">
                  <div class="font-semibold">{{ $t('components.blocks.block.nonce') }}</div>
                  <div class="text-pink-600">
                    <span class="break-words">
                      {{ visualizer.nonce }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-1 py-4 pr-8 w-full">
            <table class="table text-xs w-full">
              <tr class="flex space-x-4 mb-2">
                <th class="w-full md:w-1/12 text-right">{{ $t('components.pending.visualizer.powDifficulty') }}</th>
                <td class="w-10/12 text-left">
                  {{ blockchain.blockProofOfWorkDifficulty }}
                  (
                    <span v-for="i in parseInt(blockchain.blockProofOfWorkDifficulty)" :key="i" class="text-red-500">0</span><span class="text-purple-500">RANDOMHASH</span>
                  )
                </td>
              </tr>
              <tr class="flex space-x-4 mb-2">
                <th class="w-full md:w-1/12 text-right">{{ $t('components.pending.visualizer.hashRules') }}</th>
                <td class="w-10/12 text-left">
                  <span class="text-red-500">SHA256(</span>
                    <span class="text-green-500">previousHash</span> +
                    <span class="text-green-500">timestamp</span> +
                    <span class="text-green-500">payload</span> +
                    <span class="text-green-500">nonce</span>
                  <span class="text-red-500">)</span>
                </td>
              </tr>
              <tr class="flex space-x-4 mb-2">
                <th class="w-full md:w-1/12 text-right">{{ $t('components.pending.visualizer.generatedHash') }}</th>
                <td class="w-10/12 text-left">
                  <span class="text-red-500">SHA256(</span>
                    <span class="text-green-500">{{ blockchain.getLastBlock().previousHash }}</span> +
                    <span class="text-green-500">{{ visualizer.timestamp }}</span> +
                    <span class="text-green-500">payload {data}</span> +
                    <span class="text-green-500">{{ visualizer.nonce }}</span>
                  <span class="text-red-500">)</span>
                </td>
              </tr>
              <tr class="flex space-x-4 mb-2">
                <th class="w-full md:w-1/12 text-right">{{ $t('components.pending.visualizer.timeElapsed') }}</th>
                <td class="w-10/12 text-left">{{ visualizer.elapsedTime }}s</td>
              </tr>
              <tr class="flex space-x-4 mb-2">
                <th class="w-full md:w-1/12 text-right">Payload</th>
                <td class="w-10/12 text-left">
                  <textarea
                    v-model="visualizer.payload"
                    readonly
                    disabled="true"
                    class="
                      w-full px-4 py-2
                      border-2 border-purple-500
                    "
                    rows="10"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-pending-transaction relative rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          {{ $t('components.pending.title') }}
        </div>
        <div class="pt-1 text-xs text-gray-500">
          {{ $t('components.pending.description') }}
        </div>
        <div v-if="!loading" class="relative py-4 flex flex-col">
          <div v-if="pendingTransactions.length === 0">
            {{ $t('components.pending.noTransactions') }}
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
                  {{ $t('other.from') }} :
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
                  {{ $t('other.to') }} :
                  <span class="text-gray-500">{{ transaction.toAddress }}</span>
                </div>
              </div>
              <div class="flex">
                <div class="truncate font-semibold">
                  {{ $t('other.amount') }} :
                  <span class="text-gray-500">{{ transaction.amount }} Coin</span>
                </div>
              </div>
            </div>
            <div class="w-1/12 text-3xl text-center self-center text-gray-400">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-gray-300" />
            </div>
          </div>
          <Button v-if="pendingTransactions.length !== 0" :text="$t('components.pending.startMining')" @click.native="openDialog" />
        </div>
      </div>
      <div v-if="loading" class="z-10 absolute top-0 left-0 w-full h-full bg-black text-gray-100 flex flex-col text-center justify-center">
        <div class="text-center">
          <font-awesome-icon :icon="['fas', 'circle-notch']" spin />
        </div>
        <div>
          {{ $t('components.pending.miningInProgress') }}
          <div class="text-xs">
            {{ $t('components.pending.noteInProgress') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, useContext } from "@nuxtjs/composition-api"
import Shepherd from 'shepherd.js'
import dayjs from 'dayjs'
import Log from '../lib/log'
import Transaction from '@/lib/transaction'
import Block from '@/lib/block'

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
    const { $sleep, $t } = useContext()

    //
    const { blockchain, wallets } = props
    const pendingTransactions = computed(() => blockchain.pendingTransactions)
    const loading = ref(false)
    const showVisualizer = ref(false)
    const visualizer = reactive({
      hash: '...',
      nonce: '...',
      timestamp: '...',
      elapsedTime: '...',
      payload: []
    })
    const miningDelay = 5

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
        title: $t('components.pending.dialog.title'),
        text: $t('components.pending.dialog.text'),
        buttons: [
          {
            text: $t('components.pending.dialog.prev'),
            classes: 'shepherd-button-secondary',
            action() {
              return this.hide();
            },
          },
          {
            text: $t('components.pending.dialog.next'),
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
      showVisualizer.value = true
      loading.value = true
      console.clear()
      await $sleep(1000)
      visualMine().finally(() => {
        loading.value = false
      })
    }
    const visualMine = async () => {
      const mineAddress = wallets[0].publicKey

      //
      Log.add(`[Blockchain] Starting mining with miner ${mineAddress}`)
      // add reward to miner
      blockchain.addTransaction(
        new Transaction(
          blockchain.system.publicKey,
          mineAddress,
          blockchain.blockMineReward
        ).sign(blockchain.system.privateKey)
      )
      // create temp block
      const block = new Block(blockchain.pendingTransactions, dayjs().toDate())
      // set previous block hash
      block.previousHash = blockchain.getLastBlock().hash
      visualizer.payload = JSON.stringify(block.data)
      // start mining
      const start = Date.now()
      const difficulty = blockchain.blockProofOfWorkDifficulty
      while (block.hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
        // delay
        await $sleep(miningDelay)

        const current = Date.now()
        block.nonce++
        block.timestamp = dayjs().unix()
        block.hash = block.calculateHash()
        const currentTime = Math.floor((current - start) / 1000)
        console.log(`[Block] Mining Block - generate hash and found ${block.hash} | ${currentTime}s | nonce ${block.nonce}`)
        visualizer.nonce = block.nonce
        visualizer.hash = block.hash
        visualizer.timestamp = block.timestamp
        visualizer.elapsedTime = currentTime
      }
      const end = Date.now()
      const time = (end - start) / 1000
      console.log(`[Block] Mining Block - Success in ${time}s with nonce ${block.nonce}`)
      Log.add(`[Block] Mining Block - Success in ${time}s with nonce ${block.nonce}`)

      //
      blockchain.chain.push(block)
      blockchain.pendingTransactions = []
      Log.add(`[Blockchain] Mining complete`)
      await $sleep(1000)
    }

    return {
      openDialog,
      startMining,
      pendingTransactions,
      loading,
      visualizer,
      showVisualizer
    }
  }
})
</script>
