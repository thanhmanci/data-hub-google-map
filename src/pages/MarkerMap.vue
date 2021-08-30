<template>
  <span>
    <gmap-marker
      v-for="(m, index) in markers"
      :icon="iconMarker(markers, index)"
      :label="labelMarker(markers, index)"
      :key="index"
      :position="m.position"
      v-on:click="handleMarkerClick(index)"
    ></gmap-marker>
    <gmap-marker :icon="userMarkerIcon" :position="userLocation"></gmap-marker>
  </span>
</template>

<script>
import {iconMarkerStyle, labelMarkerStyle} from "./../helpers/markerCustomizeStyle";

export default {
  props: ['markers', 'userLocation'],
  name: "MarkerMap",
  data() {
    return {
      userMarkerIcon: {
        url: require('./../assets/user-location.svg'),
        scaledSize: { width: 40, height: 40, f: 'px', b: 'px' }
      }
    };
  },
  methods: {
    iconMarker: iconMarkerStyle,
    labelMarker: labelMarkerStyle,
    handleMarkerClick(markerIndex) {
      this.markers[markerIndex].isNormalMarker = !this.markers[markerIndex].isNormalMarker;
      this.$emit('reUpdateMarkers');
    }
  }
};
</script>
