<template>
  <VCard
    elevation="3"
  >
    <VDataTable
      :items="licencias"
      no-data-text="No hay licencias de software"
      :loading="cargando"
      :headers="cabecera"
      multi-sort
    >
      <template #item.tipo="{item}">
        {{ NombresPorTipoLicencia[item.tipo] }}
      </template>
      <template #item.fechaCompra="{item}">
        {{ moment(item.fechaCompra).format('DD-MM-yyyy') }}
      </template>
      <template #item.fechaRenovacion="{item}">
        {{ moment(item.fechaRenovacion).format('DD-MM-yyyy') }}
      </template>
      <template #item.precio="{item}">
        $ {{ item.precio }}
      </template>
      <template #item.emailSoporte="{item}">
        {{ item.emailSoporte ? item.emailSoporte : item.incluyeSoporte ? 'Si' : 'No' }}
      </template>
      <template #item.vigencia="{ item }">
        <VChip
          :color="obtenerColorVigencia(item.fechaRenovacion)"
          variant="flat"
          size="small"
        >
          {{ obtenerTextoVigencia(item.fechaRenovacion) }}
        </VChip>
      </template>

      <template #item.acciones="{item}">
        <VBtn 
          icon="mdi-pencil"
          variant="text"
          color="warning"
          class="me-2"
          @click="licenciaStore.abrirFormulario(item)"
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
              <VCardTitle>Eliminar licencia</VCardTitle>
              <VCardText>
                ¿Estas seguro de eliminar la licencia '{{ item.nombre }}'?
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
import { NombresPorTipoLicencia, useErrorStore, useLicenciaStore } from '@/stores';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';


const licenciaStore = useLicenciaStore()
const {licencias} = storeToRefs(licenciaStore)
const cargando = ref(false)
const eliminando = ref(false)
const cabecera = [
  {title: 'Dirección dominio', value:'nombre', sortable: true },
  {title: 'Tipo', value:'tipo', sortable: true },
  {title: 'Proveedor', value:'proveedor', sortable: true },
  {title: 'Fecha de compra', value:'fechaCompra', sortable: true },
  {title: 'Fecha de renovación', value:'fechaRenovacion', sortable: true },
  {title: 'Precio', value:'precio', sortable: true },
  {title: 'Soporte', value:'emailSoporte', sortable: true },
  {title: 'Vigencia', key:'vigencia', sortable: true },
  { title: 'Acciones', key:'acciones', sortable: false},
]

const eliminarDominio = async(id: number, cerrar:Function)=>{
  eliminando.value = true
  await licenciaStore.elminarLicencia(id)
  eliminando.value = false
  if(!useErrorStore().mensaje){
    cerrar()
  }
}

onMounted(async()=>{
  cargando.value = true
  await licenciaStore.obtenerLicencias()
  cargando.value = false
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
    return 'error'
  }

  if (diferencia < 7) {
    return 'warning'
  }

  return 'success'
}

</script>

<style scoped>

</style>