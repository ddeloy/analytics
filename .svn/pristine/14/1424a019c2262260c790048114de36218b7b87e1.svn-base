//'use strict';

/**
 * @ngdoc function
 * @name tpanalyticsApp.controller:ModalController
 * @description
 * # ModalController
 * Controller of the tpanalyticsApp
 */
angular.module('tpanalyticsApp')
 .controller('ModalCtrl',['$scope', '$rootScope', '$modal','$templateCache', '$timeout', '$alert', 'queryService', '$window','$confirm', function($scope, $rootScope, $modal,$templateCache, $timeout, $alert, queryService, $window, $confirm) {
   
   /* Create Saved List - New Version*/
   var savedlistModal = $modal({
   template:'views/modal/create.saved.list.modal.html', 
    show: false});
   $scope.showSavedlistModal = function(edit) {
	 if(edit) {
		$rootScope.editWL = edit;
	 } else {
		$rootScope.editWL = false;
	 }
     savedlistModal.$promise.then(savedlistModal.show);
   };
   queryService.showSavedlistModal = $scope.showSavedlistModal;
   $scope.hideModal = function() {
     savedlistModal.$promise.then(savedlistModal.hide);
   };
   
    /* Save Selected Suppliers */
   var saveSelectedlistModal = $modal({
   template:'views/modal/save.selected.list.modal.html', 
    show: false});
   $scope.showSelectedlistModal = function() {
    $rootScope.editWL = false;
    saveSelectedlistModal.$promise.then(saveSelectedlistModal.show);
   };
   $scope.hideModal = function() {
     saveSelectedlistModal.$promise.then(saveSelectedlistModal.hide);
   };
   
 /* Alerts for add/update users */
 var successAlertUserAdded = $alert({
	  title:'<span class="span-alert-title"><i class="icon-user-manage fa fa-check-circle"/>' + 'Success:' +'</span>',
	  content:'<span class="span-alert-content">' +'New user has been successfully created.' + '</span>', 
	  placement: 'top', 
     //duration:'3',
	  template:'views/modal/alert.tpl.html',
	  type: 'success',
	 //dismissable:false, 
	  keyboard: true, 
	  show: false});
 	  $scope.showSuccessAlertUserAdded = function() {
        successAlertUserAdded.show();
	  
		$timeout(function () {
		   window.location.reload();
		}, 4000);
     };
	
  var successAlertUserUpdated = $alert({
	   title:'<span class="span-alert-title"><i class="icon-user-manage fa fa-check-circle"/>' + 'Success:' +'</span>',
	   content:'<span class="span-alert-content">' +'Changes to the user account have been saved.' + '</span>', 
	   placement: 'top', 
       //duration:'4',
	   template:'views/modal/alert.tpl.html',
	   type: 'success',
	   //dismissable:false, 
	   keyboard: true, 
	   show: false});
 	   $scope.showSuccessAlertUserUpdated = function() {
         successAlertUserUpdated.show();
		 
		 $timeout(function () {
		   window.location.reload();
		}, 4000);
     };
   
   var errorAlertUserNotAdded = $alert({
	   title:'<span class="span-alert-title"><i class="icon-user-manage fa fa-bolt"/>' + 'Error:' + ' ' + $scope.addUserMsg +'</span>',
	   content:'<span class="span-alert-content">' +'User has not been added. Please resubmit' + '</span>', 
	   placement: 'top', 
       //duration:'3',
	   template:'views/modal/alert.tpl.html',
	   type: 'danger', 
	   keyboard: true, 
	   show: false});
 	 	$scope.showErrorAlertUserNotAdded = function() {
      		errorAlertUserNotAdded.show();
    };
	
   var errorAlertUserGeneric = $alert({
	   title:'<span class="span-alert-title"><i class="icon-user-manage fa fa-bolt"/>' + 'Error:' + ' ' + $scope.addUserMsg +'</span>',
	   content:'<span class="span-alert-content">' +'There has been an error. Please resubmit' + '</span>', 
	   placement: 'top', 
       //duration:'3',
	   template:'views/modal/alert.tpl.html',
	   type: 'danger', 
	   keyboard: true, 
	   show: false});
 	 	$scope.showErrorAlertUserGeneric = function() {
      		errorAlertUserGeneric.show();
    };
	
	   var errorAlertResetPasswordFailed = $alert({
	   title:'<span class="span-alert-title"><i class="icon-user-manage fa fa-bolt"/>' + 'Error:' + '</span>',
	   content:'<span class="span-alert-content">' +'Reset password was unssuccesful . Please retry' + '</span>', 
	   placement: 'top', 
       //duration:'3',
	   template:'views/modal/alert.tpl.html',
	   type: 'danger', 
	   keyboard: true, 
	   show: false});
 	 	$scope.showErrorAlertResetPasswordFailed  = function() {
      		errorAlertResetPasswordFailed.show();
    };

  
   /* End alerts for user add/update */
   
   /* Add User Modal */
   var userAddModal = $modal({
   title: 'Title', 
   content: 'Sample Content',
   template:'views/modal/user.add.modal.html',
   show: false});
   $scope.addUserMsg = '';
   $scope.showUserAddModal = function() {
     userAddModal.$promise.then(userAddModal.show);
   };
   $scope.hideUserAddModal = function() {
     userAddModal.$promise.then(userAddModal.hide);
   };
  
	
	$scope.addUser = function(newUser, userId) {
		console.log('addUser ' + newUser);
		$scope.addUserMsg = '';
		//if($rootScope.admin) {
		if(!$rootScope.admin) {
			console.log('logging out...'); //TODO: prevent even accessing adminuser page
			$window.location.href = "/login";
			return;
		}
		
		var email, fn, ln, role, active;
		if(newUser) {
			email = $("#email").val();
			fn = $("#fn").val();
			ln = $("#ln").val();
			role = $("#role").val();
			active = "Active" == $("#status").val();
		} else {
			email = $('#email'+userId).val();
			fn = $('#fn'+userId).val();
			ln = $('#ln'+userId).val();
			role = $('#role'+userId).val();
			active = "Active" == $('#status'+userId).val();
		}
		var msg = "";
		console.log(role + active);
		$.post("/user/activationLink",{email: email.trim(), firstName: fn.trim(), lastName: ln.trim(), sendEmail: true, role: role, active: active, newUser: newUser, usrId: userId} ,function(data){
			console.log('addUser successful ' + data);
			msg = data.message;
			console.log(data.message);
			if(data.message.indexOf('Activate user link for user') > -1) {
				//alert('User created.');
				//$scope.addUserMsg = 'User created.';
				$scope.showSuccessAlertUserAdded();
				$scope.addUserMsg = 'User created.';

				
			} else if(data.message.indexOf('Successfully updated User') > -1) {
				//alert('Changes to the user account have been saved.');
				//$scope.addUserMsg = 'Changes to the user account have been saved.';
				$scope.showSuccessAlertUserUpdated();
				$scope.addUserMsg = 'Changes to the user account have been saved.';
				

			} else {
				//$scope.addUserMsg = data.message;
				//alert(data.message);
				$scope.addUserMsg = data.message;
				$scope.showErrorAlertUserGeneric();
			}
		})
		.fail(function(data) {
			console.log('User not added. ' + data);
			//alert('User not added. ' + data.message);
			//$scope.addUserMsg = 'User not added. ' + data.message
			$scope.showErrorAlertUserNotAdded();
			$scope.addUserMsg = data.message;
		});
	};
    
	// Password Reset: Uses Modal Confirm Service
    $scope.resetPwd = function(userId, email, fn, ln) {
		console.log('resetPwd '+ userId );
		//if(confirm('By submitting this request an email with a password reset link will be sent to '  + fn + ' ' + ln + " account's email address " + email + '. Please confirm to proceed.')) {
		$confirm({
	    title: "Confirm Reset Password",
        content: "By submitting this request an email with a password reset link will be sent to" + " " + fn + " " + ln + "'s" + " " + " account email address: " + " " + email + "."  + " " + "Please confirm to proceed."
        }).then(
			
			function(){
			$scope.answer='yes';			
			$.post("/user/resetPwd",{sendEmail: true, uid: userId} ,function(data){
				console.log('resetPwd successful ' + data);
				console.log(data.message);

			})
			.fail(function(data) {
				console.log('resetPwd unsuccessful ' + data);
				$scope.showErrorAlertResetPasswordFailed();
			});},
			function() {$scope.answer = 'no';}
			)
			
		}
		
}])

    
