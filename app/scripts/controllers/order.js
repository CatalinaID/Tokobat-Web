'use strict';


angular.module('sbAdminApp')
  .controller('OrderCtrl', function($scope, DTOptionsBuilder, $resource, $filter) {
      $scope.id = 1;
      $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(10)
          .withOption('bLengthChange', false);

  		var getAllOrder  = $resource(Config.API_URL + '/transactions', {apotekId: $scope.id}, {
        'get': {method: 'GET'}
      });

      $scope.orderdata = [];

      getAllOrder.get(function(response) {
        for (var i = 0; i < response.total; i++) {
          $scope.orderdata.push({
            "name" : response.transactions[i].senderName,
            "read" : response.transactions[i].read,
            "id" : response.transactions[i].transId,
            "timestamp" : response.transactions[i].dateCreate,
            "status" : response.transactions[i].status
          });
        };
      });

  });

angular.module('sbAdminApp')
  .controller('OrderDetailsCtrl', function($scope,$resource, $stateParams, $modal) {
      $scope.id = $stateParams.id;

      var getDetails  = $resource(Config.API_URL + '/transactions/detail', {id: $scope.id}, {
        'get': {method: 'GET'}
      }); 

      getDetails.get(function(response) {
        $scope.name = response.user.name;
        $scope.date = response.dateCreate;
        $scope.description = response.description;
        $scope.notes = response.notes;
        $scope.imgPath = response.imgPath;

        if ($scope.imgPath == null && $scope.description != null) {
          $scope.isResep = false;
        } else {
          $scope.isResep = true;
          $scope.imgPath = Config.API_URL + '/transactions/get-resep?imgPath=resep-2016-02-26%2009:15:20.263';
        }

        $scope.declineOrder = function() {
          var modalDecline = $modal.open({
            animation: true,
            templateUrl: 'views/modal/decline_order.html',
            controller: 'ModalDeclineOrderController',
            backdrop: 'static',
            size: "lg",
            scope:$scope
          });

          modalDecline.result.then(function(apotekNotes) {
            $scope.apotekNotes = apotekNotes;
          }, function() {

          });
        };

        $scope.acceptOrder = function() {

        };

        $scope.orderReady = function() {

        };





      });
  });

  angular.module('sbAdminApp')
  .controller('ModalDeclineOrderController', function($scope,$resource, $modalDecline) {
      
      $scope.ok = function () {
        $modalDecline.close($scope.apotekNotes);
      };

      $scope.cancel = function () {
        $modalDecline.dismiss('cancel');
      };
  });
