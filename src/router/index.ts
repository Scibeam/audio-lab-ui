import {createRouter, createWebHistory} from 'vue-router'

import AudioPeakDetection from '@/projects/audio-peak-detection/Main.vue'
import Main from '@/views/Main.vue'

export const Routes:Enum = {
  AudioPeakDetection: '/audio-peak-detection'
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: Main
  }, {
    path: Routes.AudioPeakDetection,
    component: AudioPeakDetection
  }]
})
