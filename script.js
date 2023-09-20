const apiKey = 'AIzaSyAh1HvFyW5PQ4bRFLw4QJzNJk-XWSRWISw';

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 12.973790,
            lng: 79.164060
        },
        zoom: 17,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE 
        },
        styles: [{
                elementType: "geometry",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#263c3f"
                }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#6b9a76"
                }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#38414e"
                }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#212a37"
                }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9ca5b3"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#746855"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#1f2835"
                }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#f3d19c"
                }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2f3948"
                }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#17263c"
                }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#515c6d"
                }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#17263c"
                }],
            },
        ],
    });

    // infoWindow = new google.maps.InfoWindow();

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };

    //       infoWindow.setPosition(pos);
    //       infoWindow.setContent("Location found.");
    //       infoWindow.open(map);
    //       map.setCenter(pos);
    //     },
    //     () => {
    //       handleLocationError(true, infoWindow, map.getCenter());
    //     },
    //   );
    //   } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    //   }

    directionsRenderer.setMap(map);

    var request = {
        origin: {
            lat: 12.969652,
            lng: 79.155632
        },
        destination: {
            lat: 12.973790,
            lng: 79.164060
        },
        travelMode: 'WALKING'
    };

    var time = new Date();
    var add_minutes = function(dt, minutes) {
        return new Date(dt.getTime() + minutes * 1000);
    }
    var circle = document.getElementById("circle");
    directionsService.route(request, function(response, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(response);
            document.getElementById('dist').innerHTML = `${response.routes[0].legs[0].distance.text} | ${add_minutes(time, response.routes[0].legs[0].duration.value).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
            document.getElementById('time').innerHTML = `${response.routes[0].legs[0].duration.text}`;

            if (response.routes[0].legs[0].duration.value <= 300) {
                circle.style.backgroundColor = "#55D471";
            } else if (response.routes[0].legs[0].duration.value <= 600) {
                circle.style.backgroundColor = "#fd933a";
            } else {
                circle.style.backgroundColor = "#ed333b";
            }
        }
    });
}

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation.",
//   );
//   infoWindow.open(map);
// }

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
}

loadGoogleMapsScript();