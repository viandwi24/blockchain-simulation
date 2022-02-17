import { BlockchainNetwork, BlockchainNode } from '~/lib/blockchain'

export interface INetworks {
  networks: BlockchainNetwork[]
}

export const initDefaultNetworks = () => {
  const networks: BlockchainNetwork[] = []

  // adding vicoin network
  const network = new BlockchainNetwork('Vicoin Testnet')

  // adding nodes
  const node1 = new BlockchainNode(network, 'node1', 'blue')
  const node2 = new BlockchainNode(network, 'node2', 'red')
  const node3 = new BlockchainNode(network, 'node3', 'orange')
  const node4 = new BlockchainNode(network, 'node4', 'green')
  const node5 = new BlockchainNode(network, 'node5', 'blue')
  const node6 = new BlockchainNode(network, 'node6', 'purple')
  node1.addPeer(node2)
  node2.addPeer(node1)
  node2.addPeer(node3)
  node3.addPeer(node2)
  node4.addPeer(node2)
  node2.addPeer(node4)
  node4.addPeer(node5)
  node5.addPeer(node4)
  node5.addPeer(node6)
  node6.addPeer(node5)
  node6.addPeer(node3)
  node3.addPeer(node6)
  network.addNode(node1, node2, node3, node4, node5, node6)
  networks.push(network)

  // only in client
  if (process.client) network.start()

  return networks
}

export const networks = reactive([...initDefaultNetworks()])
