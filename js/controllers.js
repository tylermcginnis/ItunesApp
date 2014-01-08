angular.module('myApp.controllers', [])
  .controller('main', ['$scope', function($scope){
    $scope.test = 'test';
    console.log('woah');
  }])
  .controller('mainCtrl', ['$scope', function($scope){
    $scope.woo = 'Woo';
  }]);