<script setup lang='ts'>
import {ref, reactive} from 'vue'
import * as d3Hexbin from 'd3-hexbin'

import Canvas from '@/components/Canvas.vue'
import data from '@/assets/data/sonic-atlas.json'
import {turquoise} from '@/utils/colors'

let canvas = ref(null)
let hexbin = d3Hexbin.hexbin()
let hexbins = reactive([])
let embedding = 'tsne'
const canvasSize = ref({width: 0, height: 0})
const minBinCount = ref(0)
const maxBinCount = ref(0)

const onCanvasResize = size => {
  if(canvas.value) {
    const cv = canvas.value.$refs.canvas
    const ctx = cv.getContext('2d')
    ctx.fillStyle = 'transparent'
    ctx.clearRect(0, 0, size.width, size.height)
    data.forEach(d => {
      const x = (size.width - d[embedding][0] * size.width) * 0.5
      const y = (size.height - d[embedding][1] * size.height) * 0.5
      ctx.fillStyle = turquoise
      ctx.fillRect(x, y, 2, 2)
    })
  }

  hexbin = d3Hexbin.hexbin()
          .x(d => (size.width - d[embedding][0] * size.width) * 0.5)
          .y(d => (size.height - d[embedding][1] * size.height) * 0.5)
          .radius(Math.floor(size.width / 128))
          .size([size.width, size.height])
          .extent([[-1,  -1], [1, 1]])

  hexbins = hexbin(data)

  minBinCount.value = hexbins.reduce((acc, bin) => {
    if(bin.length < acc) return bin.length
    return acc
  }, Infinity)

  maxBinCount.value = hexbins.reduce((acc, bin) => {
    if(bin.length > acc) return bin.length
    return acc
  }, 0)

  canvasSize.value.width = size.width
  canvasSize.value.height = size.height
}

const onBinClick = bin => {
  console.log('--------------------------------')
  bin.selected = true
  bin.forEach(song => {
    console.log('--------------------------------')
    console.log('Title:', song.title)
    console.log('Artist:', song.artist)
    console.log('Album:', song.album)
    console.log('Genre:', song.genre)
    console.log('UID:', song.uid)
  })
}

const hexagon = bin => {
  const scale = bin.length / maxBinCount.value
  return hexbin.hexagon()
  // return hexbin.hexagon(scale * Math.floor(canvasSize.value.width / 100))
}
</script>

<template>
  <v-app>
    <v-container
      class='d-flex flex-grow-1 fluid'>
      <Canvas
        ref='canvas'
        @resize='onCanvasResize'
        height='100%'
        type='composite'>
        <template v-slot:svg-content>
          <path
            v-for='(bin, i) in hexbins'
            @click='onBinClick(bin)'
            :key='i'
            :d='hexagon(bin)'
            :style='{
              opacity: Math.log(1 + bin.length / maxBinCount)
            }'
            :transform='`translate(${bin.x},${bin.y})`'
            class='hexagon'/>
        </template>
      </Canvas>
    </v-container>
  </v-app>
</template>

<style lang='sass' scoped>
.hexagon
  fill: rgb(var(--v-theme-turquoise))
  stroke: white
  stroke-width: 1px

:deep(svg)
  overflow: visible
</style>
