<template>
  <div>
    <div class="loading" v-if="isLoading">Loading&#8230;</div>
    <div class="row text-center mt-2">
      <div class="col-12">
        <p class="h5">Locate Hub</p>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <gmap-map id="hubMap" :center="userLocation" :zoom="12" ref="mapRef" :options="mapOptions">
          <marker-map :markers="markers" :user-location="userLocation" @reUpdateMarkers="reUpdateMarkers"></marker-map>
        </gmap-map>
      </div>
    </div>
    <div class="row text-center mt-4 list-hub">
      <div class="col-sm-5 text-left ml-2">
        <p class="h5">Hubs Near You</p>
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-3">
      <div class="col-sm text-center container-list-hub">
        <list-hub :markers="markers" @reUpdateMarkers="reUpdateMarkers"></list-hub>
      </div>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import { sortMarker } from "./../helpers/sortMarker";
import { storageDataHub, getDataHubFromLocalStorage } from "./../helpers/locaStorageStore";
import hubData from "./../../static/hubs.json";
import MarkerMap from "./MarkerMap";
import ListHub from "./ListHub";
const LABELS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default {
  name: "GoogleMap",
  components: {
    'marker-map': MarkerMap,
    'list-hub': ListHub
  },
  mounted() {
    this.geolocate();
  },
  computed: { google: gmapApi },
  data() {
    return {
      isLoading: true,
      counter: 0,
      geocoder: null,
      map: null,
      userLocation: {},
      markers: [],
      places: [],
      currentPlace: null,
      mapOptions: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: false
      }
    };
  },
  methods: {
    reUpdateMarkers: function(cacheDataHub = []) {
      if (cacheDataHub && cacheDataHub.length > 0) {
        this.markers = cacheDataHub;
      }
      this.markers = this.reSetLabelMarker(sortMarker(this.markers));
      storageDataHub('data-hub', this.markers);
    },
    reSetLabelMarker: function(markers) {
      const normalMarkers = markers.filter(m => m.isNormalMarker);
      let labelMarkers = markers.filter(m => !m.isNormalMarker);
      let counter = 0;
      labelMarkers = labelMarkers.map(m => {
        m.alias = LABELS[counter];
        counter++;
        return m;
      });
      return labelMarkers.concat(normalMarkers);
    },
    setMarkerFromHubs: async function() {
      const cacheDataHub = getDataHubFromLocalStorage('data-hub');
      if (cacheDataHub && cacheDataHub.length > 0) {
          this.reUpdateMarkers(cacheDataHub);
          this.isLoading = false;
          return;
      }
      const vm = this;
      setTimeout(async function() {
        const road = `${hubData.data[vm.counter].road}, ${
          hubData.data[vm.counter].city
        }`;
        const markerData = await vm.geocodeAddress(road);
        const position = markerData.results[0].geometry.location.toJSON();
        vm.markers.push({
          id: hubData.data[vm.counter].id,
          position: position,
          detail: hubData.data[vm.counter],
          alias: '?',
          isNormalMarker: false,
          distance: window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(position.lat, position.lng), new window.google.maps.LatLng(vm.userLocation.lat, vm.userLocation.lng)
          )
        });
        vm.counter++;
        if (vm.counter < hubData.data.length) {
          vm.setMarkerFromHubs();
        } else if (vm.counter == hubData.data.length) {
          vm.counter = 0;
          vm.reUpdateMarkers();
          vm.isLoading = false;
        }
      }, 600);
    },
    geocodeAddress: async function(address) {
      const geocoder = new window.google.maps.Geocoder();
      return geocoder.geocode({ address: address });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.$refs.mapRef.$mapPromise.then(map => {
          this.map = map;
          map.panTo(this.userLocation);
          this.geocoder = new window.google.maps.Geocoder();
        });
        this.setMarkerFromHubs();
      });
    }
  }
};
</script>
<style>
  .list-hub {
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  .container-list-hub {
    height: calc(50vh);
    overflow-y: auto;
  }
  #hubMap {
    width: 100%;
    height: calc(45vh);
  }
  @media screen and (max-width: 995px), screen and (max-height: 700px) {
    .container-list-hub {
      height: calc(55vh);
      overflow-y: auto;
    }
    #hubMap {
      height: calc(45vh);
    }
  }

  ::-webkit-scrollbar {
      width: 7px;
  }

  ::-webkit-scrollbar-track {
      background-color: #ebebeb;
      -webkit-border-radius: 7px;
      border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb {
      -webkit-border-radius: 7px;
      border-radius: 7px;
      background: #AAA;
  }
  .gm-style-iw-t,
    .gmnoprint,
    .gmnoscreen,
    .gm-style-cc {
      display: none !important;
    }
  .loading {
    position: fixed;
    z-index: 999;
    height: 2em;
    width: 2em;
    overflow: show;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .loading:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
      background: radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0, .8));

    background: -webkit-radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0,.8));
  }

  .loading:not(:required) {
    font: 0/0 a;
    color: transparent;
    text-shadow: none;
    background-color: transparent;
    border: 0;
  }

  .loading:not(:required):after {
    content: '';
    display: block;
    font-size: 10px;
    width: 1em;
    height: 1em;
    margin-top: -0.5em;
    -webkit-animation: spinner 150ms infinite linear;
    -moz-animation: spinner 150ms infinite linear;
    -ms-animation: spinner 150ms infinite linear;
    -o-animation: spinner 150ms infinite linear;
    animation: spinner 150ms infinite linear;
    border-radius: 0.5em;
    -webkit-box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
    box-shadow: rgba(255,255,255, 0.75) 1.5em 0 0 0, rgba(255,255,255, 0.75) 1.1em 1.1em 0 0, rgba(255,255,255, 0.75) 0 1.5em 0 0, rgba(255,255,255, 0.75) -1.1em 1.1em 0 0, rgba(255,255,255, 0.75) -1.5em 0 0 0, rgba(255,255,255, 0.75) -1.1em -1.1em 0 0, rgba(255,255,255, 0.75) 0 -1.5em 0 0, rgba(255,255,255, 0.75) 1.1em -1.1em 0 0;
  }

  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>