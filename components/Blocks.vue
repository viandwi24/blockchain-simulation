<template>
  <div>
    <!-- Blocks -->
    <transition>
      <div class="rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
        <div class="px-4 flex justify-between">
          <div class="text-2xl font-semibold">
            Block
          </div>
          <div>
            <button
              class="
                rounded
                px-2 py-1 text-xs
                bg-gray-100 text-gray-600
              "
              :class="{
                'bg-gray-300': (!blocksCompactView)
              }"
              @click="blocksCompactView = !blocksCompactView"
            >
              <font-awesome-icon :icon="['fas', 'align-justify']" />
            </button>
            <button
              class="
                rounded
                px-2 py-1 text-xs
                bg-gray-100 text-gray-600
              "
              :class="{
                'bg-gray-300': (blocksCompactView)
              }"
              @click="blocksCompactView = !blocksCompactView"
            >
              <font-awesome-icon :icon="['fas', 'align-left']" />
            </button>
          </div>
        </div>
        <div class="relative">
          <transition name="button-scroll-to-left">
            <button v-if="showBtnScrollToLeft" class="absolute rounded-full text-sm bottom-0 right-0 mb-6 mr-4 z-10 block py-2 px-4 shadow-xl text-gray-100 bg-blue-500" @click="blocksScrollLeft">
              <font-awesome-icon :icon="['fas', 'chevron-right']" />
            </button>
          </transition>
          <transition-group name="block" class="blocks transition-all duration-300 relative flex flex-row space-x-10">
            <div
              v-for="(block, i) in blockchain.chain"
              :key="`key-${i}`"
              class="
                transition-all duration-300 cursor-pointer
                block-chain relative rounded border-2 border-gray-500
                hover:border-blue-500
              "
              :class="{
                'border-blue-500': (selectedBlock && selectedBlock.index === i),
              }"
              @click="onBlockClick(block, i)"
            >
              <div class="title py-2 px-3 font-semibold border-b border-gray-500">
                Block {{ i+1 }}
                <span v-if="i === 0" class="text-xs">(Genesis Block)</span>
              </div>
              <div v-if="!blocksCompactView">
                <div class="text-sm p-2 border-b border-gray-500">
                  <div class="mb-2">
                    <div class="font-semibold">Hash</div>
                    <div class="truncate text-pink-600">{{ block.hash }}</div>
                  </div>
                  <div>
                    <div class="font-semibold">Previous Block Hash</div>
                    <div class="truncate text-purple-600">{{ block.previousHash }}</div>
                  </div>
                </div>
                <div class="text-sm p-2 border-b border-gray-500">
                  <div class="mb-2">
                    <div class="font-semibold">Nonce</div>
                    <div class="truncate">{{ block.nonce }}</div>
                  </div>
                </div>
                <div class="text-sm p-2 border-b border-gray-500">
                  <div class="mb-2">
                    <div class="font-semibold">Transaction Count</div>
                    <div class="truncate">{{ (block.data.length) }}</div>
                  </div>
                </div>
              </div>
              <div v-if="i !== 0" class="chain"></div>
            </div>
          </transition-group>
        </div>
      </div>
    </transition>
    <!-- Transactions -->
    <transition name="panels">
      <div v-if="selectedBlock" class="mt-4 flex-1 rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
        <div class="px-4 flex space-x-2">
          <div>
            <button
              class="
                rounded
                px-2 py-1 text-xs
                bg-red-100 text-red-600
              "
              @click="closeTransactionsPanel"
            >
              <font-awesome-icon :icon="['fas', 'times']" />
            </button>
          </div>
          <div class="text-2xl font-bold self-center">
            Transactions
            <span class="text-xs">
              Inside Block {{ selectedBlock.index + 1 }}
            </span>
          </div>
        </div>
        <div class="px-4 py-2 flex-1 w-full">
          <div v-if="selectedBlock.data.length === 0">
            This block has no transactions.
          </div>
          <div
            v-for="(transaction, i) in selectedBlock.data"
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
              <font-awesome-icon v-if="transaction.isValid()" :icon="['fas', 'check']" class="text-green-500" />
              <font-awesome-icon v-else :icon="['fas', 'times']" class="text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, ref, useContext } from "@nuxtjs/composition-api"

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
    // const { blockchain, wallets } = props

    // ui
    const blocksCompactView = ref(false)
    const showBtnScrollToLeft = ref(false)
    const selectedBlock = ref(null)
    const blocksScrollLeft = () => {
      const blocks = document.querySelector('.blocks')
      const items = blocks.querySelectorAll('.block-chain')
      const lastItem = items[items.length - 1]
      const x = lastItem.getBoundingClientRect().left + blocks.scrollWidth
      blocks.scrollTo({ left: x, behavior: 'smooth' })
      showBtnScrollToLeft.value = false
    }
    const onBlockClick = async (block, index) => {
      if (selectedBlock.value) {
        if (selectedBlock.value.index === index) {
          return closeTransactionsPanel()
        }
        selectedBlock.value = null
        await $sleep(500)
      }
      selectedBlock.value = Object.assign({ index }, block)
      blocksCompactView.value = true
    }
    const closeTransactionsPanel = () => {
      selectedBlock.value = null
      blocksCompactView.value = false
    }

    // listener
    const onBlocksScroll = (e) => {
      const blocks = document.querySelector('.blocks')
      const x = blocks.scrollLeft
      const width = blocks.scrollWidth - blocks.clientWidth
      const offset = 25
      showBtnScrollToLeft.value = (x < width - offset)
    }
    onMounted(() => {
      // add listener
      document.querySelector('.blocks').addEventListener('scroll', onBlocksScroll)
      window.addEventListener('resize', onBlocksScroll)
      try {
        setTimeout(blocksScrollLeft, 1000)
      } catch (error) {
      }
      // Log.listeners.push(onLogUpdate)

      // create wallet
      // console.log(wallets, createWallet, addTransaction, blockchain)
      // onBlockClick(blockchain.chain[1], 1)
    })
    onBeforeUnmount(() => {
      try {
        document.querySelector('.blocks').removeEventListener('scroll', onBlocksScroll)
      } catch (error) {
      }
      window.removeEventListener('resize', onBlocksScroll)
    })

    return {
      blocksCompactView,
      showBtnScrollToLeft,
      selectedBlock,
      blocksScrollLeft,
      onBlockClick,
      closeTransactionsPanel
    }
  }
})
</script>
