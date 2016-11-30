//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:SuppOverviewCategoryController
 * @description
 * # SuppOverviewCategoryController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('SuppOverviewCategoryController',['$scope','$rootScope', '$timeout', '$http','queryService', function ($scope,$rootScope, $timeout, $http,queryService) {
	$scope.CategoryOpt = queryService.state.selectedCategories;
	queryService.updateCategoriesInCategoryOverview = function(cats) {
	  console.log('updateCategoriesInCategoryOverview ' + cats);
      $scope.categories = cats;
	}
	queryService.resetCategoryOpt = function() {
      $scope.CategoryOpt = '';
	}
    $scope.method = 'GET';
    $scope.url = $rootScope.baseUrl+'categories';
	
	$scope.$on("filterCategories", function(event, newurl){
		$rootScope.updateCategoryListInProcess = true; // start updating
		// $timeout(function() {
			$scope.url = newurl;
			// queryService.state.selectedCategories = ''; // unselect any user's previous selections
			$scope.fetch(true);
			$rootScope.updateCategoryListInProcess = false; // done updating
		// }, 1);
/*		$scope.selectedCategories = ''; // unselect previous selections
		$scope.selectedCategories = data; // reset current selected
*/		////console.log('CategoryController- filter categories received' + queryService.state.selectedCategories);
	});
		  
    $scope.chkValue = function(v) {

	}
	
    $scope.fetch = function() {
      $scope.code = null;
      $scope.response = null;
	  if(queryService.state.selectedDateRange === '12' && queryService.state.selectedScoreType === '' && queryService.state.selectedSuppliers === '' && queryService.state.selectedWL === '' && $rootScope.defCategories) {
		$scope.categories = $rootScope.defCategories;
		return;
	  }

      $http({method: $scope.method, headers: {'X-ORG-ID':$rootScope.bID}, url: $scope.url}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.categories = data.result;
		  if(!$rootScope.defCategories) {
			$rootScope.defCategories = $scope.categories;
		  }
		  //checkAgainstUserSelectedOptions
		  $scope.catNames = [];
		  $scope.catNames1 = [];
		  ////console.log('categories1');
		  ////console.log($scope.categories);
		for(var i=0; i<$scope.categories.length; i++) {
			$scope.catNames.push($scope.categories[i]);
		}
		for(var i=0; i<queryService.state.selectedCategories.length; i++) {
			var value = queryService.state.selectedCategories[i];
			if(-1 === $.inArray(value, $scope.catNames)) {
				$scope.catNames1.push(value); // Gray these out later 
			}
		}

        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
}}])