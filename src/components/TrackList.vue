<script setup lang='ts'>
import {defineProps} from 'vue'

const emit = defineEmits(['update:selectedTrack'])

const props = defineProps({
  header: Array,
  tracks: Array,
  selectedTrack: Object
})

const onTrackPlayStopClick = track => {
  if(isSelectedTrack(track)) {
    emit('update:selectedTrack', null)
  } else {
    emit(`update:selectedTrack`, track)
  }
}

const isSelectedTrack = track => {
  return props.selectedTrack && props.selectedTrack.id === track.id
}
</script>

<template>
  <v-table
    density='compact'>
    <thead>
      <tr>
        <th>
          <v-icon
            color='primary'>
            fa fa-record-vinyl
          </v-icon>
        </th>
        <th
          class='font-weight-bold'>
          Artist
        </th>
        <th
          class='font-weight-bold'>
          Song
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for='(track, i) in tracks'
        :key='i'>
        <td
          :style='{
            textAlign: `center`
          }'>
          <v-icon
            @click='onTrackPlayStopClick(track)'
            :color='isSelectedTrack(track) ? `secondary` : null'
            :icon='isSelectedTrack(track) ? `fa fa-stop` : `fa fa-play`'
            size='small'>
          </v-icon>
        </td>
        <td>{{track.artist}}</td>
        <td>{{track.song}}</td>
      </tr>
    </tbody>
  </v-table>
</template>
