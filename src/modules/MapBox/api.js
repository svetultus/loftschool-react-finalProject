import mapboxgl from "mapbox-gl";

let map;
const layerId = "route";

export const mapInit = (mapContainer, apiKey) => {
  mapboxgl.accessToken = apiKey;
  map = new mapboxgl.Map({
    container: mapContainer.current,
    style: "mapbox://styles/mapbox/streets-v11",
    center: [30.2656504, 59.8029126],
    zoom: 15
  });
  return map;
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

export const drawRoute = route => {
  if (map.getLayer(layerId)) {
    map.getSource(layerId).setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: route
          }
        }
      ]
    });
    return;
  }

  map.addLayer({
    id: layerId,
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route
        }
      }
    },
    layout: {
      "line-join": "round",
      "line-cap": "round"
    },
    paint: {
      "line-color": "red",
      "line-width": 8
    }
  });
};

export const flyTo = point => {
  map.flyTo({
    center: point,
    zoom: 16,
    bearing: 0,
    speed: 0.9,
    curve: 1
  });
};
