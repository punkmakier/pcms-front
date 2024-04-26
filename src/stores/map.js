import { defineStore } from "pinia";
import { reactive } from "vue";
export const useMapInfo = defineStore("mapinfo", () => {
  const mapinfo = reactive({
    info: null,
  });

  return { mapinfo };
});
