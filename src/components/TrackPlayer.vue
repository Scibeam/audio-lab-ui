<script setup lang='ts'>
import {
  ref,
  watch
} from 'vue'

import {Player} from 'tone'
import tracks from '@/assets/data/tracks.json'
import {compactForWaveformVis} from '@/audio/compact.ts'
import Canvas from '@/components/Canvas.vue'
import TrackList from '@/components/TrackList.vue'
import {ToneAudioBuffer} from 'tone'
import {pea} from '@/utils/colors.ts'
import WaveformRendering from '@/utils/rendering/waveform.ts'

///////////////////////////////////////////////////////////////////////////////
//
// Props & Vars
//
///////////////////////////////////////////////////////////////////////////////

const audioData = ref(new ToneAudioBuffer())
const currentTrack = ref(null)
const player = new Player()
const trackListHeader = [
  'Artist',
  'Song'
]
const waveform = ref(null)

///////////////////////////////////////////////////////////////////////////////
//
// Event Handlers
//
///////////////////////////////////////////////////////////////////////////////

const onCanvasResize = () => {
  drawWaveform()
}

///////////////////////////////////////////////////////////////////////////////
//
// Methods
//
///////////////////////////////////////////////////////////////////////////////

const drawWaveform = () => {
  if(!audioData.value.length) return

  const canvas = waveform.value.$refs.canvas
  const ctx = canvas.getContext('2d')
  const width = Math.floor(canvas.clientWidth)
  const height = Math.floor(canvas.clientHeight)
  compactForWaveformVis({
    channels: audioData.value.toArray(),
    skipFrames: 1024,
    width
  }).then(result => {
    WaveformRendering.amplitudes({
      color: pea,
      ctx,
      x: 0,
      y: 0,
      height,
      data: result.data
    })
  })
}

///////////////////////////////////////////////////////////////////////////////
//
// Watchers
//
///////////////////////////////////////////////////////////////////////////////

watch(currentTrack, () => {
  const track = currentTrack.value
  if(track) {
    const filePath = `/audio/${track.file}`
    player.load(filePath)
      .then(() => {
        audioData.value = new ToneAudioBuffer(player.buffer)
        drawWaveform()
      })
  }
})
</script>

<template>
  <v-card
    class='d-flex flex-column'>
    <v-card-text>
      <Canvas
        ref='waveform'
        @resize='onCanvasResize'
        :buffer='audioData'
        :height='64'
        :padding='4'
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
