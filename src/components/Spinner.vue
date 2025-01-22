<template>
  <VDialog 
    :model-value="spinner.mostrar"
    max-width="450"
    persistent
  >
    <VList
      elevation="5"
    >
      <VListItem
        prepend-icon="mdi-robot"
        :title="spinner.mensaje!"
      />
    </VList>
  </VDialog>
</template>

<script setup lang="ts">
import { useGlobalUIStore } from '@/stores';
import { storeToRefs } from 'pinia';

const globalUIStore = useGlobalUIStore()
const {spinner} = storeToRefs(globalUIStore)
</script>

<style scoped>

</style>