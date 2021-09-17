const logs = []
const listeners = []

const Log = {
  // ...logs,
  add(...args) {
    logs.push(args);
    listeners.forEach(listener => listener(...args))
  },
  addListener(callback = () => {}) {
    listeners.push(callback)
    logs.forEach(args => {
      // eslint-disable-next-line node/no-callback-literal
      callback(...args)
    })
  }
  // clear() {
  //   logs.splice(0, logs.length);
  // },
  // get() {
  //   return logs;
  // }
}

module.exports = Log
