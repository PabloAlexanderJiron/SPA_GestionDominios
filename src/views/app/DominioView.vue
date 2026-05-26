<template>
  <VContainer class="mt-5">
    <VRow>
      <VCol>
        <VCard>
          <VCardTitle>
            Dominios Loja
          </VCardTitle>
          <VDivider />
          <VCardText>
            <VRow dense justify="space-around" align="center">
              <VCol>
                <VBtn 
                  icon="mdi-plus"
                  class="mb-3"
                  @click="dominioStore.abrirFormulario()"
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
import moment from 'moment';
import { storeToRefs } from 'pinia';
import * as XLSX from "xlsx";


const dominioStore = useDominioStore()
const {mostrarFormulario, dominios} = storeToRefs(dominioStore)

const exportaExcel = ()=>{
  const archivo = XLSX.utils.book_new()
  const data = XLSX.utils.aoa_to_sheet([
    ["Id","Dominio","Proveedor","Fecha compra", "Fecha renovacion","Precio"],
    ...dominios.value.map(x => [x.id, x.direccion, x.proveedor, moment(x.fechaCompra).format('DD-MM-yyyy'), moment(x.fechaRenovacion).format('DD-MM-yyyy'), x.precio])
  ])
  XLSX.utils.book_append_sheet(archivo, data,"reporte")
  XLSX.writeFileXLSX(archivo, `Dominios ${Date.now()}.xlsx`)
}
</script>

<style scoped>

</style>