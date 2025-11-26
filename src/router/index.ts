import { useAutenticacionStore, useErrorStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children:[
        {
          path:'',
          name: 'Login',
          component: () => import('@/views/autenticacion/LoginView.vue'),
        },
        {
          path:'registro',
          name: 'Registro',
          component: () => import('@/views/autenticacion/RegistroView.vue'),
        }
      ]
    },
    {
      path: '/app',
      meta:{
        protegida: true
      },
      children:[
        { 
          path: '',
          redirect:{name:'DominioRoute'}
        },
        { 
          path: 'dominio',
          component: ()=> import('@/views/app/DominioView.vue'),
          name:'DominioRoute'
        },
        { 
          path: 'licencia',
          component: ()=> import('@/views/app/LicenciaView.vue'),
          name: 'LicenciaRoute'
        }
      ]
    }
  ],
})

router.beforeEach(async(to,from,next)=>{
  useErrorStore().restablecer()
  const autenticacionStore = useAutenticacionStore()
  const {JWT, autenticado} = storeToRefs(autenticacionStore)
  if(to.meta?.protegida && !autenticado.value){
    await autenticacionStore.loginConJWT()
    autenticado.value ? next(to.path) : next()
  }else if(!to.meta?.protegida && !autenticado.value && JWT.value){
    await autenticacionStore.loginConJWT()
    autenticado.value ? next('/app') : next()
  }else if(!to.meta?.protegida && autenticado.value){
    next('/app')
  }else{
    next()
  }
})

export default router
