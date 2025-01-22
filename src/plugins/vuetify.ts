import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const agregarVuetify = ()=>{
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes:{
        light: {
          dark: false,
          colors: {
            primary: '#07438C',
            'on-primary': '#fff',
            'background': '#eef2f6',
            'gradiente1':'#eef2f6',
            'gradiente2':'#e4f2fe',
          }
        },
        dark:{
          dark: true
        }
      },
    },
    defaults:{
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        hideDetails: 'auto',
      },
      VTextarea:{
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        hideDetails: 'auto',
      },
      VAutocomplete: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        hideDetails: 'auto',
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        hideDetails: 'auto',
      },
      VBtn:{
        color: "primary"
      }
    }
  })
  return vuetify
}