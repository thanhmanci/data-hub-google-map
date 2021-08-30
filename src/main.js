import Vue from "vue";
import App from "./App";
import * as VueGoogleMaps from "vue2-google-maps";
const env = process.env.NODE_ENV === 'production'
  ? require('../config/prod.env')
  : require('../config/dev.env')

Vue.use(VueGoogleMaps, {
  load: {
    key: env.GOOGLE_API_KEY,
    libraries: ["places", "geometry"]
  }
});

new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});