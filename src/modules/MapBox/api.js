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

export const fetchAddressList = () => {
  return fetch("https://loft-taxi.glitch.me/addressList").then(response => {
    return response.status !== 200 ? Promise.reject(response) : response.json();
  });
};

export const fetchRoute = ({ address1, address2 }) => {
  return fetch(
    `https://loft-taxi.glitch.me/route?address1=${address1}&address2=${address2}`
  ).then(response => {
    return response.status !== 200 ? Promise.reject(response) : response.json();
  });
};
