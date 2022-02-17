<template>
  <PageWrapper class="flex flex-col">
    <PageHeader>
      <PageTitle :text="$t('pages.network.title')" class="capitalize" />
    </PageHeader>
    <PageBody class="flex-1 flex flex-col">
      <PageSection class="flex-1 flex space-x-4">
        <NuxtLink
          v-for="(network, i) in networks"
          :key="i"
          class="bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 h-40 w-52 rounded-md cursor-pointer text-lg truncate relative overflow-hidden border flex justify-center items-center border-gray-600 transition-all duration-300"
          :to="`/network/${i}`"
        >
          {{ network.name }}
        </NuxtLink>
        <div
          class="bg-gray-50 hover:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 h-40 w-52 rounded-md cursor-pointer text-lg truncate relative overflow-hidden border flex justify-center items-center border-gray-600 transition-all duration-300"
        >
          <IconUil:plus />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
// import { BlockchainNetwork, initDefaultNetworks } from '~/lib/blockchain'
// const BlockchainNetworks: BlockchainNetwork[] = reactive(initDefaultNetworks())

import { networks } from '~/stores/blockchain'

// const BlockchainNetworks = useBlockchain()
// const networks = ref(BlockchainNetworks.networks)

definePageMeta({
  layout: 'page',
})
</script>
