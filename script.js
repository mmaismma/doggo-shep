const p = document.getElementById('the-p')
const addPointButton = document.getElementById('add-point')
var id, target, options, position;
if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
function success(pos) {
  position.latitude = pos.coords.latitude;
  position.longitude = pos.coords.longitude;
  p.textContent = 'Lat: ' + position.latitude + ', Long: ' + position.longitude + ' -- ' + Math.round(Math.hypot((target.latitude - position.latitude), (target.longitude - position.longitude)) * 1000000);
  p.style.background = "red"
  setTimeout(()=>{p.style.background = ''}, 100)
}

function error(err) {
  p.textContent = 'ERROR(' + err.code + '): ' + err.message;
}

position = {
  latitude : 0,
  longitude: 0
};

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

setInterval(() => {navigator.geolocation.getCurrentPosition(success, error, options)}, 1000)

function addPoint () {
  target.latitude = position.latitude;
  target.longitude = position.longitude;
}

addPointButton.onclick = addPoint;
