<script setup lang='ts'>
import {
  defineProps,
  onMounted,
  ref,
} from 'vue'

///////////////////////////////////////////////////////////////////////////////
//
// Props & Vars
//
///////////////////////////////////////////////////////////////////////////////

const props = defineProps({
  height: {
    default: 64
  },
  padding: {
    type: Number,
    default: 4
  },
  type: {
    type: String,
    default: 'canvas'
  }
})

const canvas = ref(null)
const svg = ref(null)
const container = ref(null)
const canvasSize = ref({width: 0, height: 0})

///////////////////////////////////////////////////////////////////////////////
//
// Events & Handlers
//
///////////////////////////////////////////////////////////////////////////////

const emit = defineEmits(['resize'])

const onContainerResize = () => {
  const containerWidth = container.value.clientWidth
  const containerHeight = container.value.clientHeight
  const width = Math.floor(containerWidth - props.padding * 2)
  const height = Math.floor(containerHeight - props.padding * 2)

  if(canvas.value) {
    canvas.value.setAttribute('width', width)
    canvas.value.setAttribute('height', height)
  }

  if(svg.value) {
    svg.value.setAttribute('width', width)
    svg.value.setAttribute('height', height)
  }

  canvasSize.value.width = width
  canvasSize.value.height = height
  emit('resize', {...canvasSize.value})
}

///////////////////////////////////////////////////////////////////////////////
//
// Life Cycle Hooks
//
///////////////////////////////////////////////////////////////////////////////

onMounted(async () => {
  setTimeout(() => {
    onContainerResize()
  }, 100)
})
</script>

<template>
  <div
    ref='container'
    v-resize='onContainerResize'
    :style='{
      height: `${props.height}px`,
      position: `relative`
    }'
    class='d-flex flex-grow-1'>
    <canvas
      v-if='props.type === `composite` || props.type === `canvas`'
      :style='{
        height: `${canvasSize.height}px`,
        left: `${props.padding}px`,
        position: `absolute`,
        top: `${props.padding}px`,
        width: `${canvasSize.width}px`
      }'
      ref='canvas'/>

    <svg
      v-if='props.type === `composite` || props.type === `svg`'
      :style='{
        height: `${canvasSize.height}px`,
        left: `${props.padding}px`,
        position: `absolute`,
        top: `${props.padding}px`,
        width: `${canvasSize.width}px`
      }'
      ref='svg'>
      <slot
        name='svg-content'/>
    </svg>
  </div>
</template>
