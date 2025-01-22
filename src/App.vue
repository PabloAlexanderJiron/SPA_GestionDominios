<template>
  <VApp>
    <NavBar />
    <VMain>
      <RouterView />
    </VMain>
    <Spinner />
  </VApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import Spinner from './components/Spinner.vue';
</script>

<style scoped>

</style>
