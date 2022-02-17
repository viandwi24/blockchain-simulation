<template>
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
    <Body
      class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900"
    >
      <NuxtLayout>
        <NuxtPage v-if="bodyStateShow" />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
import { AppSetup } from './utils/app'
import { ITheme } from './utils/theme'
import { networks } from '~/stores/blockchain'
AppSetup()
const { bodyStateShow } = useForceUpdate()
const theme = useState<ITheme>('theme.current')
const locale = useState<string>('locale.setting')

onBeforeUnmount(() => {
  for (const network of networks) {
    network.stop()
  }
})
</script>
