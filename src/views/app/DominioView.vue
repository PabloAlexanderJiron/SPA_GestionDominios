<template>
  <VContainer class="mt-5">
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>
            Dominios
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VBtn 
              icon="mdi-plus"
              class="mb-3"
              @click="dominioStore.abrirFormulario()"
            />
            <VRow>
              <VCol>
                <TablaDominio />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog
      :model-value="mostrarFormulario"
      persistent
      max-width="450"
    >
      <FormDominio />
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import FormDominio from '@/components/FormDominio.vue';
import TablaDominio from '@/components/TablaDominio.vue';
import { useDominioStore } from '@/stores/dominio';
import { storeToRefs } from 'pinia';

const dominioStore = useDominioStore()
const {mostrarFormulario} = storeToRefs(dominioStore)
</script>

<style scoped>

</style>