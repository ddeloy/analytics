//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:CatOverviewWatchlistController
 * @description
 * # CatOverviewWatchlistController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('CatOverviewWatchlistController',['$scope', '$rootScope', '$http','queryService', function ($scope, $rootScope, $http,queryService) {
	$scope.WatchlistOpt = queryService.state.selectedWL;
	if(queryService.state.selectedScoreType) {
		$scope.WatchlistOpt = queryService.state.selectedScoreType;
		if(queryService.state.selectedScoreTypeOrderBy == 'spend') {
			$scope.WatchlistOpt = 't10s';
		}
	}
	queryService.WatchlistOpt = function() {
		return $scope.WatchlistOpt;
	}
	queryService.resetWatchlistOpt = function(id) {
      $scope.WatchlistOpt = id;
	}

	queryService.setSupplierWLs = function(sid) {
	  var watchlists = new Array(); // any watchlists that sid belongs to
	  var sid1 = parseInt(sid);
	  for(var i=0; i<queryService.currentWLs.length; i++) {
		if(queryService.currentWLs[i].suppliers.indexOf(sid1) > -1) {
			watchlists.push(queryService.currentWLs[i].name);
		}
	  }
	  watchlists.sort();
	  $rootScope.supplierWLs = watchlists;
	  $rootScope.showSupplierWLs = watchlists.length != 0;
	  //console.log('scorecard context: supplierWLs ' + queryService.state.selectedSuppliers + ' ' + $rootScope.supplierWLs);
      return watchlists;
	}
	queryService.getCurrentWL = function() {
	  //console.log(queryService.currentWLs);
	  for(var i=0; i<queryService.currentWLs.length; i++) {
		//console.log(queryService.currentWLs[i].id);
		if(queryService.currentWLs[i].id == $scope.WatchlistOpt) {
			return queryService.currentWLs[i];
		}
	  }
      return $scope.WatchlistOpt;
	}
    $scope.method = 'GET';
    $scope.url = $rootScope.baseUrl+'users/watchlists';
    $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;

      $http({method: $scope.method, url: $scope.url, headers: {'X-ORG-ID':$rootScope.bID, 'X-USER-ID':$rootScope.userid}}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.data = data;
		  queryService.currentWLs = $scope.data.watchlists; // to check duplicate name
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
	  };
  	queryService.resetWLs = $scope.fetch; /* used to refresh */

 }])
