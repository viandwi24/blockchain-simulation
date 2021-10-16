<template>
  <div class="screen-loader">
    <lottie
      :width="animationWidth"
      :height="animationHeight"
      :options="animationOption"
      @animCreated="animationHandle"
      />
    <div class="loader-text">
      <div>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationLoader from '@/static/blockchain.json'

export default defineComponent({
  components: {
    lottie
  },
  setup() {
    const animation = ref(null)
    const animationWidth = ref(0)
    const animationHeight = ref(0)
    const animationOption = {
      animationData: animationLoader.default
    }
    const animationHandle = (anim) => {
      animation.value = anim
    }

    onMounted(() => {
      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight
      animationWidth.value = screenWidth
      animationHeight.value = screenHeight
    })

    return {
      animationOption,
      animationHandle,
      animationLoader,
      animationWidth,
      animationHeight,
    }
  },
})
</script>


<style lang="scss">
body {
  overflow: hidden;
  background: #3989FF;
}
.screen-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120vw;
  height: 120vh;
}
.loader-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  div {
    background: white;
    margin-bottom: 1rem;
    padding: .25rem 1rem;
    border-radius: .25rem;
  }
}
</style>
