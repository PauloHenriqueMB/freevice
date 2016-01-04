var app = angular.module('desksolution');

app.factory('Marker', function($TecnicoInfo, $user){
  return{
    createMarker: function(user, map){
        var markerPos = new google.maps.LatLng(user.location.lat, user.location.lng);
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: markerPos
        });

        return marker;
    },

    onClick: function(marker, user){
        google.maps.event.addListener(marker, 'click', function(){
            $TecnicoInfo.showPopup(user);
        });
    }
  }

});
