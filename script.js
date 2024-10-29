'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
let map, mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        let coords = [latitude - 0.053, longitude + 0.195];

        map = L.map('map').setView(coords, 13);
        console.log(map);
        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'jpg'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('Your location')
            .openPopup();

        // Handling clicks on the map
        map.on('click', function (mapE) {
            mapEvent = mapE;
            form.classList.remove('hidden');
            inputDistance.focus();
        });
    }, function () {
        alert("Can't get your position");
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    //clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    console.log(mapEvent);
    L.marker(mapEvent.latlng).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        })).setPopupContent("Workout 🏃‍♂️")
        .openPopup();
    form.classList.add('hidden');
});

inputType.addEventListener('change', function () {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
