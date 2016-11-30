//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:CatOverviewBizStatsController
 * @description
 * # CatOverviewBizStatsController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
    .controller('CatOverviewBizStatsController',['$scope', '$rootScope', '$http', 'queryService', function($scope, $rootScope, $http, queryService) {
		// test for proper page context: alert('in category controller rootscope.stateparams is set to:' + $rootScope.$stateParams.pagecontext);
        queryService.calculateBizMetricsCategory();
		
 
}]);