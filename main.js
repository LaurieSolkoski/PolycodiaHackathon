let oldLocation = navigator.geolocation.getCurrentPosition((pos) => {
    oldLocation = {
      "latitude": pos.coords.latitude,
      "longitude": pos.coords.longitude
    };
    timer = setTimeout(onTimeout, 10000);
    countdown();
    updateLocation(pos.coords.latitude, pos.coords.longitude)
  },
    onError, { "enableHighAccuracy": true })
  let currentLocation;
  let timer;
  const sensitivity = 20;


  const watchId = navigator.geolocation.watchPosition(onSuccess, onError, { "enableHighAccuracy": true });

  function countdown() {
let n = 1;
let count = setInterval(() => {
  console.log(10 - n + " sec remaining");
  let minutes = Math.floor((10 - n) / 60).toString().padStart(2, "0");
  let seconds = (10 - n) % 60;
  seconds = seconds.toString().padStart(2, "0");
  document.getElementById("countdown-clock").innerHTML = `${minutes}:${seconds}`;
  n++;
  if (n > 10) {
    clearInterval(count);
    console.log("IDLE");
  }
}, 1000);
}

  function onSuccess(position) {

    currentLocation = { "latitude": position.coords.latitude, "longitude": position.coords.longitude };

    if (!(idleCheck(oldLocation, currentLocation))) {
      clearTimeout(timer);
      oldLocation = currentLocation;
      updateLocation(currentLocation.latitude, currentLocation.longitude);
      setTimeout(onTimeout, 10000);
      countdown();
    }
  }

  // function idleCheck(old, current) {
  //   if ((Math.abs(old.latitude - current.latitude) <= sensitivity) && (Math.abs(old.longitude - current.longitude) <= sensitivity)) {
  //     console.log("Idling detected.");
  //     return true;
  //   } else {
  //     console.log("Movement detected.");
  //     return false;
  //   }

  function idleCheck(old, current) {
    if (Math.abs(measure(currentLocation.latitude, currentLocation.longitude, oldLocation.latitude, oldLocation.longitude)) <= sensitivity) {
      console.log("Idling detected.");
      return true;
    } else {
      console.log("Movement detected.");
      return false;
    }

    // Calculates the distance in meters between two coordinates (lat, long).
    function measure(lat1, lon1, lat2, lon2) { 
      var R = 6378.137; // Earth radius (km)
      var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
      var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d * 1000; // km -> m
    }


  }

  function onError(error) {
    updateLocation(null, null, error.message);
  }

  function onTimeout() {
    console.log("The location has not changed for 10 seconds");
    const locationDiv = document.getElementById("location");
    idleText = "You have been idle for at least 10 seconds >:("
    locationDiv.innerHTML = idleText;
    locationDiv.setAttribute("style", "background-color: red");
    document.body.style.backgroundColor = "red";
  }

  function updateLocation(latitude, longitude, errorMessage) {
    let locationText;
    if (errorMessage) {
      locationText = "Unable to get your location: " + errorMessage;
    } else if (latitude && longitude) {
      locationText = `Your location: (${latitude}, ${longitude})`;
    } else {
      locationText = "Loading your location...";
    }
    const locationDiv = document.getElementById("location");
    locationDiv.innerHTML = locationText;
    locationDiv.setAttribute("style", "background-color: green");
    document.body.style.backgroundColor = "green";
  }
