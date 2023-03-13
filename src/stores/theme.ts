import {computed} from 'vue'
import {defineStore} from 'pinia'
import {useTheme} from 'vuetify'

export default defineStore('theme', () => {
  const theme = useTheme()
  const toggle_dark_mode = () =>  {
    theme.global.name.value =
      theme.global.current.value.dark ? 'light' : 'dark'
  }

  const is_dark = computed(
    () => theme.global.name.value === 'dark'
  )
  return {is_dark, toggle_dark_mode}
})
