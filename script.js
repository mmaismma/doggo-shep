const p = document.getElementById('the-p')
const addPointButton = document.getElementById('add-point')
var id, target, options, position;

let lmc = 0;

if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
function success(pos) {
  position.metaLatitude.push(pos.coords.latitude);
  position.metaLongitude.push(pos.coords.longitude);
  console.log(position)
  
  if (lmc === 4) {
    position.latitude = position.metaLatitude;
    position.longitude = position.metaLongitude;
    position.metaLatitude = []
    position.metaLongitude = []
    p.textContent = 'Lat: ' + position.latitude + ', Long: ' + position.longitude + ' -- ' + Math.round(Math.hypot((target.latitude - position.latitude), (target.longitude - position.longitude)) * 1000000);
    p.style.background = "red"
    setTimeout(()=>{p.style.background = ''}, 100)
  }
  lmc === 4 ? lmc = 0 : lmc++
}

function error(err) {
  p.textContent = 'ERROR(' + err.code + '): ' + err.message;
}

position = {
  metaLatitude : [],
  metaLongitude: [],
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
