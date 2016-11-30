//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardClickThruResetFilterController
 * @description
 * # ScorecardClickThruResetFilterController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('ScorecardClickThruResetFilterController',['$scope', '$rootScope', '$http','queryService', function ($scope, $rootScope, $http,queryService) {
	$scope.resetFilterScorecardClickThruOptions = function() {
		$rootScope.lastStatus[2] = {selectedCategories: '', filterSuppliers: true, filterCategories: true, 
				selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
				selectedDateRangeLabel: '12 months', selectedScoreType: '', 
				selectedScoreTypeOrderBy: '', viewSelectedFlag: false};
		queryService.selectedSupplier2 = null; // reset
		queryService.selectedSupplierName2 = null; // reset
		queryService.scNavBack = false;
		$scope.defaultScorecardClickThruOptions();
		//queryService.resetWatchlistOpt();//Refresh
		queryService.resetSupplierOpt();
		//queryService.resetCategoryOpt();//Refresh
		queryService.resetDtRangeOpt();
		// re-calculate charts
		queryService.calculateBizMetrics();
    };
	$scope.defaultScorecardClickThruOptions = function() {

		$rootScope.contextSwitch();
		/* reset state options */
		/*
		queryService.state.selectedCategories = '';
		queryService.state.filterSuppliers = true; // default don't update categories list
		queryService.state.filterCategories = true; // default don't update categories list
		queryService.state.selectedSuppliers = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : '2831';
		queryService.state.selectedWL = ''; // seller custom list
		queryService.state.selectedDateRange = '12';
		queryService.state.selectedScoreType = '';
		queryService.state.viewSelectedFlag = true;
		queryService.selectedSupplier2 = null; // reset
		queryService.selectedSupplierName2 = null; // reset
		queryService.state.selectedDateRangeLabel = '12 months'; */
    };
	queryService.resetFilterScorecardClickThruOptions = $scope.resetFilterScorecardClickThruOptions;
	queryService.defaultScorecardClickThruOptions = $scope.defaultScorecardClickThruOptions;
	
 }])