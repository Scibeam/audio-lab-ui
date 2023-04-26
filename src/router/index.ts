import {createRouter, createWebHistory} from 'vue-router'

import AudioPeakDetection from '@/projects/audio-peak-detection/Main.vue'
import SonicSignatures from '@/projects/sonic-signatures/Main.vue'
import Main from '@/views/Main.vue'

export const Routes:Enum = {
  AudioPeakDetection: '/projects/audio-peak-detection',
  SonicSignatures: '/projects/sonic-signatures'
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: Main
  }, {
    path: Routes.AudioPeakDetection,
    component: AudioPeakDetection
  }, {
    path: Routes.SonicSignatures,
    component: SonicSignatures
  }]
})
