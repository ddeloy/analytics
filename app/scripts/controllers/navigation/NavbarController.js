//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:NavbarController
 * @description
 * # DtRangeController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('NavbarController',['$scope','$location', function ($scope,$location) {
	 $scope.routeIs = function(routeName) {
    return $location.path() === routeName;
  };
}])