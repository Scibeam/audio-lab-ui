<script setup lang='ts'>
import {ref, reactive} from 'vue'
import * as d3Hexbin from 'd3-hexbin'

import Canvas from '@/components/Canvas.vue'
import data from '@/assets/data/sonic-atlas.json'
import {turquoise} from '@/utils/colors'

const colors = {
  blue: '#1574C2',
  brown: '#9E6230',
  green: '#1FBE67',
  grey: '#bdbdbd',
  orange: '#DF7238',
  pea: '#dfeB84',
  pink: '#da7FE5',
  purple: '#945EE5',
  red: '#ef5350',
  transparent: '#00000000',
  turquoise: '#1FB0BD',
  yellow: '#E2BC4C',
  blue_dark: '#0D4472',
  brown_dark: '#5C3A1E',
  green_dark: '#106336',
  orange_dark: '#733312',
  pea_dark: '#5D6510',
  pink_dark: '#6D2D73',
  purple_dark: '#54308B',
  red_dark: '#9D2A28',
  turquoise_dark: '#105E63',
  yellow_dark: '#826515',
  blue_light: '#71B6EF',
  brown_light: '#D9A982',
  green_light: '#80EAB0',
  orange_light: '#EBA480',
  pea_light: '#F5F8D6',
  pink_light: '#F1C3F5',
  purple_light: '#C6A8F4',
  red_light: '#F48A88',
  turquoise_light: '#90E7ED',
  yellow_light: '#EDD490'
}

const countSubGenres = data => {
  return data.reduce((acc, song) => {
    const subGenres = song.genre.split('|')
    subGenres.forEach(subGenre => {
      let count = acc[subGenre] || 0
      acc[subGenre] = ++count
    })
    return acc
  }, {})
}

const sortSubGenresByCount = subGenreCounts => {
  const subGenres = Object.entries(subGenreCounts)
  subGenres.sort((a, b) => {
    return b[1] - a[1]
  })
  return subGenres
}

const subGenreCounts = countSubGenres(data)
const subGenresSorted = sortSubGenresByCount(subGenreCounts)

subGenresSorted.forEach((subGenre, i) => {
  const colorValues = Object.values(colors)
  subGenre[2] = colorValues[i % colorValues.length]
})

const subGenreToColorMap = subGenresSorted.reduce((acc, subGenre) => {
  acc[subGenre[0]] = subGenre[2]
  return acc
}, {})

let canvas = ref(null)
let hexbin = d3Hexbin.hexbin()
let hexbins = reactive([])
let embedding = 'tsne'

const canvasSize = ref({width: 0, height: 0})
const minBinCount = ref(0)
const maxBinCount = ref(0)

const onCanvasResize = size => {
  /*
  if(canvas.value) {
    const cv = canvas.value.$refs.canvas
    const ctx = cv.getContext('2d')
    ctx.fillStyle = 'transparent'
    ctx.clearRect(0, 0, size.width, size.height)
    data.forEach(d => {
      const x = (size.width - d[embedding][0] * size.width) * 0.5
      const y = (size.height - d[embedding][1] * size.height) * 0.5
      ctx.fillStyle = turquoise
      ctx.fillRect(x, y, 1, 1)
    })
  }
  */

  hexbin = d3Hexbin.hexbin()
          .x(d => (size.width - d[embedding][0] * size.width) * 0.5)
          .y(d => (size.height - d[embedding][1] * size.height) * 0.5)
          .radius(Math.floor(size.width / 256))
          .size([size.width, size.height])
          .extent([[-1,  -1], [1, 1]])

  hexbins = hexbin(data)
  hexbins.forEach(bin => {
    const counts = countSubGenres(bin)
    const countsSorted = sortSubGenresByCount(counts)
    bin.subgenre = countsSorted[0][0]
    bin.color = subGenreToColorMap[bin.subgenre]
  })

  const binsWithOne = hexbins.reduce((acc, bin) => {
    if(bin.length === 1) acc += 1
    return acc
  }, 0)

  console.log('Bins with only one', binsWithOne)

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
  console.log(bin.subgenre)
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
  const scale = Math.min(Math.log(1 + (bin.length / maxBinCount.value)), 0.9)
  return hexbin.hexagon()
  return hexbin.hexagon(scale * Math.floor(canvasSize.value.width / 64))
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
            :data-count='bin.length'
            :style='{
              fill: bin.color,
              opacity: 0.1 + Math.pow((bin.length / maxBinCount), 1.2)
              // opacity: bin.length > 1 ? 1 : 0
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
  // stroke: white
  // stroke-width: 1px

:deep(svg)
  overflow: visible
</style>
