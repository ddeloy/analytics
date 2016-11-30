//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardPerfTrendControllerDual
 * @description
 * # ScorecardPerfTrendControllerDual
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('ScorecardPerfTrendControllerDual',['$scope', '$http', 'queryService', '$rootScope', function($scope, $http, queryService, $rootScope) {
	
	// Order: ['cancel_percent', 'confirmed240', 'ontimepickup', 'reconciled_percent', 'total_fill_rate', 'price_competitiveness', 'seller_month_price_volatility', ];

    queryService.scPerfChart = function(divId, buttonId) {
		
		// summary
		var perfTrend = queryService.sc.weeklyScoreTs;
		var categoryAvg = queryService.sc.categoryAvgScoreTs;
		var target = queryService.sc.info.scs.targets;
		var percent = ''; // variable to add % suffix where needed
		var chartTitle = '12-Month Performance Trend';
		var exportChartName = 'perf-chart';
		
		// kpis
		if(divId.indexOf('cancel') > -1 ) {
			perfTrend = queryService.sc.weeklyKpiTs[0];
			categoryAvg = queryService.sc.categoryAvgKpiTs[0];
			target = target.cancel_percent;
			percent = '%';
			chartTitle='12-Month Cancellation by Seller Trend';
			
		} else if(divId.indexOf('responsiveness') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[1];
			categoryAvg = queryService.sc.categoryAvgKpiTs[1];
			target = target.confirmed240;
			percent = '%';
			chartTitle='12-Month Supplier Responsiveness Trend';

			
		} else if(divId.indexOf('ontimepu') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[2];
			categoryAvg = queryService.sc.categoryAvgKpiTs[2];
			target = target.ontimepickup;
			percent = '%';
			chartTitle='12-Month On-Time Pick Up Trend';

			
		} else if(divId.indexOf('reconcile') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[3];
			categoryAvg = queryService.sc.categoryAvgKpiTs[3];
			target = target.reconciled;
			percent = '%';
			chartTitle='12-Month Reconciliation Trend';

			
			
		} else if(divId.indexOf('fillrate') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[4];
			categoryAvg = queryService.sc.categoryAvgKpiTs[4];
			target = target.total_fill_rate;
			percent = '%';
			chartTitle='12-Month Fill Rate Trend';
			exportChartName='fill-rate';
			
		} else if(divId.indexOf('percenttarget') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[5];
			categoryAvg = queryService.sc.categoryAvgKpiTs[5];
			/*Don't show target for percenttarget
			target = target.percenttarget; */
			percent = '%';
			chartTitle='12-Month On Target Trend';
			
			
		} else if(divId.indexOf('competitiveness') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[6];
			categoryAvg = queryService.sc.categoryAvgKpiTs[6]; // 6 is correct for categoryAvg
			target = target.price_competitiveness; 
			percent = '%';
			chartTitle='12-Month Price Competitiveness Trend';

			
		} else if(divId.indexOf('volatility') > -1 ) { 
			perfTrend = queryService.sc.weeklyKpiTs[8];
			categoryAvg = queryService.sc.categoryAvgKpiTs[7]; // 7 is correct for categoryAvg
			target = target.seller_month_price_volatility; 
			percent = '%';
			chartTitle='12-Month Price Volatility Trend';

		}
		
		var showAvg = true;
		if(queryService.scShowAvg[buttonId] === 0) showAvg = false;
		$(buttonId).prop('checked', showAvg);
      $(divId).highcharts({
        title: {
            text: chartTitle,
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
			plotLines: [{ 
							color: '#f5c28b',
							width: 2,
							value: target,
							dashStyle: 'longdashdot',
							zIndex: 99999999
						}],
        },
		
		credits:{
			enabled:false
		},
		
		exporting: {
			filename: exportChartName, // custom file name for export
            buttons: {
                contextButton: {
                    menuItems: [
                    {
                        text: 'Print',
                        onclick: function () {
                            this.print()
                               
                        }
                    },
                    {
                        text: 'Export to JPG',
                        
                        onclick: function () {
                            this.exportChart({
                                type: 'image/jpeg',
                            });
                        }
                    }, {
                        text: 'Export to PNG',
                        onclick: function () {
                            this.exportChart();
                        },
                      //  separator: false
                    },
                    {
                        text: 'Export to PDF',
                        
                        onclick: function () {
                            this.exportChart({
                                type: 'application/pdf',
                            });
                        }
                    },
                    ]
                    }
                    }
                    },

		
	/*	exporting: {
			filename:exportChartName,
            chartOptions: {
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                }
            }
        },
	*/
		/*exporting:{
			enabled:true
		},
		*/

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: percent
        },
        legend: {
            layout: 'horizontal',
            backgroundColor: '#FFFFFF',
            floating: true,
            align: 'left',
            x: 100,
            verticalAlign: 'top',
            y: 20,
			enabled:false
        },
		/*
		legend: {
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 0
        },
		*/

        series: [{
			animation:false,
            name: 'Overall Supplier Performance',
			type:'area',
            data: perfTrend,
			marker: {
				radius: 2,
                fillColor: 'white',
                lineWidth: 1,
				symbol: 'circle',
                lineColor: '#7095b9',
			   // lineColor:Highcharts.getOptions().colors[0]
            },
           // linkedTo: ':previous',
		    color:'#7095b9',
           // color: Highcharts.getOptions().colors[0],
            fillOpacity: 0.35,
			lineWidth:1,
            zIndex: 1,
           
        }, {
			animation:false,
            name: 'Category Average Performance',
            data: categoryAvg,
            type: 'line',
             marker: {
				radius: 2,
                fillColor: '#57707e',
                lineWidth: 0,
				symbol: 'circle',
                lineColor: '#57707e',
				fillOpacity: 1.0,
			   // lineColor:Highcharts.getOptions().colors[0]
            },
           // linkedTo: ':previous',
		    color:'#57707e',
           // color: Highcharts.getOptions().colors[0],
            fillOpacity: 1.0,
			lineWidth:1,
            zIndex: 2,
			visible:showAvg
        }]
    });
	
// the button action
    $(buttonId).change(function () {
        var series = $(divId).highcharts().series[1];
        if (this.checked) {
			queryService.scShowAvg[buttonId] = 1;
            series.show();
        } else {
			queryService.scShowAvg[buttonId] = 0;
            series.hide();
        }
    });
	
};

$scope.init = function(divId, buttonId) {	//reinit	
	// $scope.id = divId;
	if(queryService.sc && queryService.sc.categorySpendTs) {
		queryService.scPerfChart(divId, buttonId);
		// console.log('init scPerfChart ' + divId + ' ' + buttonId);
	}
};

	
}]);