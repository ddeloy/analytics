//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardTemplateController
 * @description
 * # ScorecardTemplateController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('ScorecardTemplateController',['$scope', function ($scope) {
    $scope.templates =
      [{ name: 'Category Performance by KPI', url: 'views/scorecard/cat-perf-kpi.html'},
       { name: 'Category Performance by DC', url: 'views/scorecard/dc-cat-perf.html'},
	   { name: 'DC Performance by KPI', url: 'views/scorecard/dc-cat-perf-kpi.html'}];
    $scope.template = $scope.templates[0];
  }])