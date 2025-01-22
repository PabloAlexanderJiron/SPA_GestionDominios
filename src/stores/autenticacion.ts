import type { IUsuario } from "@/types";
import { defineStore } from "pinia";
import { useGlobalUIStore } from "./globalUI";
import { axiosAPI } from "@/utils";
import router from "@/router";
import { useErrorStore } from "./error";

interface IState{
  usuario: IUsuario | null,
  JWT: string | null
}

const URL = "auth/autenticacion/"

export const useAutenticacionStore = defineStore('autenticacionStore',{
  state:():IState=>({
    JWT: null,
    usuario: null
  }),
  actions:{
    async login(body: {email: string, password: string}){
      const globalUIStore = useGlobalUIStore()
      const errorStore = useErrorStore()
      try {
        globalUIStore.mostrarSpinner()
        const respuesta = await axiosAPI.post(URL+'iniciar-sesion',body);
        const {usuario, jwt} = respuesta.data;
        this.JWT = jwt
        this.usuario = usuario;
        await router.push('/app')
      } catch (error:any) {     
        errorStore.manejarError(error)
      }finally{
        globalUIStore.ocultarSpinner()
      }
    },
    async loginConJWT(){
      if(!this.JWT) return
      const globalUIStore = useGlobalUIStore()
      const errorStore = useErrorStore()
      try {
        globalUIStore.mostrarSpinner()
        const respuesta = await axiosAPI.get(URL+'iniciar-sesion-jwt');
        const {usuario, jwt} = respuesta.data;
        this.JWT = jwt
        this.usuario = usuario;
      } catch (error:any) {     
        errorStore.manejarError(error)
      }finally{
        globalUIStore.ocultarSpinner()
      }
    },
    async registrarse(body: {nombreCompleto: string, email: string, password: string}){
      const globalUIStore = useGlobalUIStore()
      const errorStore = useErrorStore()
      try {
        globalUIStore.mostrarSpinner()
        const respuesta = await axiosAPI.post(URL+'registrarse',body);
        const {usuario, jwt} = respuesta.data;
        this.JWT = jwt
        this.usuario = usuario;
        await router.push('/')
      } catch (error:any) {     
        this.cerrarSesion();
        errorStore.manejarError(error)
      }finally{
        globalUIStore.ocultarSpinner()
      }
    },
    async cerrarSesion(){
      this.usuario = null;
      this.JWT = null;
      await router.replace('/')
    },
  },
  getters:{
    autenticado(state){
      return !!state.usuario
    }
  },
  persist:{
    pick:['JWT']
  }
})