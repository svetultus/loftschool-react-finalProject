import { apiKey } from "./apiKey.js";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = apiKey;

export const mapInit = mapContainer =>
  new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v9",
    center: [30.2656504, 59.8029126],
    zoom: 15
  });
