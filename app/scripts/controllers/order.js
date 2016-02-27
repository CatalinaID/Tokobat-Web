'use strict';


angular.module('sbAdminApp')
  .controller('OrderCtrl', function($rootScope, $scope, DTOptionsBuilder, $resource, $filter) {
      $scope.id = $rootScope.id;
      $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(10)
          .withOption('order', [2, 'desc']);

  		var getAllOrder  = $resource(Config.API_URL + '/transactions', {apotekId: $scope.id}, {
        'get': {method: 'GET'}
      });

      $scope.orderdata = [];

      getAllOrder.get(function(response) {
        for (var i = 0; i < response.total; i++) {
          if (response.transactions[i].status != 'FINISHED' && response.transactions[i].status != 'DECLINED'){
            $scope.orderdata.push({
              "name" : response.transactions[i].senderName,
              "read" : response.transactions[i].read,
              "id" : response.transactions[i].transId,
              "timestamp" : response.transactions[i].dateCreate,
              "status" : response.transactions[i].status
            });
          }
        };
      });

      $scope.set_style = function(data) {
        if (!data.read) {
          return {"font-weight" : "bold"}
        } else {
          return {"font-weight" : "normal"}
        }
      }

  });

angular.module('sbAdminApp')
  .controller('OrderDetailsCtrl', function($scope,$resource, $stateParams, $modal) {
      $scope.id = $stateParams.id;
      $scope.leftActive = true;
      $scope.rightActive = true;

      var getDetails  = $resource(Config.API_URL + '/transactions/detail', {id: $scope.id}, {
        'get': {method: 'GET'}
      }); 
      var updateStatus = $resource(Config.API_URL + '/transactions/:id', 
        {id:'@id', apotekNotes:'@apotekNotes', totalPrice:'@totalPrice',status:'@status'}, 
        {'put': {method: 'PUT'}
      });

      getDetails.get(function(response) {
        $scope.name = response.user.name;
        $scope.date = response.dateCreate;
        $scope.description = response.description;
        $scope.notes = response.notes;
        $scope.status = response.status;

        if (response.imgPath == null) {
          $scope.isResep = false;
        } else {
          $scope.isResep = true;
          $scope.imgPath = Config.API_URL + '/transactions/get-resep?imgPath='+response.imgPath;
        }

        if ($scope.status === 'WAITING') {
          $scope.leftActive = false;
          $scope.rightActive = true;
        } else if ($scope.status === 'ACCEPTED' || $scope.status === 'DECLINED' || $scope.status === 'PAID') {
          $scope.leftActive = true;
          $scope.rightActive = false;
        } else if ($scope.status === 'READY' || $scope.status === 'FINISHED') {
          $scope.leftActive = true;
          $scope.rightActive = true;
        }
      });

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
          var param = {
            "id" : $scope.id,
            "status" : "DECLINED",
            "apotekNotes" : apotekNotes
          };
          updateStatus.put(param, function(response) {
            $scope.leftActive = true;
            console.log(param);
          });
        });
      };

      $scope.acceptOrder = function() {
        var modalAccept = $modal.open({
          animation: true,
          templateUrl: 'views/modal/accept_order.html',
          controller: 'ModalAcceptOrderController',
          backdrop: 'static',
          size: "lg",
          scope:$scope
        });

        modalAccept.result.then(function(result) {
          var acceptParam = {
            "id" : $scope.id,
            "status" : "ACCEPTED",
            "apotekNotes" : result.apotekNotes,
            "totalPrice" : result.totalPrice
          };
          console.log(acceptParam);
          updateStatus.put(acceptParam, function(response) {
            $scope.leftActive = true;
          });
        });
      };

      $scope.orderReady = function() {
        var param = {
          "id" : $scope.id,
          "status" : "READY"
          };
          console.log(param);
          updateStatus.put(param, function(response) {
            $scope.rightActive = true;
            $scope.leftActive = true;
          });
      };
  });

  angular.module('sbAdminApp')
  .controller('ModalDeclineOrderController', function($scope,$modalInstance) {
      
      $scope.ok = function () {
        $modalInstance.close($scope.apotekNotes);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });

  angular.module('sbAdminApp')
  .controller('ModalAcceptOrderController', function($scope,$modalInstance) {
      
      $scope.ok = function () {
        $scope.result = {
          "apotekNotes" : $scope.apotekNotes,
          "totalPrice" : $scope.totalPrice
        }
        $modalInstance.close($scope.result);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
