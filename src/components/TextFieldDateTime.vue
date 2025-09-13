<template>
  <v-menu
    v-model="mostrarDatePicker"
    :close-on-content-click="false"
  >
  <template #activator="{props}">
    <VTextField
      :model-value="fechaFormateada"
      readonly
      v-bind:="props"
      :label="label"
      append-inner-icon="mdi-calendar-range"
      :rules="rules"
      :class="$props.class"
      :density="density"
    >
      <template #clear="{props}">
        <VBtn
          density="comfortable"
          icon="mdi-close"
          size="x-small"
          color="grey-darken-1"
          @click="model = null"
          v-bind:="props"
        />
      </template>
    </VTextField>
  </template>
    <v-date-picker 
      :model-value="fechaFormateadaDatePicker"
      show-adjacent-months
      elevation="10"
      @update:model-value="(x) => seleccionarFecha(x)"  
    />
  </v-menu>
  
</template>

<script setup lang="ts">
import moment from "moment";
import { computed, ref } from "vue";

const model = defineModel<string | null>({default: null})
// defineProps({
//   label:{
//     type: String,
//     required: true
//   },
//   rules: Object as ()=> any,
//   density: {
//     type: String as ()=> 'default' | 'comfortable' | 'compact',
//     default: 'default'
//   },
//   class: String
// })
defineProps<{
  label: string
  rules?: any
  density?: 'default' | 'comfortable' | 'compact'
  "class"?: string   // 
}>()

const mostrarDatePicker = ref(false)
const fechaFormateada = computed(() => model.value ? moment(model.value).format('DD/MM/YYYY') : null)
const fechaFormateadaDatePicker = computed(() => model.value ? new Date(model.value) : null)

const seleccionarFecha = (x: unknown) => {
  model.value = x ? moment(x).toISOString() : x as string
  if(x){
    mostrarDatePicker.value = false
  }
}
</script>

<style scoped>

</style>