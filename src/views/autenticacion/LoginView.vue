<template>
  <VContainer 
    fluid
  >
    <VRow justify="center" align="center" style="height: 90vh;">
      <VCol cols="12" sm="7" md="5" lg="4">
        <VCard
          elevation="5"
        >
          <VCardText class="px-6 pt-8">
            <VCardTitle class="text-center text-h5">
            Login 
            </VCardTitle>
            <VCardSubtitle class="text-center">
              Hola, bienvenido al sistema
            </VCardSubtitle>
            <VForm
              @submit.prevent="procesarFormulario" 
              ref="form"
              :readonly="cargando"
              class="mt-7">
              <ErrorAlert
                class="my-5"
              />
              <VTextField 
                type="email"
                label="Email"
                v-model="campos.email"
                :rules="reglas.campoObligatorio"
                />
              <TextFieldPassword 
                v-model="campos.password"
                label="Contraseña"
                class="mt-5"
                :rules="reglas.campoObligatorio"
              />
              <VBtn 
                class="mt-5"
                color="primary"
                block
                type="submit"
                :loading="cargando"
              >
                Ingresar
              </VBtn>
            </VForm>
          </VCardText>
          <VCardActions class="d-flex justify-center pt-0">
            <RouterLink
              :to="{name:'Registro'}"
            >
              ¿No tienes una cuenta? Registrate!
            </RouterLink>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue';
import TextFieldPassword from '@/components/TextFieldPassword.vue';
import { useAutenticacionStore } from '@/stores';
import { reactive, ref } from 'vue';
import type { VForm } from 'vuetify/components';

const autenticacionStore = useAutenticacionStore()
const campos = reactive({
  email: '',
  password: ''
})
const form = ref<VForm | null>(null);
const reglas = {
  campoObligatorio: [(v:string) => !!v || 'Campo requerido']
}
const cargando = ref(false)

const procesarFormulario = async()=>{
  const {valid} = await form.value!.validate()
  cargando.value = true
  if(valid)
    await autenticacionStore.login(campos)
  cargando.value = false
}
</script>

<style scoped>

</style>