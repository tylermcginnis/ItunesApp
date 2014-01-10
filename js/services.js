angular.module('myApp.services', [])
  .factory('httpRequest', ['$resource', function($resource, theUrl){
    return $resource('https://itunes.apple.com/:action', 
      {action: 'search', callback: 'JSON_CALLBACK'}, 
      {get: {method: 'JSONP'}});
  }]);