<template>
  <div class="relative">
    <div class="panel-setting rounded pt-4 overflow-hidden flex flex-col bg-gray-50">
      <div class="px-4 flex flex-col justify-between">
        <div class="text-2xl font-semibold">
          {{ $t('components.setting.title') }}
        </div>
      </div>
      <div>
        <form class="w-full px-4 pt-4">
          <div class="w-full md:flex mb-6">
            <div class="md:w-2/12 pt-2">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                {{ $t('components.setting.difficulty') }}
              </label>
            </div>
            <div class="md:w-9/12">
              <input id="difficulty" v-model="setting.difficulty" min="1" type="number" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              <span class="text-xs text-gray-500">
                {{ $t('components.setting.difficultyDescription') }}
              </span>
            </div>
          </div>
          <div class="w-full md:flex mb-6">
            <div class="md:w-2/12 pt-2">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                {{ $t('components.setting.miningReward') }}
              </label>
            </div>
            <div class="md:w-9/12">
              <input id="reward" v-model="setting.reward" min="1" type="number" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
              <span class="text-xs text-gray-500">
                {{ $t('components.setting.miningRewardDescription') }}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, watch } from "@nuxtjs/composition-api"

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
    const { blockchain } = props
    const setting = reactive({
      difficulty: 1,
      reward: 1,
    })
    watch(setting, (val) => {
      blockchain.blockProofOfWorkDifficulty = val.difficulty
    })

    onMounted(() => {
      setting.difficulty = blockchain.blockProofOfWorkDifficulty
      setting.reward = blockchain.blockMineReward
    })

    return {
      setting
    }
  }
})
</script>

