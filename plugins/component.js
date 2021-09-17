import Vue from 'vue'
import VueShepherd from 'vue-shepherd'

Vue.use(VueShepherd)

export default ({ app }, inject) => {
  inject('sleep', ms => new Promise(resolve => setTimeout(resolve, ms)))
  inject('dayjs', require('dayjs'))
}
