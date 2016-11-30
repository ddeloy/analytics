
angular.module('tpanalyticsApp').directive('tabs',[ function() {
  return {
      restrict: 'AE', /* restrict: specifies the HTML format of the component.  */
      transclude: true, /* transclude: specifies that when AngularJS replaces the <tabs> element with the expanded HTML that it should place the original content somewhere specified by ng-transclude directive (see below) */
      scope: {}, /* scope: our component needs to have a private scope so that it's view properties are not accidentally modified outside the <tabs> */
	  /* Just like with the application, the component can have a controller provides the component's behavior */
      controller: function($scope, $element) { /* $scope: current scope of the component. $element: current DOM element of the component */
        var panes = $scope.panes = [];

        $scope.select = function(pane) { /* select: publish a select() method which will be used by the view to switch between tabs */
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
		/* addPane: Components often need to collaborate as a unit. In this case the <pane> will use the addPane() method to register itself with its <tabs> container */
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
	  /* template: The HTML which needs to be rendered by the browser instead of the <tabs> placeholder. Note: the HTML in a template can have other directives in it */
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+ /* I set the active CSS class to show the currently active tab */
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' + /* ng-click directive: select the clicked tab */
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' + /* ng-transclude directive: marks the location where the content of the <tabs> element will be placed. */
        '</div>',
      replace: true /* replace: tells AngularJS that the original <tabs> element should be replaced with the template rather than appending to it */
    };
  }]);

angular.module('tpanalyticsApp').directive('pane',[ function() {
  return {
      require: '^tabs', /* require: specifies that the <pane> component must be inside a <tabs> component. This gives the <pane> component the abilty to access the <tabs> controller methods-- the addPane() method in this case */
      restrict: 'AE',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) { /* tabsCtrl: As specified, I require the <tabs> as the container - we get passed its controller instance */
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true 
    };
  }])
  
  angular.module('tpanalyticsApp').directive('subtabs',[ function() {
  return {
      restrict: 'AE', /* restrict: specifies the HTML format of the component. */
      transclude: true, /* transclude: specifies that when AngularJS replaces the <tabs> element with the expanded HTML that it should place the original content somewhere specified by ng-transclude directive (see below) */
      scope: {}, /* scope: our component needs to have a private scope so that it's view properties are not accidentally modified outside the <tabs> */
	  /* Just like with the application, the component can have a controller provides the component's behavior */
      controller: function($scope, $element) { /* $scope: current scope of the component. $element: current DOM element of the component */
        var panes = $scope.panes = [];

        $scope.select = function(pane) { /* select: publish a select() method which will be used by the view to switch between tabs */
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }
		/* addPane: Components often need to collaborate as a unit. In this case the <pane> will use the addPane() method to register itself with its <tabs> container */
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
	  /* template: The HTML which needs to be rendered by the browser instead of the <tabs> placeholder. Note: the HTML in a template can have other directives in it */
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs secondary">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+ /* I set the active CSS class to show the currently active tab */
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' + /* ng-click directive: select the clicked tab */
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' + /* ng-transclude directive: marks the location where the content of the <tabs> element will be placed. */
        '</div>',
      replace: true /* replace: tells AngularJS that the original <tabs> element should be replaced with the template rather than appending to it */
    };
  }]);

angular.module('tpanalyticsApp').directive('subpane',[ function() {
  return {
      require: '^subtabs', /* require: specifies that the <pane> component must be inside a <tabs> component. This gives the <pane> component the abilty to access the <tabs> controller methods-- the addPane() method in this case */
      restrict: 'AE',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) { /* tabsCtrl: As specified, I require the <tabs> as the container - we get passed its controller instance */
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true 
    };
  }])



