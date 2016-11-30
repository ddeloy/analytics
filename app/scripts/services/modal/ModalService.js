/**
* @ngdoc function
* @name tpanalyticsApp.service:ModalService
* @description
* # ModalService
* Service of the tpanalyticsApp
*/


angular.module('tpanalyticsApp')
    .factory('$confirm', function($modal, $rootScope, $q) {
  return function(config) {
    var scope = $rootScope.$new(),
      deferred = $q.defer(),
      confirm;
    scope.title = config.title;
    scope.content = config.content;
    scope.yes = function(res) {
      deferred.resolve(res);
      confirm.hide();
    };
    scope.no = function(res) {
      deferred.reject(res);
      confirm.hide();
    };
    confirm = $modal({
      templateUrl: 'views/modal/confirm.tpl.html',
      scope: scope,
      show: false
    });
    confirm.$promise.then(confirm.show);
    return deferred.promise;
  };
})

.controller('ModalConfirmController', function($scope, $confirm,$timeout) {
  
 $scope.delete = function() {
    $confirm({
      title: 'Confirm List Deletion',
      content: 'Are you sure?' + ' ' + $scope.wlName + ' will be permanently deleted.'
    }).then(
      function() {$scope.answer = 'yes';$scope.delWatchlist();window.location.reload();},
      function() {$scope.answer = 'no';}
    );
  };
  
})


