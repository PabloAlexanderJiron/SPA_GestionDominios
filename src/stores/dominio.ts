import { defineStore } from "pinia";
import { useErrorStore } from "./error";
import { axiosAPI } from "@/utils";

interface IState{
  dominios: IDominio[]
  mostrarFormulario: boolean,
  dominioActual: IDominio | null
}

const URL_DOMINIO = 'dominio/dominioInternet'

export const useDominioStore = defineStore('dominioStore',{
  state:():IState=>({
    dominios: [],
    mostrarFormulario: false,
    dominioActual: null
  }),
  actions:{
    async obtenerDominios(){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.get(URL_DOMINIO);
        this.dominios = respuesta.data;
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async crearDominio(body:ICrearDominio){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.post(URL_DOMINIO, body);
        this.dominios.push(respuesta.data);
        this.cerrarFormulario()
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async actualizarDominio(body:IActualizarDominio){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.patch(URL_DOMINIO, body);
        this.dominios = this.dominios.map(x => x.id === body.id ? respuesta.data : x);
        this.cerrarFormulario()
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async elminarDominio(id: number){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        await axiosAPI.delete(`${URL_DOMINIO}/${id}`);
        this.dominios = this.dominios.filter(x => x.id !== id);
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    abrirFormulario(dominio?:IDominio){
      this.dominioActual = dominio ?? null
      this.mostrarFormulario = true
    },
    cerrarFormulario(){
      this.dominioActual =  null
      this.mostrarFormulario = false
    }
  }
})

export interface IDominio{
  id: number
  direccion: string
  proveedor: string
  fechaCompra: string
  precio: number
  fechaRenovacion: string
}

interface ICrearDominio{
  direccion: string
  proveedor: string
  fechaCompra: string
  precio: number
  fechaRenovacion: string
}

interface IActualizarDominio{
  id: number
  proveedor: string
  fechaCompra: string
  precio: number
  fechaRenovacion: string
}