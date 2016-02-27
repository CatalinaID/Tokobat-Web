
angular.module('sbAdminApp')
  .controller('TransactionCtrl', function($scope, $rootScope, DTOptionsBuilder, $resource, $filter) {
      $scope.id = $rootScope.id;
      $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(10)
          .withOption('bLengthChange', false);

  		var getAllOrder  = $resource(Config.API_URL + '/transactions/finished', {apotekId: $scope.id}, {
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
