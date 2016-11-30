//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardResetFilterController
 * @description
 * # ScorecardResetFilterController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('ScorecardResetFilterController',['$scope', '$rootScope', '$http','queryService', function ($scope, $rootScope, $http,queryService) {
	$scope.resetFilterScorecardOptions2 = function() {
		/*$rootScope.lastStatus[2] = {selectedCategories: '', filterCategories: false, 
				selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
				selectedDateRangeLabel: '12 months', selectedScoreType: '', 
				selectedScoreTypeOrderBy: '', viewSelectedFlag: false};*/
		$scope.defaultScorecardOptions();
		//queryService.resetWatchlistOpt();//Refresh
		if(queryService.resetSupplierOpt) queryService.resetSupplierOpt();
		//queryService.resetCategoryOpt();//Refresh
		if(queryService.resetDtRangeOpt) queryService.resetDtRangeOpt();
		// re-calculate charts
		queryService.calculateBizMetrics();
    };
	$scope.defaultScorecardOptions = function() {

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
	//	queryService.selectedSupplier2 = null; // reset
	//	queryService.selectedSupplierName2 = null; // reset */
    };
	queryService.resetFilterScorecardOptions2 = $scope.resetFilterScorecardOptions2;
	queryService.defaultScorecardOptions = $scope.defaultScorecardOptions;
	
 }])