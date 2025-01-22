<template>
  <VTextField
    ref="input"
    v-model="model"
    :label="label"
    :class="class"
    :rules="(rules as any)"
    :type="type"
  >
    <template #append-inner>
      <VIcon 
        :icon="mostrarClave ? 'mdi-eye' : 'mdi-eye-off'" 
        @click="mostarOcultarClave"
      />
    </template>

  </VTextField>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import type { VTextField } from 'vuetify/components';

const input = ref<VTextField | null>(null)
const mostrarClave = ref(false)
const type = ref<'password'|'text'>('password')
const model = defineModel({required: true})
defineProps({
  label: {
    type: String,
    required: true
  },
  class: String,
  rules: Array
})

const mostarOcultarClave = ()=>{
  mostrarClave.value = !mostrarClave.value;
  type.value = mostrarClave.value ? 'text' : 'password'
  nextTick(() => {
    input.value?.blur()
  });
}

</script>

<style scoped>

</style>