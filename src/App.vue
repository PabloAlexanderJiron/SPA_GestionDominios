<template>
  <VApp>
    <NavBar />
    <VMain>
      <RouterView />
    </VMain>
    <Spinner />
    <VFab 
      v-if="modoDesarrollo"
      prepend-icon="mdi-bug"
      color="red"
      location="top end"
      absolute
      app
      extended
      text="DESARROLLO"
    />
  </VApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import Spinner from './components/Spinner.vue';
import { computed } from 'vue';

const modoDesarrollo = computed(()=> import.meta.env.MODE === 'development')
</script>

<style scoped>

</style>
