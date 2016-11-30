//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ScorecardSpendTrendController
 * @description
 * # ScorecardSpendTrendController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
   .controller('ScorecardSpendTrendController',['$scope', '$http', 'queryService', '$rootScope', function($scope, $http, queryService, $rootScope) {
	
    queryService.scSpendChart = function(divId) {
		var data = queryService.sc.categorySpendTs;
		
        $(divId).highcharts({
            chart: {
                zoomType: 'x'
            },
            title: {
                text: '',
				align:'left'
            },
            subtitle: {
                text: 'Spend',
				x:45,
				y:32,
				align:'left'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
				min:0,
                title: {
                    text: ''
                }
            },
			exporting: {
			filename: 'spend-chart', // custom file name for export
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

    

		/*	exporting:{
				enabled:true
			},
			*/
			navigation: {
				/* menuStyle: {
					position:'relative',
					bottom: '20px'
				},
				*/
			buttonOptions: {
				    verticalAlign: 'bottom',
				//	y: 25,
				//	x:-10
			}
			},
            legend: {
                enabled: false
            },
			credits: {
                enabled: false
            },
			tooltip: {
            valuePrefix: '$'
        	},
			plotOptions: {
                area: {
					color:'#7095b9',
					fillOpacity: .35,


                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },

            series: [{
				animation:false,
                type: 'area',
                name: '12 Month Spend Trend',
                data: data
            }]
        });
};

$scope.init = function(divId) {	//reinit	
	// $scope.id = divId;
	if(queryService.sc && queryService.sc.categorySpendTs) { //switch tabs
		queryService.scSpendChart(divId);
		console.log('init scSpendChart ' + divId);
	}
};

 }]);