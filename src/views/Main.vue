<script setup lang='ts'>
import {Routes} from '@/router/index.ts'
</script>

<template>
  <v-app>
    <v-container
      class='d-flex flex-column align-center justify-center flex-grow-1'>
      <div>
        <div
          class='d-flex align-start'>
          <span
            class='text-h1 font-weight-bold'>
            AudioLab
          </span>
          <span>by&nbsp;</span>
          <span
            class='font-weight-bold'>
            <a
              class='text-primary'
              href='https://scibeam.co'>
              @scibeam
            </a>
          </span>
        </div>
        <v-list>
          <v-list-item
              :to='Routes.AudioPeakDetection'>
            <v-list-item-title>
              1. Audio Peak Detection
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-container>
  </v-app>
</template>
