'use strict';


angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope, $rootScope, $state, AuthenticationService) {
   	$scope.login = function() {
      
  		AuthenticationService.Login($scope.username, $scope.password, function(response){
        if (response.message === "success") {
  				$state.go('dashboard.home');
  			} else {
  				$scope.error = response.message;
  			}
  		});
  	}
  });