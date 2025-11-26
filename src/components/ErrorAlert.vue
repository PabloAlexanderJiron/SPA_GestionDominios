<template>
  <VAlert
    v-if="mensaje"
    title="Error"
    :text="mensaje"
    density="compact"
    color="error"
    variant="tonal"
  >
    <template #close>
      <VIcon
        @click="errorStore.restablecer()"
        icon="mdi-close"/>
    </template>
  </VAlert>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores';
import { storeToRefs } from 'pinia';

const errorStore = useErrorStore()
const {mensaje} = storeToRefs(errorStore)

</script>

<style scoped>

</style>