import { defineStore } from "pinia";

interface IState{
  spinner:{
    mostrar: boolean
    mensaje: string | null
  }
}

export const useGlobalUIStore = defineStore('globalUIStore',{
  state: ():IState=>({
    spinner:{
      mostrar: false,
      mensaje: null
    },
  }),
  actions:{
    mostrarSpinner(optiones?:{mensaje?: string}){
      this.spinner.mostrar = true
      this.spinner.mensaje = optiones?.mensaje ?? 'Cargando...'
    },
    ocultarSpinner(){
      this.spinner.mostrar = false
      this.spinner.mensaje = null
    }
  }
})