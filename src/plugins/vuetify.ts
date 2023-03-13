import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {aliases, fa} from 'vuetify/iconsets/fa'
import '@fortawesome/fontawesome-free/css/all.css'

import {scibeamThemeDark, scibeamThemeLight} from '@/utils/colors'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa
    }
  },
  theme: {
    defaultTheme: 'scibeamThemeDark',
    themes: {
      scibeamThemeDark,
      scibeamThemeLight
    }
  }
})
