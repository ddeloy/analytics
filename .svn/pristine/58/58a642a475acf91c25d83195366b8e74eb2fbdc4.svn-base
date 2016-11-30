//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:SuppOverviewBizStatsController
 * @description
 * # SuppOverviewBizStatsController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
    .controller('SuppOverviewBizStatsController',['$scope', '$rootScope', '$http', 'queryService', function($scope, $rootScope, $http, queryService) {
		// test for proper context: alert('in category controller rootscope.stateparams is set to:' + $rootScope.$stateParams.pagecontext);
        queryService.calculateBizMetrics();

}]);