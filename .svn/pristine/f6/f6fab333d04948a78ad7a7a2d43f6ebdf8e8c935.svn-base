//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:SuppOverviewDtRangeController
 * @description
 * # SuppOverviewDtRangeController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('SuppOverviewDtRangeController',['$scope','$http', 'queryService', function ($scope,$http, queryService) {
	$scope.DtRangeOpt = queryService.state.selectedDateRange;
	queryService.resetDtRangeOpt = function() {
      $scope.DtRangeOpt = '12';
	}
  }])