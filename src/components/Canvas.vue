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

const emit = defineEmits(['resize'])

const onContainerResize = () => {
  const containerWidth = container.value.clientWidth
  const containerHeight = container.value.clientHeight
  const width = Math.floor(containerWidth - props.padding * 2)
  const height = Math.floor(containerHeight - props.padding * 2)
  canvas.value.width = width
  canvas.value.height = height
  emit('resize', {width, height})
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
      ref='canvas'
      :style='{
        top: `${props.padding}px`,
        left: `${props.padding}px`
      }'
      class='canvas'/>
  </div>
</template>

<style lang='sass' scoped>
.canvas
  position: absolute
</style>
