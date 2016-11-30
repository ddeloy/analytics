//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardSummaryHeatMapController
 * @description
 * # ScorecardSummaryHeatMapController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .controller('ScorecardSummaryHeatMapController',['$scope', function($scope) {
	  /* Left Side: 90-Day Score Comparison (YoY) */
	  /* ***************************** */
	  /* Last 90 Days - 2016 */
	  $scope.ninetydays = [
		{name:'Last 90 Days - 2016', score:71, fillrate:52, ontime:83,cancel:73, reconcile:87,responsive:84, compete:62,volatility:92, target:88}
	  ];
	  /* Same Period - 2015 */
		$scope.prevninetydays = [
		{name:'Same Period - 2015', score:77, fillrate:62, ontime:84,cancel:78, reconcile:86,responsive:88, compete:67,volatility:92, target:83}
	  ];
	  /* End 90-Day Score Comparison (YoY) */
	  
	  
	  /* Right Side: Annual Score Comparison (Rolling 365) */
	  /* ***************************** */
	  /* Last 365 Days */
		$scope.threesixtyfivedays = [
		{name:'Last 365 Days', score:85, fillrate:75, ontime:83,cancel:73, reconcile:63,responsive:82, compete:62,volatility:91, target:52}
	  ];
	  /* Previous 365 Days */
		$scope.prevthreesixtyfivedays = [
		{name:'Previous 365 Days', score:92, fillrate:80, ontime:61,cancel:78, reconcile:86,responsive:88, compete:54,volatility:93, target:87}
	  ];
	  /* End Annual Score Comparison (Rolling 365) */
	  
	  /* Bottom Section: Category Performance */
	  /* ***************************** */
	  /* Heat Map and Category Performance by KPI */
		$scope.summarycategories = [
		{name:'Pears', score:82, fillrate:52, ontime:83,cancel:75, reconcile:87,responsive:85, compete:54,volatility:92, target:88, summaryspend:57458, summaryperfchange:'+1', summaryrank:'8', summarysuppliercount:'12' },
		{name:'Tomatoes', score:88, fillrate:67, ontime:88,cancel:78, reconcile:84,responsive:93, compete:67,volatility:89, target:91, summaryspend:67458,summaryperfchange:'+5', summaryrank:'5', summarysuppliercount:'20'},
		{name:'Value Add - Vegetables', score:91, fillrate:78, ontime:84,cancel:73, reconcile:65,responsive:84, compete:62,volatility:92, target:88, summaryspend:97458,summaryperfchange:'+7', summaryrank:'12', summarysuppliercount:'30'}
	  ];
	  
	  /* Heat Map Category Performance by DC */
	  /* Separated headers from actual data - though we could do headers statically like original heat map */
	  	$scope.dcsummarycategoryheaders = [ // ensure alphabetical order for dcname1 thru 4 and 5 is always Direct to Store.
		{dcname1:'Arizona DC', dcname2:'California DC', dcname3:'Georgia DC', dcname4:'Texas DC', dcname5:'Direct to Store' },
	  ];
	  /* Data ng-repeat */
	  /* When a dcnamescore is 0  I have added an ng-class of rating-none in the dc-cat-perf.html template (dcname3score) */
	  /* Or, if a dcnamescore is ''  we can use css content property to display 'No data available' */
	  	$scope.dcsummarycategories = [
		{name:'Pears', score:53, dcname1score:52, dcname2score:83,dcname3score:'', dcname4score:87, dcname5score:67,summaryspend:57458, summaryperfchange:'+1', summaryrank:'8', summarysuppliercount:'12' },
		{name:'Tomatoes', score:68, dcname1score:67, dcname2score:88,dcname3score:'', dcname4score:84, dcname5score:87,summaryspend:67458,summaryperfchange:'+5', summaryrank:'5', summarysuppliercount:'20'},
		{name:'Value Add - Vegetables', score:72, dcname1score:53, dcname2score:72, dcname3score:'',dcname4score:73, dcname5score:'', summaryspend:97458,summaryperfchange:'+7', summaryrank:'12', summarysuppliercount:'30'},
	    {name:'Beets', score:82, dcname1score:78, dcname2score:83,dcname3score:'', dcname4score:87, dcname5score:67,summaryspend:57458, summaryperfchange:'+1', summaryrank:'8', summarysuppliercount:'12' },
		{name:'Avocados', score:88, dcname1score:86, dcname2score:88,dcname3score:'', dcname4score:84, dcname5score:87,summaryspend:67458,summaryperfchange:'+5', summaryrank:'5', summarysuppliercount:'20'},
		{name:'Cherries', score:91, dcname1score:88, dcname2score:72, dcname3score:'',dcname4score:73, dcname5score:'', summaryspend:97458,summaryperfchange:'+7', summaryrank:'12', summarysuppliercount:'30'},
		{name:'Berries', score:88, dcname1score:90, dcname2score:88,dcname3score:'', dcname4score:84, dcname5score:87,summaryspend:67458,summaryperfchange:'+5', summaryrank:'5', summarysuppliercount:'20'},
		{name:'Oranges', score:91, dcname1score:95, dcname2score:72, dcname3score:'',dcname4score:73, dcname5score:90, summaryspend:97458,summaryperfchange:'+7', summaryrank:'12', summarysuppliercount:'30'}
	  ];


	  /* DC Heat Map Performance by KPI */
		$scope.dckpisummarycategories = [
		{name:'Arizona DC', score:78, fillrate:52, ontime:83,cancel:75, reconcile:87,responsive:85, compete:54,volatility:92, target:88, summaryspend:57458, summaryperfchange:'+1'},
		{name:'California DC', score:82, fillrate:67, ontime:88,cancel:78, reconcile:84,responsive:93, compete:67,volatility:89, target:91, summaryspend:67458,summaryperfchange:'+5'},
		{name:'Georgia DC', score:87, fillrate:78, ontime:84,cancel:73, reconcile:65,responsive:84, compete:62,volatility:92, target:88, summaryspend:97458,summaryperfchange:'+7'},
		{name:'Texas DC', score:89, fillrate:78, ontime:84,cancel:73, reconcile:65,responsive:84, compete:62,volatility:92, target:88, summaryspend:97458,summaryperfchange:'+7'},
		{name:'Direct to Store', score:91, fillrate:88, ontime:74,cancel:79, reconcile:75,responsive:81, compete:52,volatility:82, target:98, summaryspend:87458,summaryperfchange:'+9'}
	  ];
	  
  
}]);