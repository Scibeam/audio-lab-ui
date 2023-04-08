<script setup lang='ts'>
import TrackPlayer from '@/components/track-player/TrackPlayer.vue'
</script>

<template>
  <v-app>
    <v-container
      class='d-flex flex-grow-1 align-center justify-center fluid'>
      <v-row>
        <v-col
          cols='12'
          class='d-flex flex-column justify-center' >
          <div
            class='text-h2 font-weight-bold mb-4'>
            1. Audio Peak Detection
          </div>
          <TrackPlayer/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
