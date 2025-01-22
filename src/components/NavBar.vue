<template>
  <VAppBar title="Gestión de dominios">
    <template #append>
      <VBtn 
        v-if="autenticado"
        icon="mdi-logout"
        color="error"
        variant="tonal"
        class="me-3"
        @click="autenticacionStore.cerrarSesion()"
      />
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import { useAutenticacionStore } from '@/stores';
import { storeToRefs } from 'pinia';

const autenticacionStore = useAutenticacionStore()
const {autenticado} = storeToRefs(autenticacionStore)
</script>

<style scoped>

</style>