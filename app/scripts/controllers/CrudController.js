//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:CrudController
 * @description
 * # CrudController
 * Controller of the tpanalyticsApp
 */
 /* Move Controller (need more appropriate naming convention here) - Pushes from Available Suppliers to Selected Suppliers - Create/Edit Saved Seller Lists*/
angular.module('tpanalyticsApp')
  .controller('MoveCtrl',['$scope', '$http', 'queryService', '$rootScope', function($scope, $http, queryService, $rootScope) {
    $scope.moveItem = function(item, from, to) {
        //console.log('Move item   Item: '+item+' From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined
        var idx=from.indexOf(item);
        if (idx != -1) {
            from.splice(idx, 1);
            to.push(item);      
        }
    };
    $scope.moveAll = function(from, to) {
        //console.log('Move all  From:: '+from+' To:: '+to);
        //Here from is returned as blank and to as undefined

        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };                

	// define scope variables
    $scope.selectedsuppliers = []; 
    $scope.availablesuppliers = []; 
	$scope.wlName = '';
	$scope.SelectedCategories = '';
	$scope.duplicateWLName = false;

    $scope.fetchSupplier = function(init) {
      $scope.code = null;
      $scope.response = null;

      $http({method: 'GET', headers: {'X-ORG-ID':$rootScope.bID}, url: $rootScope.baseUrl+'suppliers?all=true&c=' + $scope.SelectedCategories}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.availablesuppliers = data.result;
		  if(init) { // during init
			var sup = queryService.state.selectedSuppliers;
			if($rootScope.editWL) {
				$scope.wlName = $rootScope.editWL.name;
				sup = $rootScope.editWL.suppliers;
			} else { // clear prior selections from the scope
				$scope.wlName = '';
				sup = queryService.state.selectedSuppliers;
			}
			//console.log('selected suppliers save custom list - ');	
			//console.log(sup);
			for(var i=$scope.availablesuppliers.length-1; i >= 0; i--) { // iterate reverse for splicing
				var w =  $scope.availablesuppliers[i];
				////console.log(w.supplierId);
				////console.log(sup.indexOf(w.supplierId));
				if(sup.indexOf(w.supplierId) > -1 || sup.indexOf(''+w.supplierId) > -1) { // pre-select earlier opted suppliers
					$scope.selectedsuppliers.push(w);
					$scope.availablesuppliers.splice(i, 1); // removed from from-list
				}
				
			}
		  }
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
	};
    $scope.fetchCategory = function() {
      $scope.code = null;
      $scope.response = null;

      $http({method: 'GET', headers: {'X-ORG-ID':$rootScope.bID}, url: $rootScope.baseUrl+'categories?all=true'}).
        success(function(data, status) {
		  $scope.status = status;
          $scope.categories = data.result;
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
	};
    $scope.filterSuppliers = function(c) {
		$scope.SelectedCategories=c;
		$scope.fetchSupplier();
	};
	$scope.validWLName = function() {
		//console.log(queryService.currentWLs);
		if($scope.wlName.trim().length === 0) {
			//alert('Saved list Name cannot be empty');
			$('#error-no-list-name').show();
			return false; //invalid
		}
		if($scope.wlName.trim().length !== 0) {
			//alert('Saved list Name cannot be empty');
			$('#error-no-list-name').hide();
			//return false; //invalid
		}
		for(var i = 0; i < queryService.currentWLs.length; i++) {
			if (queryService.currentWLs[i].name === $scope.wlName) {
				if($rootScope.editWL && $rootScope.editWL.name === $scope.wlName) { 
					// while editing a wl it's okay to have same name
				} else {
					//alert('Duplicate Saved list name: ' + $scope.wlName);
					$('#error-dupe-list-name').show();
					return false; //invalid
				}
			}
			
			if (queryService.currentWLs[i].name !== $scope.wlName) {
				if($rootScope.editWL && $rootScope.editWL.name !== $scope.wlName) { 
					// while editing a wl it's okay to have same name
				} else {
					//alert('Duplicate Saved list name: ' + $scope.wlName);
					$('#error-dupe-list-name').hide();
					//return false; //invalid
				}
			}
			
			
			
		}
		if ($scope.selectedsuppliers.length === 0) {
			//alert('Please select suppliers to be added');
			$('#error-select-suppliers').show();
			
			return false; //invalid
		}
		
		
		
		return true;
	};
	// Update action
   $scope.updateCustomList = function(del) {
	 if(!del) { // add/edit
		if(!$scope.validWLName()) return;
		$scope.addOrEditWatchlist();
	 } else { // delete
		if(confirm($scope.wlName + ' will be permanently deleted.') === true) {
			$scope.delWatchlist();
			window.location.reload();
		} else {
			return;
		}
	 }
	 this.$hide();
	 
   };
    $scope.addOrEditWatchlist = function () {
		var selectedSupplierIds = [];
		//console.log($scope.selectedsuppliers)
		for(var i=0; i<$scope.selectedsuppliers.length; i++) {
			//console.log('ids array ' + $scope.selectedsuppliers[i].supplierId)
			selectedSupplierIds.push($scope.selectedsuppliers[i].supplierId);
		}
		//console.log('ids array ' + selectedSupplierIds)

		var watchlistToAdd = {
		  name: $scope.wlName,
		  suppliers: selectedSupplierIds,
		  userid: $rootScope.userid
		};
		var id = $rootScope.editWL ? '/'+$rootScope.editWL.id : '';
		var url = $rootScope.baseUrl+'watchlists' + id;
		$http({method: $rootScope.editWL ? 'POST' : 'PUT', headers: {'X-ORG-ID':$rootScope.bID, 'X-USER-ID':$rootScope.userid}, url: url, data: watchlistToAdd}).then(function(response){
			return response.data.id;
		}).then(function(newWLid){
			queryService.resetWLs(newWLid);
			return newWLid;
		});/*.then(function(newWLid){
			queryService.setParam('wl', newWLid);
		});*/
    };

    $scope.delWatchlist = function () {
		var id = '/'+$rootScope.editWL.id;
		var url = $rootScope.baseUrl+'watchlists' + id;
		$http({method: 'DELETE', headers: {'X-ORG-ID':$rootScope.bID}, url: url, data: null}).then(function(response){
			return '';
		}).then(function(newWLid){
			queryService.resetWLs(newWLid, true);
			return newWLid;
		});/*.then(function(newWLid){
			queryService.setParam('wl', newWLid);
		});*/
    };

  }]);  
