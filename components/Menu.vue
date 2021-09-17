<template>
  <div class="mb-4 flex flex-col sm:flex-row md:flex-row md:inline-flex overflow-hidden rounded shadow-lg">
      <button v-for="(item, i) in tabs" :key="i" class="sm:flex-1 bg-gray-100 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4" :class="{ 'bg-gray-300 text-gray-700': i === activeTab }" @click="select(i)">
        {{ item.label }}
      </button>
  </div>
</template>

<script>
import { defineComponent } from "@nuxtjs/composition-api"

export default defineComponent({
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: Number,
      required: true
    }
  },
  setup(_props, { emit }) {
    const select = (i) => emit('onTabClick', i)

    return {
      select
    }
  }
})
</script>
