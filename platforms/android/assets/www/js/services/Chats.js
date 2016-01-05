var app = angular.module('freevice');

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
