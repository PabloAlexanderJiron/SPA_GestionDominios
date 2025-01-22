<template>
  <VCard>
    <VCardText class="px-6 pt-8">
      <VCardTitle class="text-center text-h5">
        {{ dominioActual ? 'Editar':'Agregar' }} dominio
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
          label="Direccion del dominio"
          maxLenght="200"
          class="mb-2"
          v-model="campos.direccion"
          placeholder="example.com"
          :rules="reglas.campoObligatorio"
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
          @click="dominioStore.cerrarFormulario()"
        >
          Cancelar
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { useDominioStore } from '@/stores/dominio';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import TextFieldDateTime from './TextFieldDateTime.vue';
import ErrorAlert from './ErrorAlert.vue';

const dominioStore = useDominioStore()
const {dominioActual} = storeToRefs(dominioStore)
const campos = reactive<{
  direccion: string | null
  proveedor: string | null
  fechaCompra: string | null
  fechaRenovacion: string | null
  precio: number
}>({
  direccion: '',
  proveedor: '',
  fechaCompra: null,
  fechaRenovacion: null,
  precio: 0
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
    dominioActual.value ? 
      await dominioStore.actualizarDominio({
        id: dominioActual.value.id,
        proveedor: campos.proveedor!,
        fechaCompra: campos.fechaCompra!,
        fechaRenovacion: campos.fechaRenovacion!,
        precio: campos.precio!,
      }) :
      await dominioStore.crearDominio({
        direccion: campos.direccion!,
        proveedor: campos.proveedor!,
        fechaCompra: campos.fechaCompra!,
        fechaRenovacion: campos.fechaRenovacion!,
        precio: campos.precio!,
      })
  cargando.value = false
}

onMounted(()=>{
  if(dominioActual.value){
    campos.direccion = dominioActual.value.direccion
    campos.proveedor = dominioActual.value.proveedor
    campos.precio = dominioActual.value.precio
    campos.fechaCompra = dominioActual.value.fechaCompra
    campos.fechaRenovacion = dominioActual.value.fechaRenovacion
  }
})
</script>

<style scoped>

</style>