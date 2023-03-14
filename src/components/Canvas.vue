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
    type: Number,
    default: 64
  },
  padding: {
    type: Number,
    default: 4
  }
})

const canvas = ref(null)
const container = ref(null)

///////////////////////////////////////////////////////////////////////////////
//
// Events & Handlers
//
///////////////////////////////////////////////////////////////////////////////

const emit = defineEmits()

const onContainerResize = () => {
  const rect = container.value.getBoundingClientRect()
  const width = Math.floor(rect.width - props.padding * 2)
  const height = Math.floor(rect.height - props.padding * 2)
  canvas.value.width = width
  canvas.value.height = height
  emit('resize', {width, height})
}

///////////////////////////////////////////////////////////////////////////////
//
// Life Cycle Hooks
//
///////////////////////////////////////////////////////////////////////////////

onMounted(() => {
  onContainerResize()
})
</script>

<template>
  <div
    ref='container'
    v-resize='onContainerResize'
    :style='{
      height: `${props.height}px`,
      padding: `${props.padding}px`
    }'
    class='d-flex flex-grow-1'>
    <canvas
      ref='canvas'
      class='d-flex flex-grow-1'/>
  </div>
</template>
