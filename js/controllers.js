angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', function($scope){
    $scope.defaultInfo = {
       search: '',
       mediaType: 'all',
       sortBy: 'artistName'
    }

  }]);