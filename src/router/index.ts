import {createRouter, createWebHistory} from 'vue-router'

import DetectingPeaksAndTroughs from '@/views/DetectingPeaksAndTroughs.vue'
import Main from '@/views/Main.vue'

export const Routes:Enum = {
  DetectingPeaksAndTroughs: '/detecting-peaks-and-troughs-with-js'
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: Main
  }, {
    path: Routes.DetectingPeaksAndTroughs,
    component: DetectingPeaksAndTroughs
  }]
})
