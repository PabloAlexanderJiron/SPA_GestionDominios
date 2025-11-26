<template>
  <VApp>
    <NavBar />
    <VMain>
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
        v-if="autenticado"
      >
        <v-list nav>
          <v-list-item prepend-icon="mdi-web" title="Dominio" :to="{name:'DominioRoute'}"></v-list-item>
          <v-list-item prepend-icon="mdi-invoice-list-outline" title="Licencias" :to="{name:'LicenciaRoute'}"></v-list-item>
        </v-list>
      </v-navigation-drawer>
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
      text="PRUEBAS"
    />
  </VApp>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue';
import Spinner from './components/Spinner.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAutenticacionStore } from './stores';

const modoDesarrollo = computed(()=> import.meta.env.MODE === 'development')
const {autenticado} = storeToRefs(useAutenticacionStore())
</script>

<style scoped>

</style>
