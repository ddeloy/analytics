//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardSupplierController
 * @description
 * # ScorecardSupplierController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('ScorecardSupplierController',['$scope','$rootScope','$timeout','$http','queryService', function ($scope,$rootScope,$timeout,$http,queryService) {
	//$scope.SupplierOpt = queryService.state.selectedSuppliers;
	//$scope.ScorecardSupplierName = '4Earth Farms';
//	if($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard') { //Start scorecard context
    if($rootScope.defSuppliers) {
		$scope.firstSupplierId = $rootScope.defSuppliers[0].supplierId;
		$scope.firstSupplierName = $rootScope.defSuppliers[0].supplierName;
	}
	if(!queryService.scNavBack) {
		$scope.SupplierOpt = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : $scope.firstSupplierId;
		$scope.ScorecardSupplierName = queryService.selectedSupplierName2? queryService.selectedSupplierName2 : $scope.firstSupplierName;
		queryService.state.selectedSuppliers = $scope.SupplierOpt;
	} else {
		$scope.SupplierOpt = queryService.state.selectedSuppliers;
		queryService.scActiveCategory = queryService.state.selectedCategories;
	}
	queryService.calculateBizMetrics();
	queryService.resetSupplierOpt = function() {
      $scope.SupplierOpt = '';
		if($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard') { //Start scorecard context
			$scope.SupplierOpt = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : $scope.firstSupplierId;
			$scope.ScorecardSupplierName = queryService.selectedSupplierName2? queryService.selectedSupplierName2 : $scope.firstSupplierName;
			queryService.state.selectedSuppliers = $scope.SupplierOpt;
		}
	}
	$scope.$on("filterSuppliers", function(event, newurl){
		$rootScope.updateSupplierListInProcess = true; // start updating

		// $timeout(function() {
			$scope.url = newurl;
			// queryService.state.selectedSuppliers = ''; // unselect any user's previous selections
			$scope.fetch(true);
			$rootScope.updateSupplierListInProcess = false; // done updating
		// }, 1);
/*		$scope.selectedCategories = ''; // unselect previous selections
		$scope.selectedCategories = data; // reset current selected
*/		////console.log('SupplierController- filter suppliers received' + queryService.state.selectedCategories);
	});
	$scope.url = $rootScope.baseUrl+'suppliers';
    $scope.fetch = function() {
	  // if(queryService.state.selectedDateRange === '12' && queryService.state.selectedScoreType === '' && queryService.state.selectedCategories === ''  && queryService.state.selectedWL === '' && $rootScope.defSuppliers) {
	 if($rootScope.defSuppliers) {
		$scope.suppliers = $rootScope.defSuppliers;
 	    $scope.supNames1 = []; //reset
		return;
	  }
      $http({method: 'GET', url: $scope.url, headers: {'X-ORG-ID':$rootScope.bID}}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.suppliers = data.result;
		  if(!$rootScope.defSuppliers) {
			$rootScope.defSuppliers = $scope.suppliers;
			$scope.firstSupplierId = queryService.selectedSupplier2 ? queryService.selectedSupplier2 : $rootScope.defSuppliers[0].supplierId;
			$scope.firstSupplierName = $rootScope.defSuppliers[0].supplierName;
		  }
		  if(!queryService.selectedSupplier2) { // initialize if not clickThru
			  $scope.SupplierOpt = $scope.suppliers[0].supplierId; // pickup first one
			  queryService.state.selectedSuppliers = $scope.SupplierOpt;
  			  queryService.calculateBizMetrics();
		  }
		  // checkAgainstUserSelectedOptions
		  $scope.supNames = []; // really supplier-ids
		  $scope.supNames1 = [];
		  ////console.log('suppliers1');
		  ////console.log($scope.suppliers);
		  for( var i=0; i<$scope.suppliers.length; i++) {
			  $scope.supNames.push($scope.suppliers[i].supplierId + '');
		  }
		/*for(var i=0; i<queryService.state.selectedSuppliers.length; i++) {
			var value = queryService.state.selectedSuppliers[i];
			if(-1 === $.inArray(value, $scope.supNames)) { // error: these are object arrays
				$scope.supNames1.push(value); // Gray these out later 
			}
		}*/
		
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
	};
	}])
	
