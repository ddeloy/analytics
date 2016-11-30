//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardDtRangeController
 * @description
 * # ScorecardDtRangeController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('ScorecardDtRangeController',['$scope','$http', 'queryService', function ($scope,$http, queryService) {
	$scope.DtRangeOpt = queryService.state.selectedDateRange;
	queryService.resetDtRangeOpt = function() {
      $scope.DtRangeOpt = '12';
	}
  }])