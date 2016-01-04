var app = angular.module('desksolution');

app.factory('Auth', function($firebaseAuth){
  var fireBaseDB = 'https://desk-solution.firebaseio.com/users/';
  var usersRef = new Firebase(fireBaseDB);

  return $firebaseAuth(usersRef)
});

app.factory('LastMessage', function($firebaseObject){
  return{
    getLastMessage: function(userId){
      var ref = new Firebase('https://desk-solution.firebaseio.com/chats/');
      var data = ref.child(userId).child('chatInfo');
      console.log(data);
    }
  }
});

app.factory('Location', function(){
    var geocoder = new google.maps.Geocoder();
    var lat, long;
    var locationName;

    if(navigator.geolocation){
  			navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  	}

  	function successCallback(position){
  		lat = position.coords.latitude;
  		long = position.coords.longitude;
  		codeLatLng(lat, long);
  	}

  	function errorCallback() {
    	alert("Geocoder failed");
  	}

  	function codeLatLng(lat, lng) {
    	var latlng = new google.maps.LatLng(lat, lng);
    		geocoder.geocode({'latLng': latlng}, function(results, status) {
    			if (status == google.maps.GeocoderStatus.OK) {
    				if (results[1]) {
    				 var cityName = results[0].address_components[4].long_name;
    				 var stateName = results[0].address_components[5].long_name;

    				 locationName = cityName + ', ' + stateName;
    				} else {
    					console.log("No results found");
    				}
    			} else {
    				console.log("Geocoder failed due to: " + status);
    			}
    	});
    }

    return{
      getLocationName: function(){
        return locationName;
      }
    }
});
app.factory('Alerta', function($ionicPopup, $location){
  return{
    show: function(text){
      var alertPopup = $ionicPopup.alert({
           title: 'Desk Solution',
           template: text
      });
    },
    showAlertLocation: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar sua localização!',
           template: 'Precisamos de sua localização para filtrar os técnicos de sua cidade.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlertTelefone: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar seu telefone!',
           template: 'Precisamos do numero do seu celular.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlertAll: function(){
        var alertPopup = $ionicPopup.alert({
           title: 'Você precisa informar seu telefone e sua localização!',
           template: 'Precisamos do numero do seu celular e da sua localização.'
        });
        alertPopup.then(function(res){
          $location.path('tab/conta');
        });
    },
    showAlert: function(text){
      var alertPopup = $ionicPopup.alert({
           title: 'Alerta!',
           template: text
      });
      alertPopup.then(function(res){
          $location.path('tab/chat');
      });
    },
    showAlertRedirect: function(text, path){
      var alertPopup = $ionicPopup.alert({
           title: 'Desk Solution',
           template: text
      });
      alertPopup.then(function(res){
          $location.path(path);
      });
    }
  }
});

app.factory('$tecnico', function($firebase){
    var ref = new Firebase('https://desk-solution.firebaseio.com/users');
    var tecnicos = [];
    var selectedTecnico = {};

    function init(){

    }
    return{
        setTecnicos: function(data){
          tecnicos = data;
        },
        getTecnicos: function(){
          tecnicos = [];
          ref.on('value', function(data){
            var _tecnicos = data.val();

            for(var x in _tecnicos){
              if(x.tecnico)
                tecnicos.push(_tecnicos[x]);
            }

            console.log(tecnicos);
          }, function(error){
            console.log('Failed to read data: ' + error);
          });
          return tecnicos;
        },

        setSelectedTecnico: function(tecnico){
          selectedTecnico = tecnico;
        },

        getDataById: function(id){
          var facebookID = 'facebook:' + id;

          ref.child(facebookID).once('value', function(userData){
             var data = userData.val();
             console.log('returning: ' + data.name);
             return data.name;
          });
        },

        getSelectedTecnico: function(){
          return selectedTecnico;
        },

        getLocation: function(){
          var options = {timeout: 10000, enableHighAccuracy: true};
          var location = {lat: 0.0000, lng: 0.00000};
          /*$cordovaGeolocation.getCurrentPosition(options).then(function(pos){
              var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
              var obj = {lat: position.lat(), lng: position.lng()};
              console.log(obj);
              location.lat = obj.lat;
              location.lng = obj.lng;
          });
          return location;*/
        },
        Tecnicos: tecnicos
    };
});

app.factory('Chats', function($firebase, $user){
  var ref = new Firebase('https://desk-solution.firebaseio.com/users');
  var userId = $user.get('userData.id');
  var chats, lastMessage;

  return {
    setChatId: function(id){
      chats = ref.child('chats').child(id).child(userId);
      lastMessage = chats.child('lastMessage');
      console.log(chats);
    },
    getChats: function() {
      return chats;
    },
    getLastMessage: function(){
      return lastMessage;
    },
    send: function(from, date, msg){
      if(from && msg){
        lastMessage.set({
          lastMessage: msg,
          created_at: date.toString()
        });

        chats.push().set({
          from: from,
          message: msg,
          created_at: date.toString()
        });
      }
    }
  };
});

app.factory('$user', function($window, $firebase){
    var user_data = {};

    var USERS_REF = 'https://desk-solution.firebaseio.com/users';

    var checkIfUserExist = function(uid){
      var userRef = new Firebase(USERS_REF);
      var user;

      userRef.child(uid).once('value', function(data){
        user = data.val();
      });

      return (user !== null);
    }

    return{
      checkIfUserExist: checkIfUserExist,
      setUserData: function(authData){
        user_data = authData;
        console.log('User Data in userService: ');
        console.log(user_data);
      },
      getId: function(uid){
        //Google:ID
        var id = uid.split('google:');
        return id[1];
      },
      set: function(key, value){
        $window.localStorage[key] = value;
      },
      get: function(key){
        return $window.localStorage[key];
      },
      getUserData: function(){
        return user_data;
      }
    }
});


app.factory('$TecnicoInfo', function($firebase, $state, $ionicPopup){
  function showWindowPopup(tecnico){
    var windowPopup = $ionicPopup.show({
      title: tecnico.name,
      subTitle: 'Av. Rondon Pacheco, 277, Uberlândia, Minas Gerais',
      buttons:[
        {text: 'Voltar', type: 'button-assertive'},
        {
          text: 'Chat',
          type: 'button-positive',
          onTap: function(e){
            console.log('Tudo ok por aqui jovem gafanhoto.');
          }
        }
      ]
    });
  }
  return{
    showPopup: showWindowPopup
  }
});
