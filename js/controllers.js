angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', 'httpRequest', function($scope, httpRequest){
    
    $scope.defaultInfo = {
       search: '',
       mediaType: 'all',
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
        searchInfo[i].previewUrl && (correctData['Play'] = searchInfo[i].previewUrl);
        searchInfo[i].trackName && (correctData['Song'] = searchInfo[i].trackName);
        searchInfo[i].artistName && (correctData['Artist'] = searchInfo[i].artistName);
        searchInfo[i].collectionName && (correctData['Collection'] = searchInfo[i].collectionName);
        searchInfo[i].artworkUrl60 && (correctData['AlbumArt'] = searchInfo[i].artworkUrl100);
        searchInfo[i].kind && (correctData['Type'] = searchInfo[i].kind);
        searchInfo[i].trackPrice && (correctData['IndividualPrice'] = searchInfo[i].trackPrice);
        searchInfo[i].collectionPrice && (correctData['CollectionPrice'] = searchInfo[i].collectionPrice);
        $scope.theData.push(correctData);
      }
    }

    $scope.gridOptions = { 
      data: 'theData',
      height: '110px',
      filterOptions: $scope.filterOptions,
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Type'], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Song', displayName: 'Song'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Type', displayName: 'Type'},
        {field: 'IndividualPrice', displayName: 'Single Price'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
      ]
    };

  }]);