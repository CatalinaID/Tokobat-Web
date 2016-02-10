'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('OrderCtrl', function($scope, DTOptionsBuilder) {
  		$scope.dummyData = [];
  		
  		$scope.dtOptions = DTOptionsBuilder.newOptions()
	        .withDisplayLength(10)
	        .withOption('bLengthChange', false);

	    $scope.dummyData.push({
  			"name" : "Tiger Nixon",
  			"timestamp" : "2011/04/25"
  		});
  		$scope.dummyData.push({
  			"name" : "Garrett Winters",
  			"timestamp" : "2011/07/25"
  		});
  		$scope.dummyData.push({
  			"name" : "Ashton Cox",
  			"timestamp" : "2009/01/12"
  		});
  		$scope.dummyData.push({
  			"name" : "Cedric Kelly",
  			"timestamp" : "2011/04/25"
  		});
  		$scope.dummyData.push({
  			"name" : "Airi Satou",
  			"timestamp" : "2008/11/28"
  		});

  });
