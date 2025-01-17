//'use strict';
/**
 * @ngdoc function
 * @name tpanalyticsApp.directive:angular-gridster
 * @description
 * # angular-gridster
 * Directive of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
/*  .directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, ele, attr, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
					return null;
				}
				return parseInt(viewValue, 10);
			});
		}
	};
})*/

.controller('GridsterController',['$scope', function($scope) {
	$scope.gridsterOpts = {
	columns: 12, // the width of the grid, in columns
	pushing: true, // whether to push other items out of the way on move or resize
	floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
	swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
	width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
	colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
	rowHeight: 42, // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
	margins: [10, 10], // the pixel distance between each widget
	outerMargin: false, // whether margins apply to outer edges of the grid
	isMobile: false, // stacks the grid items if true
	mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
	mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
	minColumns: 12, // the minimum columns the grid must have
	minRows: 1, // the minimum height of the grid, in rows
	maxRows: 100,
	defaultSizeX: 12, // the default width of a gridster item, if not specifed
	defaultSizeY: 1, // the default height of a gridster item, if not specified
	minSizeX: 12, // minimum column width of an item
	maxSizeX: null, // maximum column width of an item
	minSizeY: 1, // minumum row height of an item
	maxSizeY: null, // maximum row height of an item
	resizable: {
	   enabled: true,
	   handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
	   start: function(event, $element, widget) {}, // optional callback fired when resize is started,
	   resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
	   stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
	},
	draggable: {
	   enabled: false, // whether dragging items is supported
	   handle: '.my-class', // optional selector for resize handle
	   start: function(event, $element, widget) {}, // optional callback fired when drag is started,
	   drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
	   stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
	}
};
}])