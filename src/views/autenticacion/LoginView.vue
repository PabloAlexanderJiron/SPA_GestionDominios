<template>
  <VContainer fluid>
    <VRow justify="center" align="center" style="height: 90vh;">
      <VCol cols="12" sm="7" md="5" lg="4">
        <VCard elevation="5">
          <VCardText class="px-6 pt-8">
            <VCardTitle class="text-center text-h5">
              Login
            </VCardTitle>
            <VCardSubtitle class="text-center">
              Hola, bienvenido al sistema...
            </VCardSubtitle>

            <!-- Formulario -->
            <VForm
              @submit.prevent="procesarFormulario"
              ref="form"
              :readonly="cargando"
              class="mt-7"
            >
              <!-- Mensaje de error general -->
              <ErrorAlert class="my-5" />

              <!-- Campo Email -->
              <VTextField
                v-model="campos.email"
                type="email"
                label="Email"
                :rules="reglas.email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                clearable
              />

              <!-- Campo Contraseña -->
              <TextFieldPassword
                v-model="campos.password"
                label="Contraseña"
                prepend-inner-icon="mdi-lock-outline"
                class="mt-5"
                :rules="reglas.password"
              />

              <!-- Botón de ingreso -->
              <VBtn
                class="mt-5"
                color="primary"
                block
                type="submit"
                :loading="cargando"
              >
                INGRESAR
              </VBtn>
            </VForm>
          </VCardText>

          <VCardActions class="d-flex justify-center pt-0">
            <RouterLink :to="{ name: 'Registro' }">
              ¿No tienes una cuenta? ¡Regístrate!
            </RouterLink>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import ErrorAlert from '@/components/ErrorAlert.vue'
import TextFieldPassword from '@/components/TextFieldPassword.vue'
import { useAutenticacionStore } from '@/stores'
import { reactive, ref } from 'vue'
import type { VForm } from 'vuetify/components'

const autenticacionStore = useAutenticacionStore()

const campos = reactive({
  email: '',
  password: ''
})

const form = ref<VForm | null>(null)
const cargando = ref(false)

/* Reglas de validación */
const reglas = {
  email: [
    (v: string) => !!v || 'El campo Email es obligatorio.',
    (v: string) =>
      /.+@.+\..+/.test(v) || 'Por favor ingresa un correo electrónico válido.'
  ],
  password: [
    (v: string) => !!v || 'La contraseña es obligatoria.',
    (v: string) =>
      v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres.'
  ]
}

/* Lógica de envío */
const procesarFormulario = async () => {
  const { valid } = await form.value!.validate()
  if (!valid) return

  cargando.value = true
  try {
    await autenticacionStore.login(campos)
  } catch (error) {
    console.error('Error al iniciar sesión:', error)
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
.v-messages__message {
  font-size: 0.85rem;
  color: #c62828; /* rojo amigable para errores */
}
</style>
