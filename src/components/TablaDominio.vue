<template>
  <VCard
    elevation="3"
  >
    <VDataTable
      :items="dominios"
      no-data-text="No hay dominios"
      :loading="cargando"
      :headers="cabecera"
      multi-sort
    >
      <template #item.fechaCompra="{item}">
        {{ moment(item.fechaCompra).format('DD-MM-yyyy') }}
      </template>
      <template #item.fechaRenovacion="{item}">
        {{ moment(item.fechaRenovacion).format('DD-MM-yyyy') }}
      </template>
      <template #item.precio="{item}">
        $ {{ item.precio }}
      </template>
      <template #item.acciones="{item}">
        <VBtn 
          icon="mdi-pencil"
          variant="text"
          color="warning"
          class="me-2"
          @click="dominioStore.abrirFormulario(item)"
        />
        <VDialog
          max-width="450"
        >
          <template #activator="{props}">
            <VBtn
              icon="mdi-delete"
              variant="text"
              v-bind="props"
              color="error"
            />
          </template>
          <template #="{isActive}">
            <VCard
              :loading="eliminando"
            >
              <VCardTitle>Eliminar dominio</VCardTitle>
              <VCardText>
                ¿Estas seguro de eliminar el dominio '{{ item.direccion }}'?
              </VCardText>
              <VCardActions>
                <VBtn 
                  text="Cancelar"
                  variant="tonal"
                  class="me-2"
                  color="error"
                  :readonly="eliminando"
                  @click="isActive.value = false"
                />
                <VBtn 
                  text="Confirmar"
                  variant="elevated"
                  :readonly="eliminando"
                  @click="eliminarDominio(item.id, ()=> isActive.value = false)"
                />
              </VCardActions>
            </VCard>
          </template>
        </VDialog>
      </template>
    </VDataTable>
  </VCard>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores';
import { useDominioStore } from '@/stores/dominio';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';


const dominioStore = useDominioStore()
const {dominios} = storeToRefs(dominioStore)
const cargando = ref(false)
const eliminando = ref(false)
const cabecera = [
  {title: 'Dirección dominio', value:'direccion', sortable: true },
  {title: 'Proveedor', value:'proveedor', sortable: true },
  {title: 'Fecha de compra', value:'fechaCompra', sortable: true },
  {title: 'Fecha de renovación', value:'fechaRenovacion', sortable: true },
  {title: 'Precio', value:'precio', sortable: true },
  { title: 'Acciones', key:'acciones', sortable: false},
]

const eliminarDominio = async(id: number, cerrar:Function)=>{
  eliminando.value = true
  await dominioStore.elminarDominio(id)
  eliminando.value = false
  if(!useErrorStore().mensaje){
    cerrar()
  }
}

onMounted(async()=>{
  cargando.value = true
  await dominioStore.obtenerDominios()
  cargando.value = false
})
</script>

<style scoped>

</style>