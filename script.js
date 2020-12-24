const p = document.getElementById('the-p')
const addPointButton = document.getElementById('add-point')
var id, target, options, position;

let lmc = 0;

if (!"geolocation" in navigator) {
  alert("No geolocation available!");
}
function success(pos) {  
  if (lmc === 4) {
    let tempArray = []
    position.meta.forEach((i) => {tempArray.push(i.accuracy)})
    position.latitude = position.meta[tempArray.indexOf(Math.max(...tempArray))].latitude;
    position.longitude = position.meta[tempArray.indexOf(Math.max(...tempArray))].longitude;
    //position.latitude = position.metaLatitude.reduce((a, b) => a + b, 0) / position.metaLatitude.length;
    //position.longitude = position.metaLongitude.reduce((a, b) => a + b, 0) / position.metaLongitude.length;
    position.meta = [];
    p.textContent = 'Lat: ' + 
      position.latitude + ', Long: ' + 
      position.longitude + ' -- ' + 
      pos.coords.accuracy + ' -- ' + 
      Math.round(Math.hypot((target.latitude - position.latitude), 
        (target.longitude - position.longitude)) * 1000000);
        
    p.style.background = "red"
    setTimeout(()=>{p.style.background = ''}, 100)
    lmc = 0;
  } else {
    position.meta.push(pos.coords);
    lmc++
  }
}

function error(err) {
  p.textContent = 'ERROR(' + err.code + '): ' + err.message;
}

position = {
  meta: [],
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

setInterval(() => {navigator.geolocation.getCurrentPosition(success, error, options)}, 100)
//id = navigator.geolocation.watchPosition(success, error, options)

function addPoint () {
  target.latitude = position.latitude;
  target.longitude = position.longitude;
}

addPointButton.onclick = addPoint;
