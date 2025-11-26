<template>
  <VContainer class="mt-5">
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>
            Licencias de software
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VRow dense justify="space-around" align="center">
              <VCol>
                <VBtn 
                  icon="mdi-plus"
                  class="mb-3"
                  @click="licenciaStore.abrirFormulario()"
                />
              </VCol>
              <VCol cols="auto">
                <VBtn 
                  text="Exportar"
                  prepend-icon="mdi-microsoft-excel"
                  @click="exportaExcel"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <TablaLicencia />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VDialog
      :model-value="mostrarFormulario"
      persistent
      max-width="550"
    >
      <FormLicencia />
    </VDialog>
  </VContainer>
</template>

<script setup lang="ts">
import FormLicencia from '@/components/FormLicencia.vue';
import TablaLicencia from '@/components/TablaLicencia.vue';
import { NombresPorTipoLicencia, useLicenciaStore } from '@/stores';
import moment from 'moment';
import { storeToRefs } from 'pinia';
import * as XLSX from "xlsx";


const licenciaStore = useLicenciaStore()
const {mostrarFormulario, licencias} = storeToRefs(licenciaStore)

const exportaExcel = ()=>{
  const archivo = XLSX.utils.book_new()
  const data = XLSX.utils.aoa_to_sheet([
    ["Id","Nombre","Proveedor","Tipo","Fecha compra", "Fecha renovacion","Precio","Email soporte"],
    ...licencias.value.map(x => [x.id, x.nombre, NombresPorTipoLicencia[x.tipo], x.proveedor, moment(x.fechaCompra).format('DD-MM-yyyy'), moment(x.fechaRenovacion).format('DD-MM-yyyy'), x.precio, x.emailSoporte])
  ])
  XLSX.utils.book_append_sheet(archivo, data,"reporte")
  XLSX.writeFileXLSX(archivo, `Licencia de software${Date.now()}.xlsx`)
}
</script>

<style scoped>

</style>