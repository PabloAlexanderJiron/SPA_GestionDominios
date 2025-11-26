<template>
  <VCard>
    <VCardText class="px-6 pt-8">
      <VCardTitle class="text-center text-h5">
        {{ licenciaActual ? 'Editar':'Agregar' }} licencia
      </VCardTitle>
      <VForm
        @submit.prevent="procesarFormulario" 
        :readonly="cargando"
        ref="form"
        class="mt-7">
        <ErrorAlert
          class="my-5"
        />
        <VTextField 
          label="Nombre de la licencia"
          maxLenght="100"
          class="mb-2"
          v-model="campos.nombre"
          :rules="reglas.campoObligatorio"
        />
        <VSelect
          v-model="campos.tipo"
          label="Tipo"
          :items="Object.keys(NombresPorTipoLicencia).map((x) => ({nombre: NombresPorTipoLicencia[Number(x) as TiposLicencia], valor:+x}))"
          itemTitle="nombre"
          itemValue="valor"
          class="mb-2"
          clearable
        />
        <VTextField 
          label="Proveedor"
          maxLenght="100"
          class="mb-2"
          v-model="campos.proveedor"
          :rules="reglas.campoObligatorio"
        />
        <TextFieldDateTime 
          v-model="campos.fechaCompra"
          label="Fecha de compra"
          class="mb-2"
          :rules="reglas.campoObligatorio"
        />
        <TextFieldDateTime 
          v-model="campos.fechaRenovacion"
          label="Fecha de renovacion"
          class="mb-2"
          :rules="reglas.campoObligatorio"
        />
        <VTextField 
          type="number"
          label="Precio de compra"
          class="mb-2"
          v-model.number="campos.precio"
          :rules="reglas.campoObligatorio"
        />
        <VRow dense>
          <VCol cols="auto">
            <VSwitch 
              v-model="campos.incluyeSoporte"
              label="Incluye soporte"
              hideDetails
              color="primary"
            />
          </VCol>
          <VFadeTransition>
            <VCol v-show="campos.incluyeSoporte" cols="8">
              <VTextField 
                label="Email soporte"
                maxLenght="100"
                class="mb-2"
                v-model="campos.emailSoporte"
              />
            </VCol>
          </VFadeTransition>
        </VRow>
        <VBtn 
          class="mt-5"
          color="primary"
          block
          type="submit"
          :loading="cargando"
        >
          Guardar
        </VBtn>
        <VBtn 
          class="mt-2"
          color="error"
          variant="tonal"
          block
          :readonly="cargando"
          @click="licenciaStore.cerrarFormulario()"
        >
          Cancelar
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import TextFieldDateTime from './TextFieldDateTime.vue';
import ErrorAlert from './ErrorAlert.vue';
import { NombresPorTipoLicencia, TiposLicencia, useLicenciaStore } from '@/stores';

const licenciaStore = useLicenciaStore()
const {licenciaActual} = storeToRefs(licenciaStore)
const campos = reactive<{
  nombre: string | null
  tipo: TiposLicencia | null
  proveedor: string | null
  fechaCompra: string | null
  fechaRenovacion: string | null
  precio: number,
  incluyeSoporte: boolean
  emailSoporte: string | null
}>({
  nombre: null,
  tipo: null,
  proveedor: '',
  fechaCompra: null,
  fechaRenovacion: null,
  precio: 0,
  incluyeSoporte: false,
  emailSoporte: null
})
const form = ref<VForm | null>(null);
const reglas = {
  campoObligatorio: [(v:string) => !!v || 'Campo requerido']
}
const cargando = ref(false)


const procesarFormulario = async()=>{
  const {valid} = await form.value!.validate()
  cargando.value = true
  if(valid){}
    licenciaActual.value ? 
      await licenciaStore.actualizarLicencia({
        id: licenciaActual.value.id,
        nombre: campos.nombre!,
        proveedor: campos.proveedor!,
        fechaCompra: campos.fechaCompra!,
        fechaRenovacion: campos.fechaRenovacion!,
        precio: campos.precio!,
        incluyeSoporte: campos.incluyeSoporte,
        emailSoporte: campos.incluyeSoporte ? campos.emailSoporte : null,
        tipo: campos.tipo!
      }) :
      await licenciaStore.crearLicencia({
        nombre: campos.nombre!,
        proveedor: campos.proveedor!,
        fechaCompra: campos.fechaCompra!,
        fechaRenovacion: campos.fechaRenovacion!,
        precio: campos.precio!,
        incluyeSoporte: campos.incluyeSoporte,
        emailSoporte: campos.incluyeSoporte ? campos.emailSoporte : null,
        tipo: campos.tipo!
      })
  cargando.value = false
}

onMounted(()=>{
  if(licenciaActual.value){
    campos.nombre = licenciaActual.value.nombre
    campos.tipo = licenciaActual.value.tipo
    campos.proveedor = licenciaActual.value.proveedor
    campos.precio = licenciaActual.value.precio
    campos.fechaCompra = licenciaActual.value.fechaCompra
    campos.fechaRenovacion = licenciaActual.value.fechaRenovacion
    campos.incluyeSoporte = licenciaActual.value.incluyeSoporte
    campos.emailSoporte = licenciaActual.value.emailSoporte

  }
})
</script>

<style scoped>

</style>