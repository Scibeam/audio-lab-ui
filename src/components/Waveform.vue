<script setup lang='ts'>
import {
  defineProps,
  onMounted,
  ref,
  watch
} from 'vue'
import {compactForWaveformVis} from '@/audio/compact.ts'
import {pea} from '@/utils/colors.js'

const props = defineProps({
  data: Array,
  height: {
    type: Number,
    default: 64
  }
})

const padding = 4
const canvas = ref(null)
const container = ref(null)

///////////////////////////////////////////////////////////////////////////////
//
// Event Handlers
//
///////////////////////////////////////////////////////////////////////////////

const onContainerResize = () => {
  const rect = container.value.getBoundingClientRect()
  const width = Math.floor(rect.width - padding * 2)
  const height = Math.floor(rect.height - padding * 2)
  canvas.value.width = width
  canvas.value.height = height
  drawWaveForm()
}

///////////////////////////////////////////////////////////////////////////////
//
// Life Cycle Hooks
//
///////////////////////////////////////////////////////////////////////////////

onMounted(() => {
  onContainerResize()
})

///////////////////////////////////////////////////////////////////////////////
//
// Render Functions
//
///////////////////////////////////////////////////////////////////////////////

const drawWaveForm = () => {
  if(!canvas.value) return
  if(!props.data) return
  if(!props.data.length) return

  const rect = canvas.value.getBoundingClientRect()
  const width = Math.floor(rect.width)
  const height = Math.floor(rect.height)

  compactForWaveformVis({
    channels: props.data,
    skipFrames: 1024,
    width
  }).then(result => {
    const ctx = canvas.value.getContext('2d')
    ctx.fillStyle = 'transparent'
    ctx.clearRect(0, 0, width, height);

    // Draw waveform
    ctx.globalAlpha = 1.0
    ctx.fillStyle = pea
    ctx.fillRect(0, height * 0.5 - 0.5, width, 1)
    result.data.forEach((amp, x) => {
      const h = (height) * amp
      const y = (height - h) * 0.5
      ctx.fillStyle = pea
      ctx.fillRect(x, y, 1, h)
    })

    /*
    // Draw peaks
    ctx.globalAlpha = 0.2
    backingTrackStore.peaks.forEach(peak => {
      const x1 = width * peak.start
      const x2 = width * peak.end
      const w = Math.abs(x1 - x2)
      ctx.fillStyle = 'red'
      ctx.fillRect(x1, 0, w, height)
    })
    */
  })
}

///////////////////////////////////////////////////////////////////////////////
//
// Watchers
//
///////////////////////////////////////////////////////////////////////////////

watch(() => [props.data], () => {
  onContainerResize()
  drawWaveForm()
})
</script>

<template>
  <div
    ref='container'
    v-resize='onContainerResize'
    :style='{
      height: `${height}px`,
      padding: `${padding}px`
    }'
    class='d-flex flex-grow-1'>
    <canvas
      ref='canvas'
      class='d-flex flex-grow-1'/>
  </div>
</template>
