import mapboxgl from "mapbox-gl";

export const mapInit = (mapContainer, apiKey) => {
  mapboxgl.accessToken = apiKey;
  return new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v9",
    center: [30.2656504, 59.8029126],
    zoom: 15
  });
};
