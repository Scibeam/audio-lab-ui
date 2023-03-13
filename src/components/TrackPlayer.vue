<script setup lang='ts'>
import {ref, watch} from 'vue'
import {Player} from 'tone'
import tracks from '@/assets/data/tracks.json'
import TrackList from '@/components/TrackList.vue'
import Waveform from '@/components/Waveform.vue'

let audioData = ref(null)
const player = new Player()
const trackListHeader = [
  'Artist',
  'Song'
]

const currentTrack = ref(null)
watch(currentTrack, () => {
  const track = currentTrack.value
  if(track) {
    const filePath = `/audio/${track.file}`
    player.load(filePath)
      .then(() => {
        audioData.value = player.buffer.toArray()
      })
  }
})
</script>

<template>
  <v-card
    class='d-flex flex-column'>
    <v-card-text>
      <Waveform
        :data='audioData'
        class='waveform mb-4'/>
      <TrackList
        v-model:selectedTrack='currentTrack'
        :header='trackListHeader'
        :tracks='tracks'/>
    </v-card-text>
  </v-card>
</template>

<style lang='sass' scoped>
.waveform
  border: 1px solid rgb(var(--v-theme-primary))
  border-radius: 0.25em
  overflow: hidden
</style>
