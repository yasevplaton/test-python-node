const map = L.map("map").setView([59.06, 101.6], 14);
const inputDataPromise = fetch("./data/vydels.json").then((res) => res.json());
const maskDataPromise = fetch("./data/geoCategories.json").then((res) =>
  res.json()
);
const clipBtn = document.querySelector(".btn__clip");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

Promise.all([inputDataPromise, maskDataPromise]).then((layers) => {
  inputData = layers[0];
  maskData = layers[1];

  L.geoJSON(inputData, {
    style: {
      color: "#828282",
      weight: 0.5,
    },
  }).addTo(map);

  L.geoJSON(maskData, {
    style: {
      color: "#0a47ff",
      weight: 0.5,
      fillOpacity: 0.3,
      fillColor: "#0a47ff",
    },
  }).addTo(map);
});

clipBtn.addEventListener("click", () => {
  fetch("http://localhost:3000/")
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: "#ff0000",
          weight: 1.5,
          fillOpacity: 0.3,
          fillColor: "#ff0000",
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<p>${feature.properties["area-3857"]} sq meters</p>`);
        }
      }).addTo(map);
    });
});
