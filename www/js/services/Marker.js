var app = angular.module('freevice');

app.factory('Marker', function(Worker, $user){
  return{
    createMarker: function(user, map){
        var markerPos = new google.maps.LatLng(user.location.lat, user.location.lng);
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: markerPos
        });

        return marker;
    }
  }

});
