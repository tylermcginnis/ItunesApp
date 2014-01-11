angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', 'httpRequest', function($scope, httpRequest){
    
    $scope.defaultInfo = {
       search: '',
       mediaType: 'movie',
       sortBy: 'artistName'
    }

    $scope.filterOptions = {
      filterText: ''
    };

    $scope.sortInfo = $scope.defaultInfo.sortBy;

    $scope.getAjaxSong = function(){
      if($scope.defaultInfo.mediaType === 'all'){
        httpRequest.get({term:$scope.defaultInfo.search}, function(res){
          parseData(res.results);
        });
      } else{
        httpRequest.get({term:$scope.defaultInfo.search, entity: $scope.defaultInfo.mediaType}, function(res){
          parseData(res.results);
        });
      }
    }

    $scope.updateSortInfo = function(){
      $scope.gridOptions.sortBy($scope.defaultInfo.sortBy);
    }

    var parseData = function(searchInfo){
      $scope.theData = [];
      for(var i = 0; i < searchInfo.length; i++){
        var correctData = {};
        if(searchInfo[i].previewUrl) correctData['Play'] = searchInfo[i].previewUrl;
        if(searchInfo[i].trackName) correctData['Song'] = searchInfo[i].trackName;
        if(searchInfo[i].artistName) correctData['Artist'] = searchInfo[i].artistName;
        if(searchInfo[i].collectionName) correctData['Collection'] = searchInfo[i].collectionName;
        if(searchInfo[i].artworkUrl60) correctData['AlbumArt'] = searchInfo[i].artworkUrl60;
        if(searchInfo[i].kind) correctData['Type'] = searchInfo[i].kind;
        if(searchInfo[i].trackPrice) correctData['IndividualPrice'] = searchInfo[i].trackPrice;
        if(searchInfo[i].collectionPrice) correctData['CollectionPrice'] = searchInfo[i].collectionPrice;
        $scope.theData.push(correctData);
      }
    }

    $scope.gridOptions = { 
      data: 'theData',
      filterOptions: $scope.filterOptions,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']}
    };

  }]);