//'use strict';

/**
* @ngdoc function
* @name tpanalyticsApp.service:QueryService
* @description
* # queryService
* Service of the tpanalyticsApp
*/
/* TABLE OF CONTENTS - highlight and do a find */
// #SupplierBarChart
// #CategoryBarChart
// #SupplierRiskChart
// #CategoryRiskChart
angular.module('tpanalyticsApp')
   // moved onFinishRender to directive file
    .factory('queryService', ['$rootScope', '$http', function($rootScope, $http) {
		// Relative URL
		 $rootScope.baseUrl='../api/v1/'; 
		
		// UNIX URL 
		//$rootScope.baseUrl='http://172.28.9.51:19595/api/v1/';
		// Sekhar URL
		//$rootScope.baseUrl='http://10.28.100.62:9595/api/v1/';
		
		$rootScope.bID = 24610;
		$rootScope.userid = 1;
		//$rootScope.admin = true;
		//$rootScope.n = 2208;


		$http.get('/usrInfo').success(function(data, result, status) {
			$rootScope.bID = data.result.oid;
			$rootScope.userid = data.result.id;
			$rootScope.admin = data.result.admin;
			$rootScope.presentation = data.result.presentation;
			$rootScope.n = data.result.n;
			console.log('ui' + JSON.stringify(data.result));
			ga('set', 'dimension1', $rootScope.bID);
			ga('set', 'dimension2', $rootScope.userid);
		});
        var baseurl = $rootScope.baseUrl;
        var bizoverview = {};
		
        $rootScope.bizoverview = bizoverview;
        var queryService = {};
        $rootScope.queryService = queryService; // easy to access from all controllers

		queryService.prMsgMatrix = [
			["This supplier's prices are stable and more expensive than average.", "This supplier's prices are stable and  close to average.", "This supplier's prices are stable and are less expensive than average."],
			["This supplier's prices fluctuate a little and are more expensive than average.", "This supplier's prices fluctuate a little and are close to average.", "This supplier's prices fluctuate a little and are less expensive than average."],
			["This supplier's prices fluctuate a lot and are more expensive than average.", "This supplier's prices fluctuate a lot and are close to average.", "This supplier's prices fluctuate a lot and are less expensive than average."]
		];

        bizoverview.supplierHdr = ''; // All Suppliers(count) | Selected Suppliers(count)
        bizoverview.supplierSubHdr = ''; // names of selected suppliers
        bizoverview.supplierScoreSubHdr = ''; // names of selected suppliers for Scorecard

        // initialize supplier map
        if (!$rootScope.allSupplierMap) { // only once
            $http({
                method: 'GET',
                url: baseurl + '/suppliers?all=true',
				headers: {
					'X-ORG-ID':$rootScope.bID
				}
            }).
            success(function(data, status) {
                var m = {};
                for (var i = 0; i < data.result.length; i++) {
                    m[data.result[i].supplierId] = data.result[i].supplierName;
                }
                $rootScope.allSupplierMap = m;
                ////console.log('rootScopeAllSuppliersMap');
                ////console.log(m);
            }).
            error(function(data, status) {
                ////console.log('Request failed data: ' + data + ' status: ' + status);
            });
        }
        
        $rootScope.updateSupplierHdr = function() {
            $rootScope.editwatchlist = false;
            $rootScope.savewatchlist = false;
           if($rootScope.curSupplierNames) $rootScope.curSupplierNames.sort();

            if (queryService.state.selectedWL === '' && queryService.state.selectedSuppliers !== '' && queryService.state.selectedSuppliers.length !== 0) { // Selected suppliers
                $rootScope.savewatchlist = true;
                // bizoverview.supplierHdr = 'Selected Suppliers (' + $rootScope.curSupplierNames.length + ')' + ' : ' + $rootScope.curSupplierNames.join(' : ') + ' :: ' + '  ' + 'Selected Categories:' + queryService.state.selectedCategories;
                var selectedSuppNames = [];
                for (var i = 0; i < queryService.state.selectedSuppliers.length; i++) {
                    selectedSuppNames.push($rootScope.allSupplierMap[queryService.state.selectedSuppliers[i]]);
                }
                selectedSuppNames.sort();
                bizoverview.supplierHdr = 'Selected Suppliers (' + queryService.state.selectedSuppliers.length + ')';
                // 1. if active ones are not needed
                bizoverview.supplierSubHdr = selectedSuppNames.join(' : ') + ' : ' + '  ' + ' ' + queryService.state.selectedCategories
                    // 2. if active ones are also needed - commented out per Kris
                    /*  if (selectedSuppNames.length != $rootScope.curSupplierNames.length) {
                          bizoverview.supplierSubHdr += ' :: ' + '  ' + 'Active Suppliers (' + $rootScope.curSupplierNames.length + ')' + ' : ' + $rootScope.curSupplierNames.join(' : ')
                      } */
                    // supplierScoreSubHdr to get just name of the currently selected supplier
                bizoverview.supplierScoreSubHdr = selectedSuppNames.join(' : ');


                if (selectedSuppNames.length != $rootScope.curSupplierNames.length) {
                    bizoverview.supplierScoreSubHdr = $rootScope.curSupplierNames.join(' : ')
                }
                // End get name of currently selected supplier in scorecards	  
            } else if (queryService.state.selectedWL === '' && queryService.state.selectedCategories !== '' && queryService.state.selectedCategories.length !== 0) { // Selected categories
                // bizoverview.supplierHdr = 'Active Suppliers (' + $rootScope.curSupplierNames.length + ')' + ' : ' + $rootScope.curSupplierNames.join(' : ') + ' :: ' + '  ' + 'Selected Categories:' + queryService.state.selectedCategories;
                var n = queryService.state.selectedScoreType;
                if (n == 't10' || n == 'b10') { // TopN selected and category selection case
                    n = n === 't10' ? 'Top 10 Performers' : 'Bottom 10 Performers';
					if($rootScope.$stateParams.pagecontext == 'C') {
						n = n === 't10' ? 'Top 10 Categories' : 'Bottom 10 Categories';
					}
                    c = $rootScope.curSupplierNames.length;
                    names = $rootScope.curSupplierNames;
                    bizoverview.supplierHdr = n + ' (' + c + ')';
					if($rootScope.$stateParams.pagecontext == 'C') {
						bizoverview.supplierSubHdr = $rootScope.curSupplierNames.join(' : ');
					} else {
						bizoverview.supplierSubHdr = $rootScope.curSupplierNames.join(' : ') + ' : ' + '  ' + queryService.state.selectedCategories;
					}
                } else {
                    // bizoverview.supplierHdr = 'Active Suppliers (' + $rootScope.curSupplierNames.length + ')';
                    bizoverview.supplierSubHdr = '  ' + queryService.state.selectedCategories;
                }

            } else if (queryService.state.selectedWL !== '') { // Selected WL
                $rootScope.editwatchlist = true;
                var names = [];
                var wl = queryService.getCurrentWL();
                var n = wl.name;
                ////console.log(wl.suppliers);
                ////console.log($rootScope.allSupplierMap);
                var c = wl.suppliers.length;
                for (var i = 0; i < wl.suppliers.length; i++) {
                    ////console.log(wl.suppliers[i]);
                    names.push($rootScope.allSupplierMap[wl.suppliers[i]]);
                }
                // bizoverview.supplierHdr = n + ' (' + c + ')' + ' : ' + names.join(' : ') + ' :: ' + '  ' + 'Selected Categories:' + queryService.state.selectedCategories;
                bizoverview.supplierHdr = n + ' (' + c + ')';
                bizoverview.supplierSubHdr = names.join(' : ') + ' : ' + '  ' + ' ' + queryService.state.selectedCategories;
                // if active ones are also needed
                /*  if (c != $rootScope.curSupplierNames.length) {
                    bizoverview.supplierSubHdr += ' : ' + '  ' + 'Active Suppliers (' + $rootScope.curSupplierNames.length + ')' + ' : ' + $rootScope.curSupplierNames.join(' : ')
                } 
				*/
            } else if (queryService.state.selectedScoreType !== '') { // Selected T10/B10
                var names = [];
                var n = queryService.state.selectedScoreType;
                if (n == 't10' || n == 'b10') {
                    n = n === 't10' ? 'Top 10 Performers' : 'Bottom 10 Performers';
					if($rootScope.$stateParams.pagecontext == 'C') {
						n = n === 't10' ? 'Top 10 Categories' : 'Bottom 10 Categories';
					}
                    c = $rootScope.curSupplierNames.length;
                    names = $rootScope.curSupplierNames;
                }
                // bizoverview.supplierHdr = n + ' (' + c + ')' + ' : ' + names.join(' : ') + ' :: ' + '  ' + 'Selected Categories:' + queryService.state.selectedCategories;
                bizoverview.supplierHdr = n + ' (' + c + ')';
                bizoverview.supplierSubHdr = names.join(' : ') + ' : ' + '  ' + ' ' + queryService.state.selectedCategories;
            } else { // All suppliers
                // bizoverview.supplierHdr = 'All Suppliers (' + $rootScope.curSupplierNames.length + ')';
                bizoverview.supplierHdr = 'All Suppliers (' + $rootScope.curSupplierNames.length + ')';
                bizoverview.supplierSubHdr = '';
            }
        };

		// initialize state
		if(!$rootScope.lastStatus) {
			$rootScope.lastStatus = []; // TODO: is there a way to avoid this code replication?
			$rootScope.lastStatus[0] = {selectedCategories: '', filterCategories: false, 
					selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
					selectedDateRangeLabel: '12 months', selectedScoreType: '', 
					selectedScoreTypeOrderBy: '', viewSelectedFlag: false};
			$rootScope.lastStatus[1] = {selectedCategories: '', filterCategories: false, 
					selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
					selectedDateRangeLabel: '12 months', selectedScoreType: '', 
					selectedScoreTypeOrderBy: '', viewSelectedFlag: false};
			$rootScope.lastStatus[2] = {selectedCategories: '', filterCategories: false, 
					selectedSuppliers: '', selectedWL: '', selectedDateRange: '12', 
					selectedDateRangeLabel: '12 months', selectedScoreType: '', 
					selectedScoreTypeOrderBy: '', viewSelectedFlag: false};
			queryService.state = $rootScope.lastStatus[0]; // initial state
		}
        $rootScope.contextSwitch = function() {
			// Copy prior state
			if($rootScope.prevState) {
				console.log('contextSwitch to ' + $rootScope.$stateParams.pagecontext + ' from ' + $rootScope.prevState);
				if($rootScope.$stateParams.pagecontext != $rootScope.prevState) {
					switch($rootScope.prevState) {
						case 'S':
							$rootScope.lastStatus[0] = angular.copy(queryService.state); // Deep Copy
							break;
						case 'C':
							$rootScope.lastStatus[1] = angular.copy(queryService.state);
							break;
						case 'scorecard':
							queryService.scNavBack = true;
							$rootScope.lastStatus[2] = angular.copy(queryService.state);
							break;
					}
					$rootScope.prevState = $rootScope.$stateParams.pagecontext;
				}
			}
			// switch to last-saved state For TopNav click / Browser Navigation. (Refresh reinitializes)
			switch($rootScope.$stateParams.pagecontext) {
				case 'S':
					queryService.state = $rootScope.lastStatus[0];
					//queryService.state.filterSuppliers = true;
					//queryService.state.filterCategories = true;
					break;
				case 'C':
					queryService.state = $rootScope.lastStatus[1];
					//queryService.state.filterSuppliers = true;
					//queryService.state.filterCategories = true;
					break;
				case 'scorecard':
					queryService.state = $rootScope.lastStatus[2];
					queryService.state.viewSelectedFlag = true;
					break;
			}
		}
        $rootScope.filter = function(pName, pVal, contrl, scPageContext1) {
			console.log(pName + ' : ' + pVal + ' : ' + scPageContext1);
			/*if(scPageContext1 === false) {
				queryService.scExecSummaryOnly = true;
			} else {
				queryService.scExecSummaryOnly = false;
			}*/
            if (pVal === 'deselect') return;
            queryService.setParam(pName, pVal);
        };
        
		
		// initial state
		/*queryService.state = {};
        queryService.state.selectedCategories = '';
        queryService.state.filterCategories = false; // default don't update categories list
        queryService.state.selectedSuppliers = '';
        queryService.state.selectedWL = ''; // seller custom list
        queryService.state.selectedDateRange = '12';
		queryService.state.selectedDateRangeLabel = '12 months';
        queryService.state.selectedScoreType = '';
        queryService.state.selectedScoreTypeOrderBy = '';
        queryService.state.viewSelectedFlag = false; // Note: some of logic is in jqueryFn.
		*/
        queryService.setParam = function(pName, pVal) {
			$rootScope.isLoaded = false; // set state in biz stats to true when bar chart complete... show spinner
			$rootScope.isCatLoaded = false;
            queryService.state.filterCategories = false; // set default as false
			queryService.state.selectedScoreTypeOrderBy = ''; // reset
			
			// PMA-579
			if(queryService.WatchlistOpt && queryService.WatchlistOpt() == 't10s') {
				queryService.state.selectedScoreTypeOrderBy = 'spend';
			}

            ////console.log('setParam ' + pName + ' ' + pVal);
            ////console.log(pVal);

            if ('c' === pName) {
                queryService.state.selectedCategories = pVal;
                // IF NEEDED: 
                // Category facet filters SupplierNames
				if($rootScope.$stateParams.pagecontext !== 'scorecard') {
					queryService.state.filterSuppliers = true;
				}

                // upon selecting a category, reset selectedSuppliers in case it's not a custom list:
                if (queryService.state.selectedWL === '') {
                    // queryService.state.selectedSuppliers = '';
                } else {
                    // if category unselected and it's a custom list, reset to all the prior selectedSuppliers
                    // queryService.state.selectedSuppliers = queryService.priorSelectedSuppliers;
                }
            }
            if ('dtrange' === pName) {
                queryService.state.selectedDateRange = pVal;
                if (queryService.state.selectedWL === '' && queryService.state.selectedScoreType == '') {
                    // queryService.state.selectedCategories = ''; // reset prior selection
                    // DTRANGE NO FILTER SUPPLIERs queryService.state.filterSuppliers = true; // dtrange update underlying list
                    queryService.state.filterCategories = true; // dtrange update underlying list
                }
				if($rootScope.$stateParams.pagecontext == 'scorecard') {
					//queryService.state.filterSuppliers = true;
				}
				if(queryService.state.selectedDateRange == 1 || queryService.state.selectedDateRange == '1') {
					queryService.state.selectedDateRangeLabel = '30 days';
				}
				if(queryService.state.selectedDateRange == 3 || queryService.state.selectedDateRange == '3') {
					queryService.state.selectedDateRangeLabel = '90 days';
				}
            }
            if ('wl' === pName) {
				if($rootScope.$stateParams.pagecontext == 'C') { // In category overview upon Top/Bottom selection reset prior category selection
					queryService.state.selectedCategories = '';
					queryService.resetCategoryOpt();
				}
                if (pVal === 'CreateWL') {
					$rootScope.isLoaded = true; 
                    queryService.showSavedlistModal();
                    // reset display to show currently selected WL if any or in some cases T10/B10
                    var curWLoption = queryService.state.selectedWL;
                    if (curWLoption === '' && queryService.state.selectedScoreType !== '') {
                        curWLoption = queryService.state.selectedScoreType
                    }
                    queryService.resetWatchlistOpt(curWLoption);
                    return;
                }
                ////console.log(pName + ' ' + pVal);
                queryService.state.selectedScoreType = '';
                queryService.state.selectedWL = '';
                queryService.state.selectedSuppliers = '';
                //			queryService.state.selectedCategories = '';
                queryService.state.filterCategories = false;
                queryService.state.filterSuppliers = false;

                if (pVal === 'all') { // wl - all === Reset All
                    queryService.resetFilterOptions(); // same as Reset link
                    return;

                } else if (pVal === 't10' || pVal === 'b10') {
                    queryService.state.selectedScoreType = pVal;
                    /* Do after scores to get updated list of T10/B10 suppliers...
                    queryService.state.filterCategories = true; // watchlist update underlying lists
                    queryService.state.filterSuppliers = true;*/
                } else if(pVal == 't10s') { // Top 10 by spend
					queryService.state.selectedScoreTypeOrderBy = 'spend';
					queryService.state.selectedScoreType = 't10';
				} else {
                    queryService.state.selectedCategories = '';
                    queryService.resetSupplierOpt();
                    queryService.resetCategoryOpt();
                    queryService.resetDtRangeOpt();
                    queryService.state.selectedDateRange = '12'; // reset to default
                    ////console.log('selectedWL ' + queryService.state.selectedWL);
                    queryService.state.selectedWL = pVal;
                    queryService.resetWatchlistOpt(pVal);
                    // queryService.state.selectedCategories = ''; // reset prior selection
                    queryService.state.filterCategories = true; // watchlist update underlying lists
                    queryService.state.filterSuppliers = true;
                }
            }
            if ('s' === pName) {
                queryService.state.selectedSuppliers = pVal;
                // queryService.state.selectedWL = ''; // reset prior selection
                queryService.state.selectedScoreType = ''; // reset prior selection
                // queryService.resetWatchlistOpt('');
                // queryService.state.selectedCategories = ''; // reset prior selection

                // IF NEEDED: 
                // SupplierName facet filters Categories
				if($rootScope.$stateParams.pagecontext !== 'scorecard') {
					queryService.state.filterCategories = true;
				}
            }

            // reset viewSelectedFlag header flag
            if (queryService.state.selectedWL == '' && queryService.state.selectedScoreType == '' && (queryService.state.selectedSuppliers == '' || queryService.state.selectedSuppliers.length == 0) && (queryService.state.selectedCategories == '' || queryService.state.selectedCategories.length == 0)) {
                queryService.state.viewSelectedFlag = false;
            } else {
                queryService.state.viewSelectedFlag = true;
				if(queryService.state.selectedScoreType == 't10') {
					queryService.categoryHeading = 'Top 10 Categories';
				} else if(queryService.state.selectedScoreType == 'b10') {
					queryService.categoryHeading = 'Bottom 10 Categories';
				} else {
					queryService.categoryHeading = 'Selected Categories';
				}
            }

			if($rootScope.$stateParams.pagecontext == 'C') {
				queryService.calculateBizMetricsCategory(); // added this method created new controller BizStatsCategoryController where it is called
			} else { // 'S'
				queryService.calculateBizMetrics();
			}
        };




        queryService.calculateBizMetrics = function() {
            // if(true) return; // DURING DEV ONLY
            // promises: first update bubble chart. after it's done update BusinessMetricsChart
			
            this.updateScoreChart();
            // filter suppliers/categories
            ////console.log('filter suppliers/categories broadcast' + queryService.query());
            if (queryService.state.filterSuppliers) {
                var qry = queryService.listSupplierQuery();
                if (queryService.state.selectedScoreType !== '') {
                    qry = queryService.query();
                }
                $rootScope.$broadcast("filterSuppliers", baseurl + 'suppliers' + qry);
            }
            if (queryService.state.filterCategories)
                $rootScope.$broadcast("filterCategories", baseurl + 'categories' + queryService.query());
            // after the broadcast reset flags
            queryService.state.filterSuppliers = false;
            queryService.state.filterCategories = false;
        };
  
       // new method which mimics calculateBizMetrics
	   
        queryService.calculateBizMetricsCategory = function() { 
            // if(true) return; // DURING DEV ONLY
            // promises: first update bubble chart. after it's done update BusinessMetricsCategoryChart
            this.updateScoreCategoryChart(); // new method
            // filter suppliers/categories
            ////console.log('filter suppliers/categories broadcast' + queryService.querycat()); // changed from queryService.query() 
            if (queryService.state.filterSuppliers) {
                var qrycat = queryService.listSupplierQuery();
                if (queryService.state.selectedScoreType !== '') {
                    qrycat = queryService.querycat();
                }
                $rootScope.$broadcast("filterSuppliers", baseurl + 'suppliers' + qrycat);
            }
            if (queryService.state.filterCategories)
                $rootScope.$broadcast("filterCategories", baseurl + 'categories' + queryService.querycat());// changed from queryService.query to queryService.querycat()
            // after the broadcast reset flags
            queryService.state.filterSuppliers = false;
            queryService.state.filterCategories = false;
        };


        queryService.updateScoreChart = function() {
            ////console.log('1.updateScoreChart' + this.query());
			if(!queryService.state.viewSelectedFlag) {
				queryService.updateBusinessMetricsChart('');
			}

			if($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard') { //Version2: Start scorecard context
				if(queryService.state.selectedCategories === '') {// only upon seller or daterange switch:
					queryService.updateBusinessMetricsChart(''); // just busmetrics /with perCategoryScores/ and return
				} else {
					// Activate selected category:
					queryService.scActiveCategory = queryService.state.selectedCategories;
					queryService.scActiveCategoryInfo = queryService.scCategoryMap[queryService.scActiveCategory];
					queryService.scinfo();
					queryService.state.selectedCategories = ''; // reset
				}				
				return;
			}
            $http.get(baseurl + 'scores' + this.query(),{headers: {'X-ORG-ID':$rootScope.bID}}).then(function(response) {
                ////console.log(response);
                var result = response.data.result;
                // resetSelectedSupplierIds
                var supplierIds = [];
                var supplierNames = [];
                for (var i = 0; i < result.length; i++) {
                    supplierIds.push(result[i].supplierId);
                    supplierNames.push(result[i].supplierName);
                }
                $rootScope.curSupplierNames = supplierNames;
                $rootScope.updateSupplierHdr(); // onChange, update header

                // queryService.state.selectedSuppliers = supplierIds.join(',');
                // queryService.priorSelectedSuppliers = queryService.state.selectedSuppliers; // this is useful when category filter is applied and reset on a custom WL.
                ////console.log('1.score- ' + queryService.state.selectedSuppliers);
                ////console.log('1.updateScoreChart done ' + queryService.state.selectedSuppliers);

                var supplierName = [];
                var total_po_lines = [];
                var bubbleInfo = [];
                var arrayToPush;

                /* $.each(result, function(item) {
            	   supplierName.push(result[item].supplierName);
				   total_po_lines.push(result[item].total_po_lines);
            	   arrayToPush = [parseInt(result[item].Spend), parseInt(result[item].RiskScore), parseInt(result[item].total_po_lines)];
            	   bubbleInfo.push(arrayToPush);
            });
			*/
				queryService.maxSpend = 0;
                for (var i = 0; i < result.length; i++) {
                    supplierName.push(result[i].supplierName);
                    total_po_lines.push(result[i].total_po_lines);
					var sp = parseInt(result[i].Spend);
					if(sp > queryService.maxSpend) {
						queryService.maxSpend = sp;
					}
                    arrayToPush = [sp, parseInt(result[i].RiskScore), parseInt(result[i].total_po_lines)];
                    bubbleInfo.push(arrayToPush);
                }
				console.log('Supplier Max Spend: ' + queryService.maxSpend);
				// #SupplierRiskChart
                $(function() {
                    $('#container-overview').highcharts({
                        chart: {
                            type: "bubble",
                            plotBorderWidth: 1,
                            zoomType: 'xy',
                            height: 700
                        },
                        title: {
                            text: '',
                            align: 'left'
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
						exporting: {
							filename: 'supplier-risk', // custom file name for export
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

						/*exporting: {
                            enabled: true
                        },
						*/
                        subtitle: {
                            text: ''
                        },
                        plotOptions: {
							bubble: {
								minSize: 10,
								maxSize: 150
							},
                            series: {
                                cursor: 'pointer',
								 point: {
                   events: {
                        click: function () {
							////console.log(this.index);
							////console.log(this.series.data);////console.log(supplierIds[this.index]);
							queryService.selectedSupplier2 = supplierIds[this.index];
							queryService.selectedSupplierName2 = supplierName[this.index];
							queryService.scNavBack = false;
							////console.log(queryService.selectedSupplier2);
                            location.href = '#/scorecards#top';
							   $(".active-overview").removeClass("active");
							   $(".active-overview-score").addClass("active");
							   
							  
													}
												}
                                },
                                animation: false,
                                dataLabels: {
                                    useHTML: true,
                                    style: {
                                        color: '#000000',
                                        fontWeight: 'normal',
                                        fontSize: '12px',
                                        textShadow: 0,
                                    },
                                    enabled: false,
                                    formatter: function() {
                                        return '<b>' + ' ' + supplierName[this.series.data.indexOf(this.point)] + '</b>' + '<br/>' + 'Spend:' + '$' + Highcharts.numberFormat(this.x, 0, '', ',') + '<br/>' + 'Score:' + this.y + '<br/>' + 'PO Lines:' + '' + total_po_lines[this.series.data.indexOf(this.point)];
                                    }
                                }
                            }
                        },

                        yAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'shortdash',
                            min: 40,
                            max: 100,
                            title: {
                                text: 'Score',
                                align: 'middle',
								style: {
								fontSize:'13px'
							}
                            },
                            labels: {
								enabled:true,
							style: {
								fontSize:'13px'
							}
						},
                            plotBands: [{
                                color: '#666666', // Color value
								width: 2,
								value:70,
                              //  from: 50.0, // Start of the plot band
                              //  to: 50.1 //50.05 End of the plot band
                            }],
                        },
                        xAxis: {
                            gridLineWidth: 1,
                            gridLineDashStyle: 'shortdash',
                            title: {
                                text: 'Spend',
                                align: 'middle',
								style: {
								fontSize:'13px'
							}

                            },
                            labels: {
								enabled:true,
							style: {
								fontSize:'13px'
							}
						},
                        },
                        tooltip: {
                            useHTML: true,
                            formatter: function() {
                                return '<b>' + ' ' + supplierName[this.series.data.indexOf(this.point)] + '</b>' + '<br/>' + 'Spend:' + '$' + Highcharts.numberFormat(this.x, 0, '', ',') + '<br/>' + 'Score:' + this.y + '<br/>' + 'PO Lines:' + '' + total_po_lines[this.series.data.indexOf(this.point)];

                            }
                        },

                        series: [{
                            name: 'Risk Overview',
                            data: bubbleInfo,
                            marker: {
                                lineColor: '#104e8a',
                                lineWidth: 1,
                                fillColor:'#104e8a' 
								
                                
                            }
                        }]

                    });
                });
                return supplierIds.join(','); //'scoreapi success';
            })
            .then
                (function(out) {
					if(queryService.state.viewSelectedFlag) {
						queryService.updateBusinessMetricsChart(out);
					}
				})

		}
        
		//#SupplierBarChart
                    queryService.updateBusinessMetricsChart = function(out) {
                    ////console.log('2.updateBusinessMetricsChart');
                    $rootScope.queryParams = queryService.query();
                    $rootScope.bizMetricData = {}; // current data


                    if (queryService.state.selectedScoreType === 't10' || queryService.state.selectedScoreType === 'b10') {
                        $rootScope.$broadcast("filterSuppliers", baseurl + 'suppliers' + queryService.query(out));
                        $rootScope.$broadcast("filterCategories", baseurl + 'categories' + queryService.query(out));
                    }

                    $http.get(baseurl + 'busmetrics' + queryService.queryBusMetrics(out),{headers: {'X-ORG-ID':$rootScope.bID, 'isScorecardContext': ($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard')}})
                        .success(function(data, result, status) {
                            ////console.log('2.updateBusinessMetricsChart - done ' + queryService.queryBusMetrics(out));
							
                            $rootScope.bizMetricData.result = data.result;
                            ////console.log('bizMetricData');
                            ////console.log($rootScope.bizMetricData);
							if($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard') {
								// sort by category - start
								if(queryService.busMetricsSortBy && queryService.busMetricsSortBy == 'category_name') {
									var unordered = {};
									data.result.spendByGroup.forEach(function(item) {
										unordered[item.category] = item;
									});

									console.log(JSON.stringify(unordered));
									var ordered = {};
									var sortedList = new Array();
									Object.keys(unordered).sort().forEach(function(key) {
									  ordered[key] = unordered[key];
									  sortedList.push(unordered[key]);
									});
									console.log(JSON.stringify(ordered));
									$rootScope.bizMetricData.result.spendByGroup = sortedList;
								} // sort by category - end
								
								$rootScope.scorecardSupplierName = $rootScope.allSupplierMap[queryService.state.selectedSuppliers];
								$rootScope.supplierScoreInfo = data.info.supplierScoreInfo;
								var spend = parseInt($rootScope.bizMetricData.result.spend.replace('$', '').replace(/,/g, ''));
								if (spend === 0) {
									$rootScope.noActiveTx = true;
									return;
								} else {
									$rootScope.noActiveTx = false;
								}
								queryService.scActiveCategory = $rootScope.bizMetricData.result.spendByGroup[0].category;
								if(queryService.state.selectedCategories) {
									queryService.scActiveCategory = queryService.state.selectedCategories;
								}
								console.log('initial scActiveCategory ' + queryService.scActiveCategory);
								queryService.scinfo();
								queryService.scCategoryMap = {};
								for (var i = 0; i < data.result.spendByGroup.length; i++) {
									queryService.scCategoryMap[data.result.spendByGroup[i].category] = data.result.spendByGroup[i];
								}
								queryService.scActiveCategoryInfo = queryService.scCategoryMap[queryService.scActiveCategory];
								
								return; // no need to evaluate further
							}
                            $rootScope.allBizMetricData = data.info.allBizMetric;
							queryService.lastUpdateDate = data.info.lastRefreshDate;
							queryService.timeWindow = '12-month';
							if(queryService.state.selectedDateRange == 1 || queryService.state.selectedDateRange == '1') {
								queryService.timeWindow = '30-day';
							}
							if(queryService.state.selectedDateRange == 3 || queryService.state.selectedDateRange == '3') {
								queryService.timeWindow = '90-day';
							}

                            var spend = parseInt($rootScope.bizMetricData.result.spend.replace('$', '').replace(/,/g, ''));
                            if (spend === 0) {
                                $rootScope.noActiveTx = true;
                            } else {
                                $rootScope.noActiveTx = false;
                            }
                            var totspend = parseInt($rootScope.allBizMetricData.spend.replace('$', '').replace(/,/g, ''));

                            $rootScope.bizMetricData.percentSpend = (100 * spend / totspend).toFixed(2);
                            $rootScope.bizMetricData.percentPOCount = (100 * parseInt($rootScope.bizMetricData.result.poCount) / parseInt($rootScope.allBizMetricData.poCount)).toFixed(2);
                            $rootScope.bizMetricData.percentCategoryCount = (100 * parseInt($rootScope.bizMetricData.result.categoryCount) / parseInt($rootScope.allBizMetricData.categoryCount)).toFixed(2);

                            // for Category Overview Calc
                            $rootScope.bizMetricData.percentSupplierCount = (100 * parseInt($rootScope.bizMetricData.result.supplierCount) / parseInt($rootScope.allBizMetricData.supplierCount)).toFixed(2);

                            var category = [];
                            var spend = [];
                            var supplierCount = [];

                            /* COnsolidate for loops */
							
                            for (var i = 0; i < data.result.spendByGroup.length; i++) {
                                category.push(data.result.spendByGroup[i].category + '....' + data.result.spendByGroup[i].supplierCount);
								spend.push(data.result.spendByGroup[i].spend);
                            }
						
							$('#supplier-barchart-container').highcharts({
	
							chart: {
								type: 'bar',
								backgroundColor: 'transparent',
                                plotBackgroundColor: 'transparent',
								height: data.result.spendByGroup.length * 23 + 75,
								marginTop: 30
							},
	
							title: {
								text: '',
								align: 'left',
								style: {
									fontSize:''
								},
							},
							credits: {
								enabled: false
							},
							exporting: {
							filename: 'spend-breakdown-category', // custom file name for export
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
							/*
							exporting:{
								buttons: {
							contextButton: {
								symbol: 'circle',
								symbolStrokeWidth: 1,
								background:'red',
								symbolFill: '#bada55',
								symbolStroke: '#330033'
							}
                            },
							
								enabled:true
							},
							*/
							navigation: {
							buttonOptions: {
							//    align: 'center',
								y:5,
								x:5,
							//	width: 10
							}
							},
					
							legend: {
								enabled: false
							},
							subtitle: {
								text: ''
							},
							tooltip: {
								enabled:false
							},
							xAxis: {
								categories: category
							},
							yAxis: {
								lineWidth: 0,
								gridLineWidth: 0,
								tickWidth: 0,
								title: {
									text: '',
									align: 'high'
								},
								opposite:true,
								//	min: 0,
								//	max:200000,
								labels: {
								style: {
									fontSize:'10px'
								}
							}
	
							},
							plotOptions: {
								series: {
									pointWidth: 16 ,
									animation:false,
									dataLabels: {
										// valuePrefix: "$",
										enabled: true,
										useHTML: true,
										align: 'top',
										formatter: function() {
											return ' ' + ' ' + '$' + Highcharts.numberFormat(this.y, 0, '', ',');
										},
										style: {
											color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#696969',
											textShadow: 0,
											fontSize: '11px',
											fontWeight:700
										}
									}
								}
							},
							series: [{
								animation:false,
								name: "Spend",
								data: spend,
								color: '#9FB6CD'
							}],
						});
							})
							.error(function(data, result, status) {
								$rootScope.bizMetricData.error = data;
							});
						}

            queryService.updateScoreCategoryChart = function() { // new method to update the category bubble chart
                ////console.log('1.updateScoreChart' + this.query());
                $http.get(baseurl + 'category/scores' + this.query(),{headers: {'X-ORG-ID':$rootScope.bID}}).then(function(response) { //success(function(data, result, status) { 
                    // ////console.log(response);
                    var result = response.data.result;
                    // resetSelectedSupplierIds
                    var supplierIds = [];
                    var supplierNames = [];
                    var category = [];
                    var categoryNames = [];
                    var total_po_lines = [];
                    var bubbleCategoryInfo = [];
                    var arrayCategoryBubbleToPush;

					queryService.maxSpend = 0;
                    for (var i = 0; i < result.length; i++) {
                        category.push(result[i].displayCategory);
						categoryNames.push(result[i].displayCategory);
                        total_po_lines.push(result[i].total_po_lines);
						var sp = parseInt(result[i].Spend);
						if(sp > queryService.maxSpend) {
							queryService.maxSpend = sp;
						}
                        arrayCategoryBubbleToPush = [sp, parseInt(result[i].RiskScore), parseInt(result[i].total_po_lines)];
                        bubbleCategoryInfo.push(arrayCategoryBubbleToPush);
                    }
					console.log('Category Max Spend: ' + queryService.maxSpend);
					var cats1 = categoryNames.slice(0).sort();
					$rootScope.curSupplierNames = categoryNames; // re-using same header...
                    $rootScope.updateSupplierHdr();
                    $(function() {
				    // #CategoryRiskChart
                        $('#container-overview-category').highcharts({
                            chart: {
                                type: "bubble",
                                plotBorderWidth: 1,
                                zoomType: 'xy',
                                height: 700
                            },
                            title: {
                                text: '',
                                align: 'left'

                            },
                            credits: {
                                enabled: false
                            },
                            legend: {
                                enabled: false
                            },
							/*
							exporting: {
                                enabled: true
                            },
							*/
							exporting: {
							filename: 'category-risk', // custom file name for export
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

                            subtitle: {
                                text: ''
                            },
                            plotOptions: {
								bubble: {
								minSize: 10,
								maxSize: 150
								},
                                series: {
                                    cursor: 'pointer',
                                    point: {
                                    },
                                    animation: false,
                                    dataLabels: {
                                        useHTML: true,
                                        style: {
                                            color: '#000000',
                                            fontWeight: 'normal',
                                            fontSize: '12px',
                                            textShadow: 0,
                                        },
                                        enabled: false,
                                        formatter: function() {
                                            return '<b>' + ' ' + category[this.series.data.indexOf(this.point)] + '</b>' + '<br/>' + 'Spend:' + '$' + Highcharts.numberFormat(this.x, 0, '', ',') + '<br/>' + 'Score:' + this.y + '<br/>' + 'PO Lines:' + '' + total_po_lines[this.series.data.indexOf(this.point)];
                                        }
                                    }
                                }
                            },

                            yAxis: {
                                gridLineWidth: 1,
                                gridLineDashStyle: 'shortdash',
                                min: 40,
                                max: 100,
                                title: {
                                    text: 'Score',
                                    align: 'middle',
									style: {
										fontSize:'13px'
									}
                                },
                                labels: {
									enabled:true,
									style: {
										fontSize:'13px'
									}
								},
                                plotBands: [{
                                    color: '#666666', // Color value
									width: 2,
								    value:70,
                                  //  from: 50.0, // Start of the plot band
                                  //  to: 50.1 // End of the plot band
                                }],
                            },
                            xAxis: {
                                gridLineWidth: 1,
                                gridLineDashStyle: 'shortdash',
                                title: {
                                    text: 'Spend',
                                    align: 'middle',
									style: {
										fontSize:'13px'
									}

                                },
                                labels: {
								enabled:true,
							style: {
								fontSize:'13px'
							}
						},
                            },
                            tooltip: {
                                useHTML: true,
                                formatter: function() {
                                    return '<b>' + ' ' + category[this.series.data.indexOf(this.point)] + '</b>' + '<br/>' + 'Spend:' + '$' + Highcharts.numberFormat(this.x, 0, '', ',') + '<br/>' + 'Score:' + this.y + '<br/>' + 'PO Lines:' + '' + total_po_lines[this.series.data.indexOf(this.point)];

                                }
                            },
							
						

                            series: [{
                                name: 'Risk Overview',
                                data: bubbleCategoryInfo,
                                marker: {
                                lineColor: '#448a00',
                                lineWidth: 1,
                                fillColor:'#448a00' 
								}
                            }]

                        });

                    });
                    return cats1; // SEND categories not suppliers here // supplierIds.join(','); //'scoreapi success';
                })

				//#CategoryBarChart
                .then
                    (function(outcat) {
                        $rootScope.queryParams = queryService.querycat();
                        $rootScope.bizMetricData = {}; // current data


                        if (queryService.state.selectedScoreType === 't10' || queryService.state.selectedScoreType === 'b10') {
                            // $rootScope.$broadcast("filterSuppliers", baseurl + 'suppliers' + queryService.querycat(outcat)); // No Suppliers view to filter-out
                            // $rootScope.$broadcast("filterCategories", baseurl + 'categories' + queryService.querycat(outcat));
							queryService.updateCategoriesInCategoryOverview(outcat);
                        }

                        $http.get(baseurl + 'busmetrics' + queryService.querycat(outcat.join(',')) + '&groupBy=supplier',{headers: {'X-ORG-ID':$rootScope.bID}})
                            .success(function(data, result, status) {
                                ////console.log('2.updateBusinessMetricsChart - done ' + queryService.querycat());
                                $rootScope.bizMetricData.result = data.result;
                                ////console.log('bizMetricData');
                                ////console.log($rootScope.bizMetricData);
                                $rootScope.allBizMetricData = data.info.allBizMetric;
								queryService.lastUpdateDate = data.info.lastRefreshDate;
								queryService.timeWindow = '12-month';
								if(queryService.state.selectedDateRange == 1 || queryService.state.selectedDateRange == '1') {
									queryService.timeWindow = '30-day';
								}
								if(queryService.state.selectedDateRange == 3 || queryService.state.selectedDateRange == '3') {
									queryService.timeWindow = '90-day';
								}

                                var spend = parseInt($rootScope.bizMetricData.result.spend.replace('$', '').replace(/,/g, ''));
                                if (spend === 0) {
                                    $rootScope.noActiveTx = true;
                                } else {
                                    $rootScope.noActiveTx = false;
                                }
                                var totspend = parseInt($rootScope.allBizMetricData.spend.replace('$', '').replace(/,/g, ''));

                                $rootScope.bizMetricData.percentSpend = (100 * spend / totspend).toFixed(2);
                                $rootScope.bizMetricData.percentPOCount = (100 * parseInt($rootScope.bizMetricData.result.poCount) / parseInt($rootScope.allBizMetricData.poCount)).toFixed(2);
                                $rootScope.bizMetricData.percentCategoryCount = (100 * parseInt($rootScope.bizMetricData.result.categoryCount) / parseInt($rootScope.allBizMetricData.categoryCount)).toFixed(2);

                                // for Category Overview Calc
                                $rootScope.bizMetricData.percentSupplierCount = (100 * parseInt($rootScope.bizMetricData.result.supplierCount) / parseInt($rootScope.allBizMetricData.supplierCount)).toFixed(2);

                                var spend = [];
								var supplier = [];
								var categoryCount = [];
								

                                /* Consolidate for loops */
								for (var i = 0; i < data.result.spendByGroup.length; i++) {
                                supplier.push(data.result.spendByGroup[i].supplier + '....' + data.result.spendByGroup[i].categoryCount);
								spend.push(data.result.spendByGroup[i].spend);
                            }
						
							$('#category-barchart-container').highcharts({
	
							chart: {
								type: 'bar',
								backgroundColor: 'transparent',
                                plotBackgroundColor: 'transparent',
								height: data.result.spendByGroup.length * 23 + 75,
								marginTop: 30
							},
	
							title: {
								text: '',
								align: 'left',
								style: {
									fontSize:''
								},
							},
							credits: {
								enabled: false
							},
							exporting: {
							filename: 'spend-breakdown-supplier', // custom file name for export
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

							/*
							exporting:{
								enabled:true
							},
							*/
							navigation: {
							buttonOptions: {
							//    align: 'center',
								y:5,
								x:5,
							//	width: 10
							}
							},
					
							legend: {
								enabled: false
							},
							subtitle: {
								text: ''
							},
							tooltip:{
								enabled:false,
							},
							xAxis: {
								categories: supplier
							},
							yAxis: {
								title: {
									text: '',
									align: 'high'
								},
								lineWidth: 0,
								gridLineWidth: 0,
								tickWidth: 0,
								opposite:true,
								//	min: 0,
								//	max:200000,
								labels: {
								style: {
									fontSize:'10px'
								}
							}
	
							},
							plotOptions: {
								series: {
									pointWidth: 16 ,
									animation:false,
									dataLabels: {
										// valuePrefix: "$",
										enabled: true,
										useHTML: true,
										align: 'top',
										formatter: function() {
											return ' ' + ' ' + '$' + Highcharts.numberFormat(this.y, 0, '', ',');
										},
										style: {
											color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || '#696969',
											textShadow: 0,
											fontSize: '11px',
											fontWeight:700
										}
									}
								}
							},
							series: [{
								animation:false,
								name: "Spend",
								data: spend,
								color: '#A2CD5A',
							}],
						});
                            })
                            .error(function(data, result, status) {
                                $rootScope.bizMetricData.error = data;
                            });
                    })

            }

        queryService.query = function(supplierIds) {
            var sids = supplierIds ? supplierIds : queryService.state.selectedSuppliers;
			var supp1 = '?s=';
			if(queryService.state.viewSelectedFlag) {
				supp1 = '?s=' + sids;
			}
            return supp1 + '&wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType + '&orderBy=' + queryService.state.selectedScoreTypeOrderBy  + '&c=' + queryService.state.selectedCategories + '&dtrange=' + queryService.state.selectedDateRange;
        };
        queryService.queryBusMetrics = function(supplierIds) {
			var sortBy = queryService.busMetricsSortBy;
			if(!sortBy || ['total_spend', 'score', 'total_spend desc', 'score desc'].indexOf(sortBy) == -1 ) {
				sortBy = '';// empty same as 'total_spend desc'
			}
            var sids = supplierIds ? supplierIds : queryService.state.selectedSuppliers;
			var supp1 = '?s=';
			if(queryService.state.viewSelectedFlag) {
				supp1 = '?s=' + sids;
			}
			if($rootScope.$stateParams.pagecontext && $rootScope.$stateParams.pagecontext === 'scorecard') { //Start scorecard context
				// set WLs that the supplierId belongs to:
			//	queryService.setSupplierWLs(queryService.state.selectedSuppliers); //Refresh issue
				// Don't include categories filter in scorecard busmetrics 
				return supp1 + '&wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType + '&sortBy=' + sortBy  + '&dtrange=' + queryService.state.selectedDateRange;
			} //End scorecard context
            return supp1 + '&wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType + '&sortBy=' + sortBy  + '&c=' + queryService.state.selectedCategories + '&dtrange=' + queryService.state.selectedDateRange;
        };
		
        queryService.scinfo = function() {
			var url = $rootScope.baseUrl + 'sccSummary?s=' + queryService.state.selectedSuppliers + '&c=' + queryService.scActiveCategory + '&dtrange=' + queryService.state.selectedDateRange + '&es=' + queryService.scExecSummaryOnly;
			console.log('scinfo ' + ' url: ' + url);
			$http.get(url,{headers: {'X-ORG-ID':$rootScope.bID}}).success(function (data, status, headers, config) {
				console.log('scinfo ' + ' data: ' + data);
				queryService.sc = {}; queryService.sc.info = data.info;
				//counts
				var good = 0, notOk = 0;
				var scores = data.info.scs.scores;
				
				//KPI trends
				//Note: categoryAvgKpiTs has only first 5 components, no price scores
				var weeklyKpiTs = [], categoryAvgKpiTs = []; // array of array with timeseries-data in below order
				///////////////  0  //////////////////  1  ////////////////////  2  //////////////// 3 ////////////////// 4 /////////////////////////// 5 ///////////////////////// 6 /////////////////// 7///////////////////
				var keys = ['cancel_percent_score', 'confirmed240_score', 'ontimepickup_score', 'reconciled_score', 'total_fill_rate_score', 'percenttarget_score', 'price_competitiveness_score', 'seller_month_price_volatility_score'];
				var kpiKeys = ['cancel_percent', 'confirmed240', 'ontimepickup', 'reconciled_percent', 'total_fill_rate', 'percenttarget', 'price_competitiveness', 'seller_month_price_volatility'];
				var ckpiKeys = ['cancel_percent', 'confirmed240', 'ontimepickup', 'reconciled_percent', 'total_fill_rate', 'percenttarget', 'price_competitiveness', 'seller_month_price_volatility'];
				
				// Add KPIStatus bindings: ex., queryService.sc.info.scs.status.total_fill_rate
				queryService.sc.info.scs.status = []; // hold status vals
                for (var i = 0; i < keys.length; i++) {
					weeklyKpiTs[i] = new Array();
					categoryAvgKpiTs[i] = new Array();
					var status = '';
					if(scores[keys[i]] && scores[keys[i]] >= 85) {
						status = 'Excellent';
					} else if(scores[keys[i]] && scores[keys[i]] >= 75) {
						status = 'Good';
					} else if(scores[keys[i]] && scores[keys[i]] >= 65) {
						status = 'Fair';
					} else if(scores[keys[i]] && scores[keys[i]] >= 55) {
						status = 'Poor';
					} else { // < 55
						status = 'Terrible';
					}
					if(scores[keys[i]] && scores[keys[i]] >= 75) { //FIX check the values 75, 65: meh ignored
						good++;
					} else if(scores[keys[i]] && scores[keys[i]] < 65) {
						notOk++;
					}
					queryService.sc.info.scs.status[kpiKeys[i]] = status;
                }
				weeklyKpiTs[keys.length] = new Array(); // Add room to hold Volatility chart data
				if(notOk > 0) queryService.sc.needsAttn = '(' + notOk + ')';
				if(good > 0) queryService.sc.doingWell = '(' + good + ')';
				
				// seller trend weekly-timeseries
				var ts = queryService.sc.info.ts;
				var weeklyScoreTs = [], categoryAvgScoreTs = [], categorySpendTs = [];
				
				for (var i = 0; i < ts.length; i++) {
					// spend
					categorySpendTs.push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].spend]);
					// weekly calculated scores
					weeklyScoreTs.push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].score]);
					for(var j =0; j<keys.length-1; j++) {
						if(j==6) {
							weeklyKpiTs[j].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j]]]); // price line
							weeklyKpiTs[j+1].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j]]-ts[i].kpis[kpiKeys[j+1]], ts[i].kpis[kpiKeys[j]]+ts[i].kpis[kpiKeys[j+1]]]); // price ranges
							weeklyKpiTs[j+2].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j+1]]]); // price volatility data
							
//							categoryAvgKpiTs[j].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j] + '_avg']]); // price avg line
						} else {
							weeklyKpiTs[j].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j]]]);
//							categoryAvgKpiTs[j].push([Date.UTC(ts[i]['year'], ts[i]['month'], ts[i]['day']), ts[i].kpis[kpiKeys[j] + '_avg']]);
						}
					}					
				}
				
				// category trend during those weeks
				var cts = queryService.sc.info.cts;
				for (var i = 0; i < cts.length; i++) {
					// weekly category spends
					// <weekly_cat_spends>.push([Date.UTC(cts[i]['year'], cts[i]['month'], cts[i]['day']), cts[i].spend]);
					
					// weekly calculated scores
					categoryAvgScoreTs.push([Date.UTC(cts[i]['year'], cts[i]['month'], cts[i]['day']), cts[i].score]);
					for(var j =0; j<ckpiKeys.length; j++) {
						categoryAvgKpiTs[j].push([Date.UTC(cts[i]['year'], cts[i]['month'], cts[i]['day']), cts[i].kpis[ckpiKeys[j]]]); //category avg line // + '_avg'
					}
				}
				
				// LRPad - assume: categoryAvgScoreTs is always superset and weeklyScoreTs is falls subset of it (current dataset this appears true)
				var cLeftIndx = -1, cRightIndx = -1;
				var i = 0;
				for(i = 0; i < categoryAvgScoreTs.length; i++) {
					var c = categoryAvgScoreTs[i];
					if(c[0] === weeklyScoreTs[0][0]) {
						break; // at match
					} 
				}
				cLeftIndx = i;
				for(i = categoryAvgScoreTs.length-1; i > -1; i--) {
					var c = categoryAvgScoreTs[i];
					if(c[0] === weeklyScoreTs[weeklyScoreTs.length-1][0]) {
						break; // at match
					}
				}
				cRightIndx = i;
				
				// Take1: Try zero pad overall
				/*if(cLeftIndx != 0) { // LPad
					for(var i = cLeftIndx; i > -1; i--) {
						weeklyScoreTs.unshift([categoryAvgScoreTs[i][0], null]); // null or 0 doesn't matter
					}
				}
				if(cRightIndx != weeklyScoreTs.length-1) { // RPad
					for(var i = cRightIndx; i < categoryAvgScoreTs.length; i++) {
						weeklyScoreTs.push([categoryAvgScoreTs[i][0], null]); // null or 0 doesn't matter
					}
				}*/
				
				// Take2: Limit category set as well:
				var cAvg1 = [], ss1 = [];
				for(i = cLeftIndx; i < cRightIndx+1; i++) {
					cAvg1.push(categoryAvgScoreTs[i]);
					//ss1.push(categorySpendTs[i]);
				}
				categoryAvgScoreTs = cAvg1;
				i = 0; // reset
				
				// apply trimming for service categoryAvgs as well
				for(var j =0; j<ckpiKeys.length; j++) {
					var cKpiAvg1 = [];
					for(i = cLeftIndx; i < cRightIndx+1; i++) {
						cKpiAvg1.push(categoryAvgKpiTs[j][i]);
					}
					categoryAvgKpiTs[j] = cKpiAvg1; // trimmed
				}

				// LRPad
				
				// #3 a common problem with low-spend items - set spend to zero during no activity weeks
				i = 0; // spend index
				categoryAvgScoreTs.forEach(function (item, index) {
					var week = item[0];
					if(categorySpendTs[i] && categorySpendTs[i][0] == week) { // week has spend
						ss1.push(categorySpendTs[i++]);
					} else {
						ss1.push([week,0]); // add zero spend
					}
				});
				categorySpendTs=ss1;
				
				//reselect between tab
				queryService.sc.weeklyScoreTs=weeklyScoreTs;
				queryService.sc.categoryAvgScoreTs=categoryAvgScoreTs;
				queryService.sc.categorySpendTs=categorySpendTs;
				queryService.sc.weeklyKpiTs=weeklyKpiTs;
				queryService.sc.categoryAvgKpiTs=categoryAvgKpiTs;
				
				// var dt = new Date(categoryAvgScoreTs[categoryAvgScoreTs.length-1][0]); // sets the date to the epoch
				// queryService.sc.lastUpdateDate = (dt.getMonth() + 1) + '/' + dt.getDate() + '/' +  dt.getFullYear();
				queryService.sc.lastUpdateDate = queryService.sc.info.lastRefreshDate;
				queryService.sc.timeWindow = '12-month';
				if(queryService.state.selectedDateRange == 1 || queryService.state.selectedDateRange == '1') {
					queryService.sc.timeWindow = '30-day';
				}
				if(queryService.state.selectedDateRange == 3 || queryService.state.selectedDateRange == '3') {
					queryService.sc.timeWindow = '90-day';
				}
				/* **** perf **** */
				/* ************** */
				if(!queryService.scShowAvg) queryService.scShowAvg = {}; // init state between sc tab-selections
				queryService.scPerfChart('#container-summary-perf-dual', '#button-summary-perf-dual');
				queryService.scPerfChart('#container-service-fillrate-trend', '#button-service-fillrate');
				queryService.scPerfChart('#container-service-ontimepu-trend', '#button-service-ontimepu');
				queryService.scPerfChart('#container-service-cancel-trend', '#button-service-cancel');
				queryService.scPerfChart('#container-service-reconcile-trend', '#button-service-reconcile');
				queryService.scPerfChart('#container-service-responsiveness-trend', '#button-service-responsiveness');
				
				// Pricing - Competitiveness & Volatility 
				queryService.scPerfChart('#container-pricing-competitiveness-trend','#button-pricing-competitiveness');
				queryService.scPerfChart('#container-pricing-volatility-trend', '#button-pricing-volatility');

				// Target - On Target
				queryService.scPerfChart('#container-other-percenttarget-trend', '#button-other-percenttarget');
				
				queryService.scPricePerfChart();
				
				/* **** spend **** */
				/* *************** */
				queryService.scSpendChart('#container-summary-spend-trend');
				queryService.scSpendChart('#container-service-fillrate-spend-trend');
				queryService.scSpendChart('#container-service-ontimepu-spend-trend');
				queryService.scSpendChart('#container-service-cancel-spend-trend');
				queryService.scSpendChart('#container-service-reconcile-spend-trend');
				queryService.scSpendChart('#container-service-responsiveness-spend-trend');
				
				// Pricing - Competitiveness & Volatility 
				queryService.scSpendChart('#container-pricing-competitiveness-spend-trend');
				queryService.scSpendChart('#container-pricing-volatility-spend-trend');

				// Target - On Target
				queryService.scSpendChart('#container-other-percenttarget-spend-trend');
				
				// pricing analysis
				queryService.sc.pricingMsg12m = queryService.pricingMsg(queryService.sc.info.scs12m.scores);
				queryService.sc.pricingMsg30d = queryService.pricingMsg(queryService.sc.info.scs30d.scores);
				
				// exec summary change metrics // TODO: how to speed up (conditionally avoid all above processing if its for summary-view?)
				var v = (queryService.sc.info.changeMetrics.cur90d - queryService.sc.info.changeMetrics.prev90d);
				if(!v) v = '-';
				queryService.sc.info.changeMetrics.diff90d = v > 0 ? '+'+v : ''+v;
				v = (queryService.sc.info.changeMetrics.curYr - queryService.sc.info.changeMetrics.prevYr);
				if(!v) v = '-';
				queryService.sc.info.changeMetrics.diffYr = v > 0 ? '+'+v : ''+v;

			});

        };

        queryService.pricingMsg = function(kpiscores) {
			if(kpiscores && kpiscores.price_competitiveness_score && kpiscores.seller_month_price_volatility_score) {
				var c = kpiscores.price_competitiveness_score < 65 ? 0 : kpiscores.price_competitiveness_score > 75 ? 2 : 1;
				var v = kpiscores.seller_month_price_volatility_score < 65 ? 0 : kpiscores.seller_month_price_volatility_score > 75 ? 2 : 1;
				return queryService.prMsgMatrix[v][c];
			} 
			return '';
		}
		
	/* Add get of kpi settings and assign incluce and exclude variables */	
	
	 $http.get($rootScope.baseUrl + 'kpisettings', {
     headers: {'X-ORG-ID':$rootScope.bID}
      }).success(function (data, status, headers, config) {
          
		  var settingsMap = {}; 
		  for(var i = 0; i< data.length; i++) {
			  var s = data[i];
			  settingsMap[s.name] = s;
		  }
		  settingsMap['spend'] = {name: 'spend', weight: 'MED', includeInScoreCalculation: true, display: true}; // no value returned by API set spend a default value.
		  console.log(settingsMap);
		  
	        
			var showTotalFillRate =	settingsMap['total_fill_rate_score']['includeInScoreCalculation'];
			$rootScope.showTotalFillRate = showTotalFillRate;
			
		    var showCancellations =	settingsMap['cancel_percent_score']['includeInScoreCalculation'];
			$rootScope.showCancellations = showCancellations;
			
		    var showReconciliations =	settingsMap['reconciled_score']['includeInScoreCalculation'];
			$rootScope.showReconciliations = showReconciliations;

		    var showResponsiveness =	settingsMap['confirmed240_score']['includeInScoreCalculation'];
			$rootScope.showResponsiveness = showResponsiveness;

		    var showOntimePickup =	settingsMap['ontimepickup_score']['includeInScoreCalculation'];
			$rootScope.showOntimePickup = showOntimePickup;

		    var showPriceCompete =	settingsMap['price_competitiveness_score']['includeInScoreCalculation'];
			$rootScope.showPriceCompete = showPriceCompete;

		    var showPriceVol =	settingsMap['seller_month_price_volatility_score']['includeInScoreCalculation'];
			$rootScope.showPriceVol = showPriceVol; 
			
		    var showPercentTarget =	settingsMap['percenttarget_score']['includeInScoreCalculation'];
			$rootScope.showPercentTarget = showPercentTarget; 	
	
				
	    })
		/* End get kpi setings for use in KPI Include / Exclude */

        queryService.querycat = function(cats) {
//            var sids = supplierIds ? supplierIds : queryService.state.selectedSuppliers;
//			var supp1 = '?s=';
			//if(queryService.state.viewSelectedFlag) {
				//supp1 = '?s=' + sids;
			//}
			if(queryService.state.selectedScoreType == '') { // default
	            return '?wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType +'&orderBy=' + queryService.state.selectedScoreTypeOrderBy + '&c=' + queryService.state.selectedCategories + '&dtrange=' + queryService.state.selectedDateRange;
			} else { //T/B10
//				return supp1 + '&wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType  + '&orderBy=' + queryService.state.selectedScoreTypeOrderBy + '&c=' + queryService.state.selectedCategories + '&dtrange=' + queryService.state.selectedDateRange;
				return '?c=' + cats + '&wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType  + '&orderBy=' + queryService.state.selectedScoreTypeOrderBy + '&dtrange=' + queryService.state.selectedDateRange;
			}
        };
        queryService.listSupplierQuery = function() {
            return '?wl=' + queryService.state.selectedWL + '&type=' + queryService.state.selectedScoreType  + '&orderBy=' + queryService.state.selectedScoreTypeOrderBy + '&c=' + queryService.state.selectedCategories + '&dtrange=' + queryService.state.selectedDateRange;
        };
		
        return queryService;
    }])
