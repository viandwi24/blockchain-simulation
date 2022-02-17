<template>
  <PageWrapper v-if="node" class="flex flex-col">
    <PageHeader>
      <PageTitle
        :text="$t('pages.node.title') + ` ${node.name}`"
        class="capitalize"
      />
    </PageHeader>
    <PageBody class="flex-1 flex flex-col">
      <PageSection class="flex-1 flex flex-col">
        <div v-for="(block, i) in node.blocks" :key="i">
          {{ node.name }}
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { networks } from '~/stores/blockchain'
import { BlockchainNode } from '~~/lib/blockchain'

definePageMeta({
  layout: 'page',
})

const route = useRoute()
const networkIndex = parseInt(route.params.id as string)
const nodeName = route.params.node as string
const node = computed<BlockchainNode>(
  () =>
    networks[networkIndex].nodes.find(
      (n) => n.name === nodeName
    ) as BlockchainNode
)
</script>
