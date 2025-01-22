import { AxiosError } from "axios";
import { defineStore } from "pinia";

interface IState{
  mensaje: string | null
}

export const useErrorStore = defineStore('error',{
  state: ():IState=>({
    mensaje: null
  }),
  actions:{
    manejarError(error: any){
      let mensaje = null;
      if(error instanceof AxiosError){
        if(error.code === AxiosError.ERR_BAD_REQUEST && error.response?.status === 400){
          mensaje = error.response?.data?.mensaje;
        }else if(error.code === AxiosError.ERR_BAD_REQUEST && error.response?.status === 404){
          mensaje = 'Recurso no encontrado, comuniquese con sistemas'
        }else if(error.code === AxiosError.ERR_NETWORK){
          mensaje = 'Problemas con su conexión a internet, verifique su conexión a la red'
        }
      }
      this.mensaje = mensaje ?? 'Ocurió un error, comuniquese con sistemas'
    },
    restablecer(){
      this.mensaje = null;
    }
  }
})