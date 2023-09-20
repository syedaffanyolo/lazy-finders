const apiKey = 'AIzaSyAh1HvFyW5PQ4bRFLw4QJzNJk-XWSRWISw';

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    let params = new URLSearchParams(location.search);
    let id = params.get("id")

    var start_pos = {lat: 0.0, lng: 0.0};
    var end_pos = {lat: 0.0, lng: 0.0};

    const api_url = `http://127.0.0.1:5000/${id}`;
    fetch(api_url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        start_pos = {lat: parseFloat(json[4]), lng: parseFloat(json[5])}
        end_pos = {lat: parseFloat(json[6]), lng: parseFloat(json[7])}

        const map = new google.maps.Map(document.getElementById('map'), {
            center: start_pos,
            // center: start_pos,
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
    
        var im = 'http://www.robotwoods.com/dev/misc/bluecircle.png';
    
        directionsRenderer.setMap(map);
    
        var request = {
            origin: start_pos,
            destination: end_pos,
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

        var t = setInterval(runFunction,5000);

        function runFunction() {
            fetch('http://lazyfinder.pythonanywhere.com/')
                .then((response) => response.json())
                .then((json) => {
                    var current_pos = {lat: parseFloat(json['lat']), lng: parseFloat(json['lon'])};
                    console.log(current_pos);
        
                    map.setCenter(current_pos);
        
                    var userMarker = new google.maps.Marker({
                        position: current_pos,
                        map: map,
                        icon: im
                    });
                    
                });
        }
        
    });
}

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
}

loadGoogleMapsScript();