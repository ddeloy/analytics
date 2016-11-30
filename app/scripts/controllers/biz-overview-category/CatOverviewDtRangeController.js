//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:CatOverviewDtRangeController
 * @description
 * # CatOverviewDtRangeController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('CatOverviewDtRangeController',['$scope','$http', 'queryService', function ($scope,$http, queryService) {
	$scope.DtRangeOpt = queryService.state.selectedDateRange;
	queryService.resetDtRangeOpt = function() {
      $scope.DtRangeOpt = '12';
	}
  }])