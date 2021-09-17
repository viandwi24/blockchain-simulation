<template>
  <div class="panel-log flex flex-col bg-gray-700">
    <div class="px-4 panel-log-header bg-gray-800 text-gray-100">
      <span>Log</span>
    </div>
    <div class="panel-log-body max-h-full overflow-y-auto px-4 py-2 text-sm text-gray-200" style="height: 60px;">
      <div v-for="(log, i) in logs" :key="i">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive } from "@nuxtjs/composition-api";
import Log from '../lib/log'

export default defineComponent({
  setup() {
    const { initDragable } = usePanelDragable();

    //
    const logs = reactive([])
    Log.addListener(function (e) {
      logs.push(e)
      setTimeout(() => {
        const body = document.querySelector('.panel-log-body')
        body.scrollTop = body.scrollHeight
      })
    })

    onMounted(initDragable)

    return {
      logs
    }
  }
})

function usePanelDragable() {
  let pos;
  let panel;
  let panelHeader;

  const initDragable = () => {
    setTimeout(() => {
      panel = document.querySelector('.panel-log');
      panelHeader = document.querySelector('.panel-log-header');
      pos = 0
      panelHeader.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    }, 500)
  }

  const checkScrollBar = (element, dir) => {
    dir = (dir === 'vertical') ? 'scrollTop' : 'scrollLeft'
    let res = !! element[dir]
    if (!res) {
      element[dir] = 1
      res = !!element[dir]
      element[dir] = 0
    }
    return res
  }

  const onMouseDown = (e) => {
    if (!checkScrollBar(document.querySelector('.screen'), 'vertical')) {
      pos = e.x;
      document.addEventListener("mousemove", resize, false);
    }
  }
  const onMouseUp = () => {
    document.removeEventListener("mousemove", resize, false);
  }
  const resize = (e) => {
    const dy = pos - e.y;
    pos = e.y
    if (panel && panel instanceof HTMLElement) {
      let res = (parseInt(getComputedStyle(panel, '').height) + dy)
      if (res < 60) res = 60
      panel.style.height = res + 'px'
    }
  }

  return {
    initDragable,
    checkScrollBar
  }
}
</script>

<style lang="scss" scoped>
.panel-log {
  div:nth-child(1) {
    cursor: ns-resize;
    user-select: none;
    span {
      user-select: none
    }
  }
}
</style>
