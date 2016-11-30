//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:PricePerfController
 * @description
 * # PricePerfController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('PricePerfDualController',['$scope', '$http', 'queryService', '$rootScope', function($scope, $http, queryService, $rootScope) {
	
    queryService.scPricePerfChart = function() {

		var ranges = queryService.sc.weeklyKpiTs[7];
		var averages = queryService.sc.weeklyKpiTs[6];

    $('#container-priceperf-dual').highcharts({

        title: {
            text: '12-Month Price Performance',
			align:'left',
			style: {
                fontWeight: '600',
                fontSize: '16px',
				fontFamily: 'Open Sans',
				
            }
        },

        xAxis: {
            type: 'datetime'
        },

         yAxis: {
            title: {
                text: null
            },
			 plotBands: [{
				 color: '#666666',
				 width: 2,
				 value: 100.0
				 
			 }],
        },
		
		credits:{
			enabled:false
		},

        tooltip: {
			valueDecimals: 2,
            crosshairs: true,
            shared: true,
            valueSuffix: ''
        },
        legend:{
			enabled:false
		},
		exporting:{
			enabled:true
		},

        series: [{
            name: 'Score',
            data: averages,
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
				lineColor:'#7fa4b8',
			},
				color:'#7fa4b8',
        }, {
            name: 'Range',
            data: ranges,
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
			zIndex: 0,
			color:'#7095b9',
			fillOpacity: .35,
            }]
        });
};

$scope.init = function() {	//reinit	
	if(queryService.sc && queryService.sc.categorySpendTs) { //switch tabs
		queryService.scPricePerfChart();
		console.log('init scPricePerfChart ');
	}
};

 }]);