<template>
  <div id="app" class="container">
    <google-map />
  </div>
</template>

<script>
import GoogleMap from "./pages/GoogleMap";

export default {
  name: "App",
  components: {
    GoogleMap
  }
};
</script>