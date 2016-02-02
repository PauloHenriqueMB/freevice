var app = angular.module('freevice');

app.factory('GoogleMaps', function($cordovaGeolocation, GeoCoder, $firebase, Marker, Worker, $ionicLoading, $state){
    var map = null;
    var ref = new Firebase('https://desk-solution.firebaseio.com/users/workers/');
    var userLocation;
    
    function initMap(){

        var options = {timeout: 10000, enableHighAccuracy: true};

        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var style = [{
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "road",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "road.arterial",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#fee379"
                }]
            }, {
                "featureType": "road.highway",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#fee379"
                }]
            }, {
                "featureType": "landscape",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#f3f4f4"
                }]
            }, {
                "featureType": "water",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#7fc8ed"
                }]
            }, {}, {
                "featureType": "road",
                    "elementType": "labels",
                    "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#83cead"
                }]
            }, {
                "elementType": "labels",
                    "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "landscape.man_made",
                    "elementType": "geometry",
                    "stylers": [{
                    "weight": 0.9
                }, {
                    "visibility": "off"
                }]
            }]
            var mapOptions = {
                center: latlng,
                maxZoom:50,
                minZoom:15,
                zoom: 15,
                styles: style,
                disableDefaultUI: true,
                scaleControl: true,
                zoomControl: true,
                streetViewControl: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
              center: latlng,
              maxZoom:18,
              minZoom:5,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP  
            };
            
            userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
            
            GeoCoder.setGeoCoderCoords(userLocation.lat, userLocation.lng);
            
            map = new google.maps.Map(document.getElementById('map'), mapOptions);
            
            //Wait until map is loaded.
            google.maps.event.addListenerOnce(map, 'idle', function(){
               //Load markers from user city
               loadMarkers(userLocation);
               enableMap(); 
            });
        }, function(error){
            alert(error.message);
        });
    }
    
    function createUserMarker(location){
        var marker = null;
        var user_coords = new Object();
        
        user_coords.location = location;
         
        marker = Marker.createMarker(user_coords, map);
        userInfoWindow(marker);
    }
    
    function loadMarkers(location){
        var marker = null;
       
        var city = GeoCoder.getCityName(location);
        
        if(map != null || map != undefined){
            createUserMarker(location);
            ref.orderByChild('city')/*.equalTo(city)*/.on('child_added', function(data){
                var obj = data.val();
                console.log(obj);
                marker = Marker.createMarker(obj, map); 
                addInfoWindow(marker, obj);
            });
        }
    }
    
    function userInfoWindow(marker){
        var contentString = '<h4>Você está aqui!</h4>';
        var infoWindow = new google.maps.InfoWindow({content: contentString});
        
        google.maps.event.addDomListener(marker, 'click', function(){
            infoWindow.open(map, marker);
        });
    }
    
    function addInfoWindow(marker, obj){
        var contentString = 
        '<div class="infoWindow">' +
            '<div class="item-avatar">'+
                '<img src="' + obj.foto + '"/>' +
            '</div>' + 
            '<p>Nome: ' + obj.name + '</p>' +
            '<a class="positive" href="#/chats/'+ obj.id + '">Chat</a>' +
        '</div>';
        
        var infoWindow = new google.maps.InfoWindow({content: contentString});

        google.maps.event.addDomListener(marker, 'click', function(){
           infoWindow.open(map, marker);
           
           //Importante: dizer ao serviço Worker qual trabalhador foi selecionado.
           Worker.selectWorker(obj);
        });
    }
    
    function enableMap(){
        $ionicLoading.hide();
    }
    
    function disableMap(){
        $ionicLoading.show({template: 'Você precisa estar conectado a internet para vizualizar o mapa!'});
    }
    
    function loadGoogleMaps(){
        $ionicLoading.show({template: 'Buscando profissionais na região...'});
        
        window.mapInit = function(){ initMap(); }
        
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.id = "googleMaps";
        
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA07iB6tj1HzEwiBu2KvZuou0U0A-E5_8I&callback=mapInit';
        document.body.appendChild(script);
    }
    
    return{
        init: function(){
            if(typeof google == "undefined" || typeof google.maps == "undefined"){
                disableMap();
                loadGoogleMaps();
            }else{
                initMap();
                enableMap();
            }    
        }
    }
});
