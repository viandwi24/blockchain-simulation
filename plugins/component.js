import dayjs from "dayjs"

export default ({ app }, inject) => {
  inject('sleep', ms => new Promise(resolve => setTimeout(resolve, ms)))
  inject('dayjs', dayjs)
}
