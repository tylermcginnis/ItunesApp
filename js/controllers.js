angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', function($scope){
    $scope.woo = 'test';
    console.log('woah');
  }])
  .controller('main', ['$scope', function($scope){
    $scope.test = 'Woo';
  }]);