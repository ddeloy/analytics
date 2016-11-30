//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.directive:onFinishChart
 * @description
 * # onFinishChart directive
 * Directive of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
  .directive('onFinishChart', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    if ( !! attr.onFinishChart) {
                        $parse(attr.onFinishChart)(scope);
                    }
                });
            }
            if (!!attr.onStartChart) {
                if (scope.$first === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatStarted');
                        if ( !! attr.onStartChart) {
                            $parse(attr.onStartChart)(scope);
                        }
                    });
                }
            }
        }
    }
}])
/* Summary Tab: Supplier Comparison  - Controller with access to query service injected*/ /* OK */
.controller('SummaryComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartSummaryRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering 12 of summary comparison called by the directive, when ng-repeat finished');
    $('#container-summarytab-12').highcharts({  // chart container
        data: {
            table: 'datatable-summarytab-12' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.score.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
		
			exporting: {
			filename: 'supp-comp-summary-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Score:' + '</b>' + ' ' + this.point.y ;
            }
        },
    });
$scope.callHighchartSummaryRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 summary comparison called by the directive, when ng-repeat finished');
    $('#container-summarytab-30').highcharts({ // chart container
        data: {
            table: 'datatable-summarytab-30' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.score.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-summary-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},

		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Score:' + '</b>' + ' ' + this.point.y ;
            }
        },
    });
};  
	}}])

/* Service Tab: Fill Rate - Controller with access to query service injected */ /* OK */
.controller('ServiceFillRateComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartServiceFillRateRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month fill rate called by the directive, when ng-repeat finished');
    $('#container-servicetab-fillrate-12').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-fillrate-12' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.total_fill_rate.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-fillrate-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Fill Rate:' + '</b>' + ' ' + this.point.y + '%' ;
            }
        },
    });

$scope.callHighchartServiceFillRateRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 month fill rate called by the directive, when ng-repeat finished');
    $('#container-servicetab-fillrate-30').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-fillrate-30' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.total_fill_rate.length * 23 + 50 // multiply no of items * 25px for dynamic height - adj for blank 1st line
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-fillrate-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height   maybe total fill.length * 25 / total fill.length
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Fill Rate:' + '</b>' + ' ' + this.point.y + '%' ;
           }
        },
    });
};  
}}])

/* Service Tab: On Time Pickup - Controller with access to query service injected */ /* OK */
.controller('ServiceOnTimePickUpComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartServiceOnTimePickupRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month on time pickup called by the directive, when ng-repeat finished');
    $('#container-servicetab-ontimepickup-12').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-ontimepickup-12' // hiden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.ontimepickup.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-ontimepu-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'On Time Pick up:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	 $scope.callHighchartServiceOnTimePickupRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day on time pickup called by the directive, when ng-repeat finished');

    $('#container-servicetab-ontimepickup-30').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-ontimepickup-30' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.ontimepickup.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-ontimepu-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
               pointWidth: 16 // fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'On Time Pick up:' + '</b>' + ' ' + this.point.y + '%';
           }
        },
    });
};  
}}])


/* Service Tab: Cancellations - Controller with access to query service injected */ /* OK */
.controller('ServiceCancellationsComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartCancellationsRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month cancellations called by the directive, when ng-repeat finished');
    $('#container-servicetab-cancellations-12').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-cancellations-12' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.cancel_percent.length * 23 + 50  // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-cancel-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar heiught
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Cancellations:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	$scope.callHighchartCancellationsRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day cancellations called by the directive, when ng-repeat finished');
    $('#container-servicetab-cancellations-30').highcharts({  // chart container
        data: {
            table: 'datatable-servicetab-cancellations-30' // hidden table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.cancel_percent.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-cancel-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixe bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Cancellations:' + '</b>' + ' ' + this.point.y + '%';
           }
        },
    });
};  
}}])

/* Service Tab: Reconciliations - Controller with access to query service injected */ /* OK */
.controller('ServiceReconciliationsComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartReconciliationsRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month reconciliations called by the directive, when ng-repeat finished');
    $('#container-servicetab-reconciliations-12').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-reconciliations-12' // hidden data table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.reconciled_percent.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-reconcile-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Reconciliations:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	$scope.callHighchartReconciliationsRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day reconciliations called by the directive, when ng-repeat finished');
    $('#container-servicetab-reconciliations-30').highcharts({ // 30 day chart container
        data: {
            table: 'datatable-servicetab-reconciliations-30' // hidden data table (30-day) captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.reconciled_percent.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-reconcile-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Reconciliations:' + '</b>' + ' ' + this.point.y + '%';
  }
        },
    });
};  
}}])

/* Service Tab: Responsiveness - Controller with access to query service injected */ /* OK */
.controller('ServiceResponsivenessComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartResponsivenessRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month responsiveness called by the directive, when ng-repeat finished');
    $('#container-servicetab-responsiveness-12').highcharts({ // chart container
        data: {
            table: 'datatable-servicetab-responsiveness-12' // hidden data table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.confirmed240.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-responsive-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Responsiveness:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
 $scope.callHighchartResponsivenessRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day responsiveness called by the directive, when ng-repeat finished');
    $('#container-servicetab-responsiveness-30').highcharts({ // 30 day chart container
        data: {
            table: 'datatable-servicetab-responsiveness-30' // hidden data table (30-day) captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.confirmed240.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-responsive-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Responsiveness:' + '</b>' + ' ' + this.point.y + '%';
  }
        },
    });
};  
}}])

/* Pricing Tab: Volatility - Controller with access to query service injected */ /* OK */
.controller('PricingVolatilityComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartPriceVolatilityRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month price volatility called by the directive, when ng-repeat finished');
    $('#container-pricingtab-volatility-12').highcharts({ // chart container
        data: {
            table: 'datatable-pricingtab-volatility-12' // hidden data table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.seller_month_price_volatility.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-volatility-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Volatility:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	$scope.callHighchartPriceVolatilityRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day price volatility called by the directive, when ng-repeat finished');
    $('#container-pricingtab-volatility-30').highcharts({ // 30 day chart container
        data: {
            table: 'datatable-pricingtab-volatility-30' // hidden data table (30-day) captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.seller_month_price_volatility.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-volatility-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Volatility:' + '</b>' + ' ' + this.point.y + '%';
  }
        },
    });
};  
}}])


/* Pricing Tab: Competitiveness - Controller with access to query service injected */ 
.controller('PricingCompetitivenessComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartPriceCompetitivenessRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month price competitiveness called by the directive, when ng-repeat finished');
    $('#container-pricingtab-competitiveness-12').highcharts({ // chart container
        data: {
            table: 'datatable-pricingtab-competitiveness-12' // hidden data table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.price_competitiveness.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-competitiveness-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Competitiveness:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	$scope.callHighchartPriceCompetitivenessRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day price competitiveness called by the directive, when ng-repeat finished');
    $('#container-pricingtab-competitiveness-30').highcharts({ // 30 day chart container
        data: {
            table: 'datatable-pricingtab-competitiveness-30' // hidden data table (30-day) captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.price_competitiveness.length * 25 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-competitiveness-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Competitiveness:' + '</b>' + ' ' + this.point.y + '%';
  }
        },
    });
};  
}}])



/* Other Tab: percentarget - Controller with access to query service injected */
.controller('PercentTargetComparisonController',['$scope','queryService', function ($scope,queryService) {
    $scope.callHighchartPercentTargetRendering12 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 12 month oercenttarget called by the directive, when ng-repeat finished');
    $('#container-other-percenttarget-12').highcharts({ // chart container
        data: {
            table: 'datatable-other-percenttarget-12' // hidden data table captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp12m.percenttarget.length * 23 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-ontarget-12', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis:{
			labels: {
                useHTML:true, stype: {
                    fontSize:'12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
				color:'#8DB6CD',
                pointWidth: 16 // Fixed bar height
            }
        },
		 tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Competitiveness:' + '</b>' + ' ' + this.point.y + '%';
            }
        },
    });
	$scope.callHighchartPercentTargetRendering30 = function () { // method called by directive to render chart after ng-repeat done
        // console.log('Highchart rendering of 30 day percenttarget called by the directive, when ng-repeat finished');
    $('#container-other-percenttarget-30').highcharts({ // 30 day chart container
        data: {
            table: 'datatable-other-percenttarget-30' // hidden data table (30-day) captures data
        },
        chart: {
            type: 'bar',
			height: queryService.sc.info.cmp30d.percenttarget.length * 25 + 50 // multiply no of items * 23px for dynamic height
        },
        title: {
            text: ''
        },
			exporting: {
			filename: 'supp-comp-ontarget-30', // custom file name for export
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
		navigation: {
		/* menuStyle: {
				position:'relative',
                bottom: '20px'
            },
			*/
		/* menuItemStyle: {
                borderLeft: '20px solid #E0E0E0'
            },
		*/
        buttonOptions: {
                align: 'left',
				y: -12,
			//	x:-10
		}
		},
		credits: {
			enabled:false
		},
		legend: {
			enabled:false
		},
		xAxis: {
			labels: {
                useHTML:true, stype: {
                    fontSize: '12px'
                }
            }
		},
        yAxis: {
			//min:0,
			//max:100,
			opposite: true, // puts y xis at top of chart
            allowDecimals: false,
            title: {
                text: ''
            },
			
        },
		plotOptions: {
            series: {
			   color:'#8DB6CD',
               pointWidth: 16 // Fixed bar height
            }
        },
		tooltip: {
            useHTML:true, formatter: function () {
                return '<b>' + this.point.name + '</b><br/>' +
                    '<b>' + 'Competitiveness:' + '</b>' + ' ' + this.point.y + '%';
  }
        },
    });
};  
}}])

