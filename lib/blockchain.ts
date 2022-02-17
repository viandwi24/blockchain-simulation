/* eslint-disable no-use-before-define */
import { sha256 } from 'js-sha256'

export interface BlockchainBlockData {
  node: BlockchainNode
  get: () => object
}

export class BlockchainDataTransaction implements BlockchainBlockData {
  node: BlockchainNode
  fromAddress: string
  toAddress: string
  amount: number

  constructor(
    node: BlockchainNode,
    fromAddress: string,
    toAddress: string,
    amount: number
  ) {
    this.node = node
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  get() {
    return {
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
    }
  }
}

export class BlockchainBlock {
  data: BlockchainBlockData[]
  hash: string
  previousHash: string
  timestamp: number
  nonce: number = 0
  minerAddress: string
  miningTime: number
  miningStartTimestamp: number
  isGenesis: boolean = false
  previousBlock?: BlockchainBlock

  constructor() {
    this.data = []
    this.timestamp = Date.now()
  }

  /**
   * Add data to the block
   * @param  {BlockchainBlockData[]} data
   */
  setData(data: BlockchainBlockData[]) {
    this.data = data
  }

  /**
   * Mine the block
   * @param  {string} minerAddress
   * @param  {number=2} difficulty
   */
  mine(minerAddress: string, difficulty: number = 2) {
    return new Promise<void>((resolve) => {
      this.minerAddress = minerAddress
      this.miningStartTimestamp = Date.now()
      this.hash = this.calculateHash()
      while (this.hash.slice(0, difficulty) !== '0'.repeat(difficulty)) {
        this.nonce++
        this.hash = this.calculateHash()
      }
      this.miningTime = Date.now() - this.miningStartTimestamp
      resolve()
    })
  }

  calculateHash() {
    const data = this.data.map((blockData) => blockData.get()).sort()
    const pattern =
      this.previousHash + this.timestamp + JSON.stringify(data) + this.nonce
    const hash = sha256.create()
    hash.update(pattern)
    return hash.hex()
  }
}

export class BlockchainNode {
  network: BlockchainNetwork
  name: string
  color: string
  progressColor: string
  peers: BlockchainNode[] = []
  blocks: BlockchainBlock[] = []
  pendingTransactions: BlockchainBlockData[] = []
  isSyncInProgress: boolean = false
  state: 'idle' | 'syncing' | 'mining' = 'idle'

  constructor(
    network: BlockchainNetwork,
    name: string,
    color: string = 'blue'
  ) {
    this.network = network
    this.name = name
    this.color = color
    this.progressColor = color
  }

  addGenesisBlock() {
    const genesisBlock = new BlockchainBlock()
    genesisBlock.previousHash = '0'
    genesisBlock.timestamp = Date.now()
    genesisBlock.nonce = 0
    genesisBlock.minerAddress = this.name
    genesisBlock.miningTime = 0
    genesisBlock.miningStartTimestamp = 0
    genesisBlock.isGenesis = true
    genesisBlock.hash = genesisBlock.calculateHash()
    console.log(genesisBlock)
    this.blocks.push(genesisBlock)
  }

  addPeer(...peers: BlockchainNode[]) {
    this.peers.push(...peers)
  }

  /**
   * Add a new transaction to the pending transactions list
   * @param  {string} fromAddress
   * @param  {string} toAddress
   * @param  {number} amount
   */
  addTransaction(newData: BlockchainBlockData) {
    this.pendingTransactions.push(newData)
  }

  getBlockCount() {
    return this.blocks.length
  }

  getInPeersCount() {
    return this.network.nodes.filter((node) => node.peers.includes(this)).length
  }

  getOutPeersCount() {
    return this.peers.length
  }

  getPendingTransactionsCount() {
    return this.pendingTransactions.length
  }

  getLastBlock(): BlockchainBlock | undefined {
    return this.blocks[this.blocks.length - 1]
  }

  isValid() {
    for (let i = 1; i < this.blocks.length; i++) {
      const block = this.blocks[i]
      if (block.calculateHash() !== block.hash) return false
    }
    return true
  }

  async sync() {
    this.isSyncInProgress = true
    this.state = 'syncing'

    // Get the last block from the network
    if (!this.isValid()) {
      const allnodes = this.peers.map((peer) => ({
        node: peer,
        totalBlocks: peer.getLastBlock(),
        lastBlock: peer.getLastBlock(),
      }))
      const majorityNode = allnodes.reduce((acc, node) => {
        if (acc.totalBlocks.timestamp < node.totalBlocks.timestamp) {
          return node
        }
        return acc
      })
      this.blocks = majorityNode.node.blocks
    }

    // Sync from peers
    for (const peer of this.peers) {
      const synched = await peer.syncFromInPeer(this)
      if (!synched) {
        this.blocks = [...peer.blocks]
        break
      }
    }

    // detect pending transactions
    if (this.getPendingTransactionsCount() > 0) {
      await this.startMiningPendingTransactions()
    }

    // wait
    await this.sleep(100)
    this.isSyncInProgress = false
    this.state = 'idle'
  }

  getState() {
    return this.state
  }

  syncFromInPeer(node: BlockchainNode) {
    let isDifferent = false
    if (node.blocks.length !== this.blocks.length) isDifferent = true
    if (
      node.getLastBlock() &&
      this.getLastBlock() &&
      node.getLastBlock().hash !== this.getLastBlock().hash
    )
      isDifferent = true

    if (isDifferent) {
      const isNewBlockFromPeer =
        node.blocks.length > this.blocks.length &&
        node.getLastBlock().previousHash === (this.getLastBlock()?.hash || '0')
      if (isNewBlockFromPeer) {
        this.blocks = [...node.blocks]
        this.sync()
        return true
      }

      return false
    }
  }

  async startMiningPendingTransactions() {
    console.log(
      `${this.name} is mining pending transactions`,
      this.pendingTransactions
    )
    const block = new BlockchainBlock()
    block.previousHash = this.getLastBlock()?.hash || '0'
    block.previousBlock = this.getLastBlock()
    if (this.blocks.length === 0) block.isGenesis = true
    block.setData(this.pendingTransactions)
    await block.mine(this.name)
    this.blocks.push(block)
    this.pendingTransactions = []
    console.log(`${this.name} mined block`, block)
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export class BlockchainNetworkEvent {
  key: string
  handler: (...args: any[]) => void
}

export class BlockchainNetwork {
  name: string
  nodes: BlockchainNode[] = []
  intervalTime?: NodeJS.Timer
  intervalDelay: number = 1000
  status: 'stop' | 'start' = 'stop'
  wantToStop: boolean = false
  events: BlockchainNetworkEvent[] = []

  constructor(name: string) {
    this.name = name
  }

  /**
   * Add a node to the network
   * @param  {BlockchainNode[]} ...nodes - The nodes to add
   */
  addNode(...nodes: BlockchainNode[]) {
    this.nodes.push(...nodes)
  }

  /**
   * Start the network
   */
  start() {
    const runUpdater = async () => {
      const isStop = await this.update()
      if (isStop === false || this.wantToStop === true) {
        this.status = 'stop'
      } else {
        this.intervalTime = setTimeout(runUpdater, this.intervalDelay)
      }
    }
    console.log(`[${this.name}] starting network...`)
    this.wantToStop = false
    this.status = 'start'
    console.log(`[${this.name}] network started!`)
    runUpdater()
    this.emit('network:start')
  }

  /**
   * Stop the network
   */
  async stop() {
    console.log(`[${this.name}] stopping network...`)
    this.wantToStop = true
    if (this.intervalTime) clearInterval(this.intervalTime)
    this.intervalTime = undefined
    while (this.status === 'start') {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    console.log(`[${this.name}] network stopped!`)
  }

  /**
   * This is the main update function for the network logic
   */
  async update() {
    const { nodes } = this
    if (this.wantToStop) return false

    // update
    await this.emit('network:update')

    // sync nodes
    await this.emit('nodes:sync')
    for (const node of nodes) {
      if (this.wantToStop) return false
      await this.emit('node:sync:start', node)
      await node.sync()
      await this.emit('node:sync:finish', node)
    }

    return true
  }

  emit(eventKey: string, ...args: any[]) {
    this.events
      .filter((event) => event.key === eventKey)
      .forEach((event) => event.handler(...args))
  }

  /**
   * Add an event listener to the network
   * @param  {string} eventKey
   * @param  {(...args:any[])=>void} handler
   */
  on(eventKey: string, handler: (...args: any[]) => void) {
    this.events.push({ key: eventKey, handler })
  }

  /**
   * Remove an event listener from the network
   * @param  {string} eventKey
   * @param  {(...args:any[])=>void} handler
   */
  off(eventKey: string, handler: (...args: any[]) => void) {
    this.events = this.events.filter(
      (event) => event.key !== eventKey || event.handler !== handler
    )
  }
}
