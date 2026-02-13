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
      <template #item.estado="{item}">
        <VIcon 
          :color="dominiosOnline.find(x => x.id === item.id)?.online ? 'success' : dominiosOnline.find(x => x.id === item.id) === undefined ? 'secondary':'error'"
          icon="mdi-circle"
        />
      </template>
      <template #item.vigencia="{ item }">
        <VChip
          :color="obtenerColorVigencia(item.fechaRenovacion)"
          variant="flat"
          size="small"
        >
          {{ obtenerTextoVigencia(item.fechaRenovacion) }}
        </VChip>
      </template  mplate>

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
import axios from 'axios';
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
  {title: 'Online', key:'estado', sortable: true },
  {title: 'Vigencia', key:'vigencia', sortable: true },
  { title: 'Acciones', key:'acciones', sortable: false},
]
const dominiosOnline = ref<{id:number, online:boolean}[]>([])

const eliminarDominio = async(id: number, cerrar:Function)=>{
  eliminando.value = true
  await dominioStore.elminarDominio(id)
  eliminando.value = false
  if(!useErrorStore().mensaje){
    cerrar()
  }
}

const verificarDominioOnline = async(dominio:string)=>{
  try {
    const respuesta = await axios.get(`https://dns.google.com/resolve?name=${dominio}`)
    return respuesta.data.Status === 0
  } catch (error) {
    console.log(error);
  }
  return false
}

onMounted(async()=>{
  cargando.value = true
  await dominioStore.obtenerDominios()
  cargando.value = false
  for (let i = 0; i < dominios.value.length; i++) {
    const estado = await verificarDominioOnline(dominios.value[i].direccion)
    dominiosOnline.value.push({
      id: dominios.value[i].id,
      online: estado
    })
  }
})

const obtenerTextoVigencia = (fechaRenovacion: string) => {
  const hoy = moment().startOf('day')
  const fecha = moment(fechaRenovacion).startOf('day')

  const diferencia = fecha.diff(hoy, 'days')

  if (diferencia < 0) {
    return 'Vencido'
  }

  if (diferencia < 7) {
    return 'Por vencer'
  }

  return 'Activo'
}

const obtenerColorVigencia = (fechaRenovacion: string) => {
  const hoy = moment().startOf('day')
  const fecha = moment(fechaRenovacion).startOf('day')

  const diferencia = fecha.diff(hoy, 'days')

  if (diferencia < 0) {
    return 'error'   // rojo
  }

  if (diferencia < 7) {
    return 'warning' // amarillo
  }

  return 'success'   // verde
}

</script>

<style scoped>

</style>