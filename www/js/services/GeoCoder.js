var app = angular.module('freevice');

app.factory('GeoCoder', function($firebase){
    var geocoder = new google.maps.Geocoder();
    var cityName;
    
    function setCityName(name){ cityName = name; }
    function setGeoCoderCoords(lat, lng){
        var latlng = new google.maps.LatLng(lat, lng);
        
            geocoder.geocode({'latLng': latlng}, function(results, status){
            if(status == google.maps.GeocoderStatus.OK){
               // console.log(results); 
                
                setCityName(results[0].address_components[3].short_name + ' - ' +   results[0].address_components[5].short_name);
            } 
        });
    }
    function getCityName(){
       // console.log(cityName);
        return cityName;
    }
    return{
        getCityName: getCityName,
        setGeoCoderCoords: setGeoCoderCoords
    }
});