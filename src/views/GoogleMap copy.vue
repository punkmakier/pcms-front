<template>
  <div style="height: 100vh; overflow: hidden">
    <div class="deceased-info"></div>
    <div class="gmap">
      <!-- <GoogleMap
        api-key="YOUR_GOOGLE_MAPS_API_KEY"
        style="width: 100%; height: 500px"
        :center="center"
        :zoom="15">
        <Marker :options="{ position: center }" />
      </GoogleMap> -->
      <div class="map" ref="mapContainer"></div>
    </div>
  </div>
</template>

<script setup>
// import { GoogleMap, Marker } from "vue3-google-map";
// const center = { lat: 40.689247, lng: -74.044502 };
import { Map, MapStyle, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

onMounted(() => {
  config.apiKey = "6wqHRk3KTUNhFitZJu3l";

  const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );
}),
  onUnmounted(() => {
    map.value?.remove();
  });
</script>

<style scoped>
.deceased-info {
  width: 25%;
  height: 100vh;
  background-color: #fff;
}
.gmap {
  width: 60%;
  height: 100vh;
}
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    100vh - 77px
  ); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
