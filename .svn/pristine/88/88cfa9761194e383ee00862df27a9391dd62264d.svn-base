//'use strict';

/**
 * @ngdoc overview
 * @name tpanalyticsApp
 * @description
 * # tpanalyticsApp
 *
 * Main module of the application.
 */
angular
  .module('tpanalyticsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
	'ui.router',
    'ngSanitize',
    'ngTouch',
	'nya.bootstrap.select',
	'mgcrea.ngStrap',
	'rzModule',
	'gridster',
	'angulartics.google.analytics',
	'angulartics', 
	'angulartics.scroll',
	'angulartics.clicky',
	'ct.ui.router.extras',
	'ngTable'
	
  ]).run(['$rootScope', '$state', '$stateParams',
      function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
		$rootScope.prevState = 'S';
      }])
  .factory('redirectInterceptor', function($rootScope, $q,$location,$window){
    return  {
        'response':function(response){
        if (typeof response.data === 'string' && response.data.indexOf("<title>iTradeNetwork Login</title>")>-1) {
            console.log("LOGIN!!");
            console.log(response.data);
            $window.location.href = "/login";
            return $q.reject(response);
        }else{
			//console.log("RS:: location path " + $location.$$path)
			//console.log("RS:: " + $rootScope)
			if( $rootScope.presentation ) {
				//$rootScope.prevState = 'scorecard';
				$rootScope.queryService.selectedSupplier2 = parseInt($rootScope.n); // treat almost like clickthru
				//$window.location.href = "/ui/index.html#/scorecards";
				//$window.location.href = "#/scorecards";
			}
            return response;
        }
        }
    }

    })    
  .config(function($stateProvider,$locationProvider,$stickyStateProvider, $urlRouterProvider, $analyticsProvider,$compileProvider,$httpProvider,$modalProvider) {
	   angular.extend($modalProvider.defaults, {
    	html: true
  		});
	   $httpProvider.interceptors.push('redirectInterceptor');
	   $analyticsProvider.registerEventTrack(function (eventName, properties) {
	  	$('#notifier').text('hit: '+eventName).show().delay(1000).fadeOut(1000);
	  });
      $urlRouterProvider.otherwise('/overview');
      
      $stateProvider
	  
	  .state('overview', { 
          url: '/overview',
          templateUrl: function ($stateParams){
			$stateParams.pagecontext = 'S';
			return 'views/biz-overview/biz-overview.html';
		  },
      })
	  
	   
	  .state('overviewcat', { 
          url: '/overviewcat',
          templateUrl: function ($stateParams){
			$stateParams.pagecontext = 'C';
			return 'views/biz-overview-category/biz-overview-category.html';
		  },
		  
		 
      })
	/*  
	  .state('scorecards', { 
          url: "/scorecards",
          templateUrl: function ($stateParams){
			$stateParams.pagecontext = 'scorecard';
			return 'views/scorecard/scorecard-latest.html';
		  },
      })
	  
	 */
	 
	 /* Below I have duplicated scorecard-latest.html and replaced with scorecard-latest-home.html
	    which has the include for the summary and new logic for toggling, etc. */
      .state('scorecards', { 
          url: "/scorecards",
          templateUrl: function ($stateParams){
			$stateParams.pagecontext = 'scorecard';
			return 'views/scorecard/scorecard-latest-home.html';
		  },
      })
	  
	  .state('tools', { 
          url: "/tools",
		 templateUrl: 'views/tools/tools-latest.html' 
		  
      })
	  
	  .state('adminuser', { 
          url: "/adminuser",
          templateUrl: 'views/admin/admin-users.html'
      })
	  
	  
	//$stickyStateProvider.enableDebug(true); 
	
//	$compileProvider.debugInfoEnabled(false); // performance enhancement - don't show all debug in inspector view 
  });