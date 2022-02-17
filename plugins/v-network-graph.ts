import VNetworkGraph from 'v-network-graph'

export default defineNuxtPlugin((nuxtApp) => {
  try {
    nuxtApp.vueApp.use(VNetworkGraph)
  } catch (err) {
    console.error(err)
  }
})
