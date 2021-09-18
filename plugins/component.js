import Vue from 'vue'
import { computed } from '@nuxtjs/composition-api'
import VueShepherd from 'vue-shepherd'

Vue.use(VueShepherd)

export default ({ app, i18n }, inject) => {
  inject('sleep', ms => new Promise(resolve => setTimeout(resolve, ms)))
  inject('dayjs', require('dayjs'))
  inject('t', message => {
    const locale = computed(() => {
      return i18n.t(message)
    })
    return (locale.value)
  })
}
