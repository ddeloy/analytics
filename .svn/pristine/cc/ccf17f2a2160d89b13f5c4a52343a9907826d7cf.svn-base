//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:CatOverviewResetFilterController
 * @description
 * # CatOverviewResetFilterController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('CatOverviewResetFilterController',['$scope', '$rootScope', '$http','queryService', function ($scope, $rootScope, $http,queryService) {
	$scope.resetFilterCategoryOptions = function() {
		$rootScope.lastStatus[1] = {selectedCategories: '', filterSuppliers: true, filterCategories: true, 
				selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
				selectedDateRangeLabel: '12 months', selectedScoreType: '', 
				selectedScoreTypeOrderBy: '', viewSelectedFlag: false};

		$scope.defaultCategoryOptions();
		
		if(queryService.resetWatchlistOpt) {
			queryService.resetWatchlistOpt();
		}
		if(queryService.resetSupplierOpt) {
			queryService.resetSupplierOpt();
		}
		if(queryService.resetCategoryOpt) {
			queryService.resetCategoryOpt();
		}
		if(queryService.resetDtRangeOpt) {
			queryService.resetDtRangeOpt();
		}
		
		/* re-calculate charts */
		queryService.calculateBizMetricsCategory();
    };
	$scope.defaultCategoryOptions = function() {
		
		/*if(queryService.resetWatchlistOpt) {
			queryService.resetWatchlistOpt();
		}
		if(queryService.resetSupplierOpt) {
			queryService.resetSupplierOpt();
		}
		if(queryService.resetCategoryOpt) {
			queryService.resetCategoryOpt();
		}
		if(queryService.resetDtRangeOpt) {
			queryService.resetDtRangeOpt();
		}*/

		$rootScope.contextSwitch();

//		queryService.state.selectedSuppliers = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : '';
//		queryService.selectedSupplier2 = null; // reset
//		queryService.selectedSupplierName2 = null; // reset

		/* // reset state options
		queryService.state.selectedCategories = '';
		queryService.state.filterSuppliers = true; // default don't update categories list
		queryService.state.filterCategories = true; // default don't update categories list
		//queryService.state.selectedSuppliers = '';
		queryService.state.selectedSuppliers = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : '';
		queryService.state.selectedWL = ''; // seller custom list
		queryService.state.selectedDateRange = '12';
		queryService.state.selectedScoreType = '';
		queryService.state.viewSelectedFlag = false;
		queryService.selectedSupplier2 = null; // reset
		queryService.selectedSupplierName2 = null; // reset
		queryService.state.selectedDateRangeLabel = '12 months'; */
		
    };
	queryService.resetFilterCategoryOptions = $scope.resetFilterCategoryOptions;
	queryService.defaultCategoryOptions = $scope.defaultCategoryOptions;
	
 }])