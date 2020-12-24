const p = document.getElementById('the-p')
const addPointButton = document.getElementById('add-point')
var id, target, options, position;

let lmc = 0;

if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
function success(pos) {  
  if (lmc === 4) {
    position.latitude = position.metaLatitude.reduce((a, b) => a + b, 0) / position.metaLatitude.length;
    position.longitude = position.metaLongitude.reduce((a, b) => a + b, 0) / position.metaLongitude.length;
    position.metaLatitude = []
    position.metaLongitude = []
    p.textContent = 'Lat: ' + position.latitude + ', Long: ' + position.longitude + ' -- ' + pos.coords.accuracy + ' -- ' + Math.round(Math.hypot((target.latitude - position.latitude), (target.longitude - position.longitude)) * 1000000);
    p.style.background = "red"
    setTimeout(()=>{p.style.background = ''}, 100)
    lmc = 0;
  } else {
    position.metaLatitude.push(pos.coords.latitude);
    position.metaLongitude.push(pos.coords.longitude);
    lmc++
  }
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

//setInterval(() => {navigator.geolocation.getCurrentPosition(success, error, options)}, 20)
id = navigator.geolocation.getCurrentPosition(success, error, options)

function addPoint () {
  target.latitude = position.latitude;
  target.longitude = position.longitude;
}

addPointButton.onclick = addPoint;
