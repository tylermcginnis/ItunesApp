angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', 'httpRequest', function($scope, httpRequest){
    
    $scope.defaultInfo = {
       search: '',
       mediaType: 'all',
       sortBy: 'artistName'
    }

    $scope.getAjaxSong = function(song){
      //Add Control logic here.
      httpRequest.get({term:"jack johnson"}, function(res){
        console.log(res);
      });
    }
  }]);