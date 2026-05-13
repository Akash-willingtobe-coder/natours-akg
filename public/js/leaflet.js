/* eslint-disable */
/*
const locations = JSON.parse(document.getElementById('map').dataset.locations);

// Create the map and attach it to the #map
const map = L.map('map', { zoomControl: false });

// Add a tile layer to add to our map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create icon using the image provided by Jonas
var greenIcon = L.icon({
  iconUrl: '/img/pin.png',
  iconSize: [32, 40], // size of the icon
  iconAnchor: [16, 45], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
});

// Add locations to the map
const points = [];

locations.forEach(loc => {
  const coords = [loc.coordinates[1], loc.coordinates[0]];

  //Create point
  points.push(coords);

  //Add markers
  L.marker(coords, { icon: greenIcon })
    .addTo(map)
    .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
      autoClose: false,
      className: 'mapPopup'
    })
    .on('mouseover', function(e) {
      this.openPopup();
    })
    .on('mouseout', function(e) {
      this.closePopup();
    })
    .openPopup();
});

// Set map bounds to include current location
const bounds = L.latLngBounds(points).pad(0.5);
// map.fitBounds(bounds);
map.fitBounds(bounds, {
  padding: [100, 100],
  animate: true,
  duration: 2
});

// Disable scroll on map
// map.scrollWheelZoom.disable();
*/

// Get locations data from HTML data attribute

export const displayMap = locations => {
  // Create the map
  const map = L.map('map', {
    zoomControl: false
  });

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Custom marker icon
  const greenIcon = L.icon({
    iconUrl: '/img/pin.png',
    iconSize: [32, 40],
    iconAnchor: [16, 45],
    popupAnchor: [0, -50]
  });

  // Store coordinates for bounds + route line
  const points = [];

  // Create route line coordinates
  const routePoints = locations.map(loc => [
    loc.coordinates[1],
    loc.coordinates[0]
  ]);

  // Draw route line
  L.polyline(routePoints, {
    weight: 4,
    opacity: 0.7
  }).addTo(map);

  // Add markers one-by-one with animation effect
  locations.forEach((loc, i) => {
    setTimeout(() => {
      const coords = [loc.coordinates[1], loc.coordinates[0]];

      // Store coordinates
      points.push(coords);

      // Add marker
      L.marker(coords, { icon: greenIcon })
        .addTo(map)
        .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
          autoClose: false,
          closeOnClick: false,
          className: 'mapPopup'
        })
        .on('mouseover', function() {
          this.openPopup();
        })
        .on('mouseout', function() {
          this.closePopup();
        });
    }, i * 300);
  });

  // Animate map fitting after all markers load
  setTimeout(() => {
    const bounds = L.latLngBounds(points).pad(0.5);

    map.fitBounds(bounds, {
      padding: [100, 100],
      animate: true,
      duration: 2
    });
  }, locations.length * 300 + 300);

  // Disable scroll zoom
  map.scrollWheelZoom.disable();
};
