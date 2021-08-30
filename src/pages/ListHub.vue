<template>
  <div class="list-group list-group-flush">
    <ul class="list-group list-group-flush" v-for="(m, index) in markers"  v-bind:key="m.detail.id">
      <li class="list-group-item container-hub" v-bind:class="{ 'd-none': m.isNormalMarker }"  v-on:click="handleMarkerClick(index)">
        <div class="d-inline p-2 float-left location-name">
          <small>{{ m.detail.name }}</small>
        </div>
        <div class="d-inline p-2 float-right">
          <div class="badge text-white font-weight-bold">{{m.alias}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {
  },
  name: "ListHub",
  props: ['markers', 'reUpdateMarkers'],
  data() {
    return {
      markerBg: require('./../assets/circle-bg.svg')
    };
  },
  methods: {
    handleMarkerClick(markerIndex) {
      this.markers[markerIndex].isNormalMarker = !this.markers[markerIndex].isNormalMarker;
      this.$emit('reUpdateMarkers');
    }
  }
};
</script>

<style>
  .badge {
    height: 30px;
    width: 30px;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #f19727;
  }
  .container-hub {
    border-bottom: 1px solid rgba(0,0,0,.125) !important;
  }
  .container-hub:hover {
    background-color: #f7f4f4;
    cursor: pointer;
  }

  .location-name:hover {
    background-color: #f7f4f4;
  }
  .location-name {
    color: #818182;
  }
</style>
