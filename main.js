const SENSITIVITY = 20; // General area where coordinates can vary without reseting idle timer. In meters.
const IDLE_BEGIN = 10000 // time that can be spent in one general area until considered idle. In ms.

let currentLocation;
let timer;
let idleTime = 0;
let idles = [];

// establishes the initial position.
let oldLocation = navigator.geolocation.getCurrentPosition((pos) => {
    oldLocation = {
        "latitude": pos.coords.latitude,
        "longitude": pos.coords.longitude
    };
    timer = setTimeout(onTimeout, IDLE_BEGIN);
    count;
    updateLocation(pos.coords.latitude, pos.coords.longitude)
},
    onError, { "enableHighAccuracy": true })



// updates regularly with current position.
const watchId = navigator.geolocation.watchPosition(onSuccess, onError, { "enableHighAccuracy": true });

// defines the timer that tracks idle time.
let n = 1
let count = setInterval(() => {
    let minutes = Math.floor(n / 60).toString().padStart(2, "0");
    let seconds = n % 60;
    seconds = seconds.toString().padStart(2, "0");
    document.getElementById("countdown-clock").innerHTML = `${minutes}:${seconds}`;
    n++;
    if (n > IDLE_BEGIN / 1000) {
        idleTime = n;
    }
}, 1000);

// resets timer
function onSuccess(position) {
    currentLocation = { "latitude": position.coords.latitude, "longitude": position.coords.longitude };
    if (!(idleCheck(oldLocation, currentLocation))) {
        currentTime = new Date();
        let idle = { "endDate": currentTime, "duration": idleTime, "coordinate": currentLocation }
        idles.push(idle);
        console.log(idles);
        n = 1;
        clearTimeout(timer);
        oldLocation = currentLocation;
        updateLocation(currentLocation.latitude, currentLocation.longitude);
        setTimeout(onTimeout, IDLE_BEGIN);
        count;
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
    if (Math.abs(measure(currentLocation.latitude, currentLocation.longitude, oldLocation.latitude, oldLocation.longitude)) <= SENSITIVITY) {
        return true;
    } else {
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

// error function
function onError(error) {
    updateLocation(null, null, error.message);
}

// visually indicates idle status
function onTimeout() {
    const locationDiv = document.getElementById("location");
    idleText = "IDLE"
    locationDiv.innerHTML = idleText;
    locationDiv.setAttribute("style", "background-color: yellow");
    document.body.style.backgroundColor = "red";
}

// visually indicates non-idle status
function updateLocation(latitude, longitude, errorMessage) {
    let locationText;
    if (errorMessage) {
        locationText = "Unable to get your location: " + errorMessage;
    } else if (latitude && longitude) {
        locationText = "PRODUCTIVE";
    } else {
        locationText = "Loading your location...";
    }
    const locationDiv = document.getElementById("location");
    locationDiv.innerHTML = locationText;
    locationDiv.setAttribute("style", "background-color: green");
    document.body.style.backgroundColor = "green";
}

document.getElementById("submit").addEventListener("click", (e) => {
    let res = document.getElementById("res");
    if (res.innerHTML != null)
        res.innerHTML = "Report Submitted";
})
