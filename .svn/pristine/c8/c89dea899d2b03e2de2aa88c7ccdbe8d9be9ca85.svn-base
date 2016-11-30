//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:AdminUserController
 * @description
 * # AdminUserController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
    .controller('AdminUserController',['$scope','$filter', 'NgTableParams', '$sce', '$http', function($scope,$filter,NgTableParams, $sce, $http) {

    $scope.fetchUserList = function() {
      $http({method: 'GET', url: '/user/list'}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.data = data.result;
		  		var data = [];
				$scope.data.forEach(function (u, index) {
					var userStatus = u.inactive ? 'Inactive': 'Active';
					var role = u.roles.indexOf("ROLE_ADMIN") == -1 ? (u.roles.indexOf("ROLE_SUPERADMIN") > -1 ? "Admin" : (u.roles.indexOf("ROLE_PRESENTATION") > -1 ? "Presentation": "Standard")) : "Admin";
					data.push({id: u.id, lastname: u.lastName, firstname: u.firstName, userrole:role, email:u.email, status:userStatus});
				});

				 $scope.tableParams = new NgTableParams({
					page: 1,            // show first page
					count: 50,          // count per page
					filter: {
						lastname: ''       // initial filter
					},
					sorting: {
						lastname: 'asc'     // initial sorting
					}
				}, {
					total: data.length, // length of data
					getData: function($defer, params) {
						// use built-in angular filter
						var filteredData = params.filter() ?
								$filter('filter')(data, params.filter()) :
								data;
						var orderedData = params.sorting() ?
								$filter('orderBy')(filteredData, params.orderBy()) :
								data;

						params.total(orderedData.length); // set total for recalc pagination
						$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
					}
				});

        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
	};

					 $scope.fetchUserList(); // initialize
                
}]);
