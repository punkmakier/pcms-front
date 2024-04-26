<template>
  <div style="height: 100vh; overflow: hidden; display: flex">
    <div class="deceased-info">
      <img
        :src="`http://127.0.0.1:8000/${mapinfo.info?.lapida_image}`"
        width="100%"
        height="300px" />
      <div style="padding: 0 10px">
        <div style="padding: 10px">
          <h2 style="color: #000; text-align: center">
            {{ mapinfo.info?.fullname }}
          </h2>
          <Divider /><br />
          <div style="display: flex; gap: 10px">
            <div style="flex-grow: 1; text-align: center">
              <h4 style="color: #000">Born</h4>
              <span>{{ formatDate(mapinfo.info?.born) }}</span>
            </div>
            <div style="flex-grow: 1; text-align: center">
              <h4 style="color: #000">Died</h4>
              <span>{{ formatDate(mapinfo.info?.died) }}</span>
            </div>
          </div>
          <br />
          <Divider /><br />
          <h4 style="color: #000; text-align: center">
            Cemetery Location:
            {{ formatLocation(mapinfo.info?.cemetery_location) }}
          </h4>
        </div>
        <Divider /><br />

        <br />
        <a
          href="javascript:void(0);"
          class="button primary"
          style="width: 100%"
          @click="goback"
          >Go Back</a
        >
      </div>
      <!-- 
      <span>Cemetery Location:</span>
      <span>Tax Informant Name:</span>
      <span>Tax Informant Contact No.:</span> -->
    </div>
    <div class="map" ref="mapContainer"></div>
    <div class="d"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, Popup, config, helpers } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useMapInfo } from "@/stores/map";
import { useRouter } from "vue-router";
const { mapinfo } = useMapInfo();
const router = useRouter();
const mapContainer = shallowRef(null);
const map = shallowRef(null);
const coor1 = { lng: mapinfo.info?.longitude, lat: mapinfo.info?.latitude };
let coor2;

switch (mapinfo.info?.cemetery_location) {
  case 1:
    coor2 = { lng: 122.627898, lat: 10.682258 };
    break;
  case 2:
    coor2 = { lng: 122.710362, lat: 10.664743 };
    break;
  case 3:
    coor2 = { lng: 122.680504, lat: 10.720336 };
    break;
  default:
    coor2 = { lng: 0, lat: 0 };
    break;
}

const goback = () => {
  router.push("/");
};

onMounted(() => {
  if (mapinfo.info === null || mapinfo.info === undefined) {
    router.push("/");
  }

  config.apiKey = "6wqHRk3KTUNhFitZJu3l";

  const initialState = { lng: coor1.lng, lat: coor1.lat, zoom: 17 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.HYBRID,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );

  new Marker({ color: "#FF0000" })
    .setLngLat([coor1.lng, coor1.lat])
    .addTo(map.value);

  new Popup({ offset: 25, closeButton: false })
    .setHTML(
      `<div style=" color: #000; padding: 5px;text-align: center;"><b style=" color: #000;">${mapinfo.info?.fullname.toUpperCase()}</b><br/><span style=" color: green;">${formatDate(
        mapinfo.info?.born
      )}</span> - <span style=" color: red;">${formatDate(
        mapinfo.info?.died
      )}</span><br></small><small>${formatLocation(
        mapinfo.info?.cemetery_location
      )} CEMETERY</small></div>`
    )
    .setLngLat([coor1.lng, coor1.lat])
    .addTo(map.value);

  new Marker({ color: "#00FF00" })
    .setLngLat([coor2.lng, coor2.lat])
    .addTo(map.value);

  new Popup({ offset: 25, closeButton: false })
    .setHTML(
      `<div style=" color: #000; padding: 5px;text-align: center;"><span>Entrance of ${formatLocation(
        mapinfo.info?.cemetery_location
      )} CEMETERY</span></div>`
    )
    .setLngLat([coor2.lng, coor2.lat])
    .addTo(map.value);
}),
  onUnmounted(() => {
    map.value?.remove();
  });

const formatLocation = (val) => {
  switch (val) {
    case 1:
      return "OLD POBLACTION";
    case 2:
      return "EAST VALENCIA";
    case 3:
      return "BANBAN";
    default:
      return "N/A";
  }
};
function formatDate(inputDateStr) {
  const inputDate = new Date(inputDateStr);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return inputDate.toLocaleString("en-US", options);
}
</script>

<style scoped>
.deceased-info {
  width: 25%;
  height: 100vh;
  background-color: #fff;
  color: #000 !important;
}

.map {
  width: 75%;
  height: 100vh;
}
</style>
