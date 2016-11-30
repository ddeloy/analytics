//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:KpiSettingsControler
 * @description
 * # KpiSettingsControler
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
    .controller('KpiSettingsController',['$scope', '$rootScope', '$http','$timeout', function ($scope, $rootScope, $http,$timeout) {
	   $scope.disableSlider = true;
	   $scope.editSettings = false;

	   $scope.showEditSettings = function() {
     	 $scope.editSettings = true;
		 $scope.disableSlider = false;
		 $timeout(function() {
         $scope.$broadcast('rzSliderForceRender');
      });
       };
	   
		// displayMaps
		$scope.displayMapCore = { // map of kpisettingname -> displayName
			score : 'Score', 
			spend : 'Spend',
		};
		
		$scope.displayMapPrice = { // map of kpisettingname -> displayName
			price_competitiveness_score : 'Price Competitiveness', 
			seller_month_price_volatility_score : 'Price Volatility', 
		};

		$scope.displayMapService = { // map of kpisettingname -> displayName
			total_fill_rate_score : 'Total Fill Rate',
			cancel_percent_score : 'Cancellations',
			reconciled_score : 'Reconciliations', 
			confirmed240_score: 'Supplier Responsiveness - 4 hrs',
			ontimepickup_score : 'On-Time Pick Up', 
		};
		
		$scope.displayMapOther = { // map of kpisettingname -> displayName
			percenttarget_score : 'On Target',
		};

		$scope.definitionSignificanceValues = { // map of kpisettingname -> [definition, significance]
			total_fill_rate_score : ['The fill rate is the percent of cases a supplier fulfills based off the buyer’s desired quantity.', 'This KPI is an indicator of sourcing reliability. The closer this number is to 100%, the better.'],
			cancel_percent_score : ['Cancellations refers to the percent of line items a supplier cancels across all POs.', 'This KPI is an indicator of sourcing reliability. This number should be as close to zero as possible.'],
			reconciled_score : ['Reconciliations refers to the percent of invoice lines flagged for reconciliation that have an item, price, or quantity difference across all orders.', 'A high rate of reconciliations may indicate that the supplier has operational process issues. This number should be as close to zero as possible.'],
			confirmed240_score: ['Supplier responsiveness is the percent of times an order is confirmed within 4 hours by the supplier after an order is sent.', 'This KPI is an indicator of good customer service on the part of your trading partner. The closer this number is to 100%, the more certain you are sooner about your order.'],
			ontimepickup_score : ['On-time pick up is the percent of time the supplier is ready to load an order on the scheduled pick up date.', 'This KPI is an indicator of sourcing reliability. The closer this number is to 100%, the better.'],
			price_competitiveness_score : ['Price competitiveness indicates whether the seller’s price is above, below, or close to the average price for all suppliers.', 'This KPI is an indicator of pricing performance. The product price is cheaper the further it moves below 100%.'],
			seller_month_price_volatility_score : ['Price volatility is the degree to which the seller’s product price varies within that time period.', 'This KPI is an indicator of pricing performance. The closer this number is to zero, the more consistent the price is within the timeframe.'],
			percenttarget_score : ['The percent of active KPIs reaching their targeted performance goals within the selected time period', 'This KPI is an indicator of overall performance. The closer this number is to 100%, the better.'],

		};

		$scope.saveSettings = function(kpisettingname) {
      	$scope.editSettings = false;
		$scope.disableSlider = true;
		
		if(kpisettingname != 'spend') {
			var currentVal = $scope.settingsMap[kpisettingname];
			var wtStr = currentVal['wt'] === 1 ? 'LOW' : currentVal['wt'] === 2 ? 'MED' : 'HI';
			currentVal['weight'] = wtStr;
			if($scope.settingsMapPristine[kpisettingname]['weight'] == 'MED' && currentVal['weight'] != 'MED') {
				$rootScope.adjustWtCount++;
			} else if($scope.settingsMapPristine[kpisettingname]['weight'] != 'MED' && currentVal['weight'] == 'MED') {
				$rootScope.adjustWtCount--;
			}
			$scope.settingsMapPristine[kpisettingname]['target'] = currentVal['target'];  // store new
			$scope.settingsMapPristine[kpisettingname]['includeInScoreCalculation'] = currentVal['includeInScoreCalculation'];  // store new
			$scope.settingsMapPristine[kpisettingname]['display'] = currentVal['display'];  // store new
			$scope.settingsMapPristine[kpisettingname]['weight'] = currentVal['weight'];  // store new
			$scope.settingsMapPristine[kpisettingname]['wt'] = currentVal['wt'];  // store new
			
			/* Use to hide show when include or exclude from tools view */
			var showTotalFillRate =	$scope.settingsMap['total_fill_rate_score']['includeInScoreCalculation'];
			$rootScope.showTotalFillRate = showTotalFillRate;
			
		    var showCancellations =	$scope.settingsMapPristine['cancel_percent_score']['includeInScoreCalculation'];
			$rootScope.showCancellations = showCancellations;
			
		    var showReconciliations =	$scope.settingsMapPristine['reconciled_score']['includeInScoreCalculation'];
			$rootScope.showReconciliations = showReconciliations;

		    var showResponsiveness =	$scope.settingsMapPristine['confirmed240_score']['includeInScoreCalculation'];
			$rootScope.showResponsiveness = showResponsiveness;

		    var showOntimePickup =	$scope.settingsMapPristine['ontimepickup_score']['includeInScoreCalculation'];
			$rootScope.showOntimePickup = showOntimePickup;

		    var showPriceCompete =	$scope.settingsMapPristine['price_competitiveness_score']['includeInScoreCalculation'];
			$rootScope.showPriceCompete = showPriceCompete;

		    var showPriceVol =	$scope.settingsMapPristine['seller_month_price_volatility_score']['includeInScoreCalculation'];
			$rootScope.showPriceVol = showPriceVol; 
			
			// new kpi
		    var showPercentTarget =	$scope.settingsMapPristine['percenttarget_score']['includeInScoreCalculation'];
			$rootScope.showPercentTarget = showPercentTarget; 

		
			$scope.modifySetting({
			 buyerId: currentVal['buyerId'],
			 name: kpisettingname,
			 modifiedBy: "1",
			 includeInScoreCalculation: currentVal['includeInScoreCalculation'],
			 display: currentVal['display'],
			 target: currentVal['target'],
			 weight: wtStr
			});
		}
		
		$timeout(function() {
        $scope.$broadcast('rzSliderForceRender');
      });
       };
	
	   $scope.cancelSettings = function(kpisettingname){
		$scope.settingsMap[kpisettingname]['target'] = $scope.settingsMapPristine[kpisettingname]['target']; // revert to old
		$scope.settingsMap[kpisettingname]['includeInScoreCalculation'] = $scope.settingsMapPristine[kpisettingname]['includeInScoreCalculation']; // revert to old
		$scope.settingsMap[kpisettingname]['display'] = $scope.settingsMapPristine[kpisettingname]['display']; // revert to old
		$scope.settingsMap[kpisettingname]['weight'] = $scope.settingsMapPristine[kpisettingname]['weight']; // revert to old
		$scope.settingsMap[kpisettingname]['wt'] = $scope.settingsMapPristine[kpisettingname]['wt']; // revert to old
		$scope.editSettings = false;
		$scope.disableSlider = true;
		$timeout(function() {
        $scope.$broadcast('rzSliderForceRender');
      });
	   }
   

    $scope.queryKpiRanges = function () {
		
      $http.get($rootScope.baseUrl + 'kpimetadata', {
        headers: {'X-ORG-ID':$rootScope.bID}
      }).success(function (data, status, headers, config) {
          $scope.ranges = data;
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };

	$scope.queryActiveSettings = function (resetKS) {

      $http.get($rootScope.baseUrl + 'kpisettings', {
        headers: {'X-ORG-ID':$rootScope.bID, 'X-USER-ID':$rootScope.userid,'reset-kpi-settings':resetKS}
      }).success(function (data, status, headers, config) {
          
		  // $scope.settings = data;
		  
		  $scope.settingsMap = {}; // lookup based on tagName
		  $rootScope.adjustWtCount = 0;
		  for(var i = 0; i< data.length; i++) {
			  var s = data[i];
			  $scope.settingsMap[s.name] = s;
			  if(s.weight != 'MED') $rootScope.adjustWtCount++;
		  }
		  $scope.settingsMap['spend'] = {name: 'spend', weight: 'MED', includeInScoreCalculation: true, display: true}; // no value returned by API set spend a default value.		
		  
		  // order the settings according to displayMap entries
		  $scope.settingsCore = $scope.collectDisplayGroup($scope.displayMapCore);
		  $scope.settingsPrice = $scope.collectDisplayGroup($scope.displayMapPrice);
		  $scope.settingsService = $scope.collectDisplayGroup($scope.displayMapService);
		  $scope.settingsOther = $scope.collectDisplayGroup($scope.displayMapOther);


		  $scope.settingsMapPristine = angular.copy($scope.settingsMap); // Deep Copy
		  console.log($scope.settingsMap);
		  console.log($scope.settingsMapPristine);
		  
		  			/* Use to hide show when Include KPI in Score */
			var showTotalFillRate =	$scope.settingsMap['total_fill_rate_score']['includeInScoreCalculation'];
			$rootScope.showTotalFillRate = showTotalFillRate;
			
		    var showCancellations =	$scope.settingsMap['cancel_percent_score']['includeInScoreCalculation'];
			$rootScope.showCancellations = showCancellations;
			
		    var showReconciliations =	$scope.settingsMap['reconciled_score']['includeInScoreCalculation'];
			$rootScope.showReconciliations = showReconciliations;

		    var showResponsiveness =	$scope.settingsMap['confirmed240_score']['includeInScoreCalculation'];
			$rootScope.showResponsiveness = showResponsiveness;

		    var showOntimePickup =	$scope.settingsMap['ontimepickup_score']['includeInScoreCalculation'];
			$rootScope.showOntimePickup = showOntimePickup;

		    var showPriceCompete =	$scope.settingsMap['price_competitiveness_score']['includeInScoreCalculation'];
			$rootScope.showPriceCompete = showPriceCompete;

		    var showPriceVol =	$scope.settingsMap['seller_month_price_volatility_score']['includeInScoreCalculation'];
			$rootScope.showPriceVol = showPriceVol; 
			
			// new kpi
		    var showPercentTarget =	$scope.settingsMapPristine['percenttarget_score']['includeInScoreCalculation'];
			$rootScope.showPercentTarget = showPercentTarget; 

		  
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };

    $scope.collectDisplayGroup = function(displayMap, hasDefnSignificance) {
		  var settings1 = [];
		  for (var kpisettingname in displayMap) {
  			  if (displayMap.hasOwnProperty(kpisettingname)) {
				  var s = {};
				  var wt = 2;

				  if(kpisettingname === 'score') {
					  s['name'] = 'score';
				  } else {
					  s = $scope.settingsMap[kpisettingname];
					  wt = s['weight'];
					  s['wt'] = wt === 'LOW' ? 1 : wt === 'MED' ? 2 : 3;
				  }
				  s['displayName'] = displayMap[kpisettingname];
			      settings1.push(s);
				  
				  //set definitionSignificanceValues
				  var vals = $scope.definitionSignificanceValues[kpisettingname];
				  if(vals) { // for Core they are not defined
					  s['definition'] = vals[0];
					  s['significance'] = vals[1];
				  }
			  }
		  }
		  console.log(settings1);
		  return settings1;
	}
	
    $scope.modifySetting = function (settingToModify) {
		console.log('modifying... ');
		console.log(settingToModify);

      $http.post($rootScope.baseUrl + 'kpisettings',
        settingToModify, {
          
        }).success(function (data, status, headers, config) {
          $scope.newSetting = data;
        }).error(function (data, status, headers, config) {
          throw new Error('Something went wrong...');
        });
    };
  }]);