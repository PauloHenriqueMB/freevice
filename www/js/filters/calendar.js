var app = angular.module('freevice');

app.filter('calendar', function(){
    return function(time){
        if(!time) return;
        
        return moment(time).calendar(null, {
           lastDay: '[Ontem]',
           sameDay: 'LT',
           lastWeek: 'dddd',
           sameElse: 'DD/MM/YY' 
        });
    };
});