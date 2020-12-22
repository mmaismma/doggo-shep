const p = document.getElementsByTagName('p')[0]
var id, target, options;

function success(pos) {
  target.latitude = pos.coords.latitude;
  target.longitude = pos.coords.longitude;
  p.textContent = 'Lat: ' + target.latitude + ', Long: ' + target.longitude;
}

function error(err) {
  p.textContent = 'ERROR(' + err.code + '): ' + err.message;
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: true,
  timeout: 50000000000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);