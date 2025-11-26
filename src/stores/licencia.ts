import { defineStore } from "pinia";
import { useErrorStore } from "./error";
import { axiosAPI } from "@/utils";

interface IState{
  licencias: ILicencia[]
  mostrarFormulario: boolean,
  licenciaActual: ILicencia | null
}

const URL_LICENCIA = 'dominio/licenciaSoftware'

export const useLicenciaStore = defineStore('licenciaStore',{
  state:():IState=>({
    licencias: [],
    mostrarFormulario: false,
    licenciaActual: null
  }),
  actions:{
    async obtenerLicencias(){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.get(URL_LICENCIA);
        this.licencias = respuesta.data;
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async crearLicencia(body:Omit<ILicencia,"id">){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.post(URL_LICENCIA, body);
        this.licencias.push(respuesta.data);
        this.cerrarFormulario()
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async actualizarLicencia(body:ILicencia){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        const respuesta = await axiosAPI.patch(URL_LICENCIA, body);
        this.licencias = this.licencias.map(x => x.id === body.id ? respuesta.data : x);
        this.cerrarFormulario()
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    async elminarLicencia(id: number){
      const errorStore = useErrorStore()
      try {
        errorStore.restablecer()
        await axiosAPI.delete(`${URL_LICENCIA}/${id}`);
        this.licencias = this.licencias.filter(x => x.id !== id);
      } catch (error:any) {     
        errorStore.manejarError(error)
      }
    },
    abrirFormulario(dominio?:ILicencia){
      this.licenciaActual = dominio ?? null
      this.mostrarFormulario = true
    },
    cerrarFormulario(){
      this.licenciaActual =  null
      this.mostrarFormulario = false
    }
  }
})

export enum TiposLicencia{
  Suscripcion, CapaGratuita, PorUsuario
}

export const NombresPorTipoLicencia:{[key in TiposLicencia]: string} = {
  [TiposLicencia.CapaGratuita]:"Capa gratuita",
  [TiposLicencia.PorUsuario]:"Por usuario",
  [TiposLicencia.Suscripcion]:"Suscripcion",
}

export interface ILicencia{
  id: number
  nombre: string
  tipo: TiposLicencia
  proveedor: string
  fechaCompra: string
  precio: number
  fechaRenovacion: string
  incluyeSoporte: boolean
  emailSoporte: string | null
}
