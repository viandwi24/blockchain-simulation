<template>
  <PageWrapper v-if="networks && network" class="flex flex-col">
    <PageHeader>
      <PageTitle
        :text="$t('pages.network.title') + ` ${network.name}`"
        class="capitalize"
      />
    </PageHeader>
    <PageBody class="flex-1 flex flex-col">
      <PageSection class="flex-1 flex flex-col">
        <div class="mb-4 flex space-x-2">
          <Button
            size="sm"
            :text="networkStatus === 'start' ? 'Stop' : 'Start'"
            @click.prevent="toggleNetwork"
          />
          <Button text="add node" size="sm" @click.prevent="addNode" />
          <Button text="test" size="sm" @click.prevent="test" />
          <Button text="show data" size="sm" @click.prevent="showData" />
        </div>
        <div class="mb-4">
          <table class="w-full mytable">
            <thead>
              <tr>
                <th width="5%">#</th>
                <th>Node</th>
                <th>Pending</th>
                <th>Total Block</th>
                <th>In Peers</th>
                <th>Out Peers</th>
                <th>Downlink (MBps)</th>
                <th>Uplink (MBps)</th>
                <th>Power (H/s)</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(node, i) in network.nodes" :key="i">
                <td class="text-center">{{ i + 1 }}</td>
                <td :style="{ color: node.color }">
                  <NuxtLink
                    class="underline"
                    :to="`/network/${networkIndex}/node/${node.name}`"
                  >
                    {{ node.name }}
                  </NuxtLink>
                </td>
                <td>{{ node.getPendingTransactionsCount() }}</td>
                <td>{{ node.getBlockCount() }}</td>
                <td>{{ node.getInPeersCount() }}</td>
                <td>{{ node.getOutPeersCount() }}</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
                <td>2</td>
                <td>{{ node.getState() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4" :style="{ height: '300px' }">
          <v-network-graph
            :nodes="nodes"
            :edges="edges"
            :configs="configs"
            :event-handlers="eventHandlers"
            class="dark:text-white text-slate-800 bg-white"
          />
        </div>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>

<script lang="ts" setup>
import * as vNG from 'v-network-graph'
import { ForceLayout } from 'v-network-graph/lib/force-layout'
import { BlockchainDataTransaction, BlockchainNode } from '~/lib/blockchain'
import { networks } from '~/stores/blockchain'

interface Node extends vNG.Node {
  color: string
  label?: boolean
}

interface Edge extends vNG.Edge {
  color: string
  dashed?: boolean
}

definePageMeta({
  layout: 'page',
})

const { forceUpdate } = useForceUpdate()
const route = useRoute()
const networkIndex = parseInt(route.params.id as string)

const configs = reactive(
  vNG.defineConfigs<Node, Edge>({
    view: {
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true,
      }),
      // grid: {
      //   visible: true,
      //   interval: 10,
      //   thickIncrements: 5,
      //   line: {
      //     color: '#e0e0e0',
      //     width: 1,
      //     dasharray: 1,
      //   },
      //   thick: {
      //     color: '#cccccc',
      //     width: 1,
      //     dasharray: 0,
      //   },
      // },
      scalingObjects: true,
      minZoomLevel: 0.1,
      maxZoomLevel: 16,
    },
    node: {
      normal: {
        type: 'circle',
        color: (node) => node.color,
      },
      hover: {
        color: (node) => node.color,
      },
      selectable: true,
      label: {
        visible: (node) => !!node.name,
      },
      focusring: {
        color: 'darkgray',
      },
    },
    edge: {
      normal: {
        color: (edge) => edge.color,
      },
    },
  })
)
const nodes = reactive<Record<string, Node>>({})
const edges = reactive<Record<string, Edge>>({})
const eventHandlers: vNG.EventHandlers = {
  'node:click': (e) => {
    console.log('node:click', e)
  },
}

const network = computed(() => {
  const n = networks[networkIndex]
  // remove all nodes and edges
  Object.keys(nodes).forEach((key) => delete nodes[key])
  Object.keys(edges).forEach((key) => delete edges[key])
  // add new nodes
  n.nodes.forEach((node) => {
    nodes[node.name] = {
      name: node.name,
      color: node.progressColor,
    }
  })
  n.nodes.forEach((node) => {
    node.peers.forEach((peer) => {
      edges[`edge${node.name}${peer.name}`] = {
        source: node.name,
        target: peer.name,
        color: peer.color,
      }
    })
  })
  return n
})
const networkStatus = computed(() => network.value.status)
const getNode = (name: string) =>
  network.value.nodes.find((n2) => n2.name === name)

const toggleNetwork = () => {
  if (network.value.status === 'start') {
    network.value.stop().finally(() => forceUpdate())
  } else {
    network.value.start()
  }
}
const addNode = () => {
  const newNode = new BlockchainNode(
    network.value,
    `node${network.value.nodes.length + 1}`,
    '#ff0000'
  )
  const lastNode = network.value.nodes[network.value.nodes.length - 1]
  newNode.addPeer(lastNode)
  lastNode.addPeer(newNode)
  network.value.addNode(newNode)
  console.log(network.value)
}
const test = () => {
  const randomInt = Math.floor(Math.random() * (network.value.nodes.length + 1))
  const node = getNode('node' + randomInt)
  if (!node) return
  const trx = new BlockchainDataTransaction(
    node,
    '0x0000000000000000000000000000000000000000000000000000000000000001',
    '0x0000000000000000000000000000000000000000000000000000000000000002',
    0.1
  )
  node.addTransaction(trx)
}
const showData = () => {
  console.log(
    JSON.stringify(
      network.value.nodes.map((n) => ({
        name: n.name,
        totalBlocks: n.getBlockCount(),
        blocks: n.blocks.map((b) => ({
          hash: b.hash,
          timestamp: b.timestamp,
          nonce: b.nonce,
          previousHash: b.previousHash,
          minerAddress: b.minerAddress,
          data: b.data.map((d) => d.get()),
        })),
      }))
    )
  )
}

// handlers network
const onNetworkNodeSyncStart = (n: BlockchainNode) => {
  const node = getNode(n.name)
  node.progressColor = '#000000'
}
const onNetworkNodeSyncFinish = (n: BlockchainNode) => {
  const node = getNode(n.name)
  node.progressColor = node.color
}
onMounted(() => {
  network.value.on('node:sync:start', onNetworkNodeSyncStart)
  network.value.on('node:sync:finish', onNetworkNodeSyncFinish)
})
onUnmounted(() => {
  network.value.off('node:sync:start', onNetworkNodeSyncStart)
  network.value.off('node:sync:finish', onNetworkNodeSyncFinish)
})
</script>
