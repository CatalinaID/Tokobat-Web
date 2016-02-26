'use strict';


angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope, $rootScope, $location, AuthenticationService) {

  	// AuthenticationService.ClearCredentials();

  	$scope.login = function() {
      //dummy
      // $location.path('#/dashboard');
      // if ($scope.username === 'apotek1' && $scope.password === 'apotek') {
      //   console.log('true');
      //   $location.path('#/dashboard');
      // } else {
      //   $scope.error = 'Username and/or password invalid';
      // }
        

  		AuthenticationService.Login($scope.username, $scope.password, function(response){
        console.log(response.message)
  			// if (response.message === "success") {
  			// 	AuthenticationService.SetCredentials($scope.username, $scope.password);
     //      $location.path('#/dashboard');
  			// } else {
  			// 	$scope.error = response.message;
  			// }
  		});
  	}
  });