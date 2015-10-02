'use strict';

/**
 * @ngdoc function
 * @name budgeterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the budgeterApp
 */
angular.module('budgeterApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.items = [
      {
        'id': 1,
        'type': 'add',
        'category': 'income',
        'name': 'Monthly Income',
        'amount': 1500
      },
      {
        'id': 2,
        'type': 'subtract',
        'category': 'debt',
        'name': 'Student Loan',
        'amount': 200
      },
      {
        'id': 3,
        'type': 'subtract',
        'category': 'debt',
        'name': 'Visa',
        'amount': 150
      },
      {
        'id': 4,
        'type': 'subtract',
        'category': 'bills',
        'name': 'Cell Phone',
        'amount': 90
      },
      {
        'id': 5,
        'type': 'subtract',
        'category': 'lifestyle',
        'name': 'Gym Membership',
        'amount': 45
      },
      {
        'id': 6,
        'type': 'subtract',
        'category': 'lifestyle',
        'name': 'Groceries',
        'amount': 200
      },
      {
        'id': 7,
        'type': 'subtract',
        'category': 'savings',
        'amount': 15
      }
    ];

    $scope.addItem = function() {
      $scope.editorEnabled = false;

      if($scope.item.category==='debt' || $scope.item.category==='bills' || $scope.item.category==='lifestyle') {
        $scope.items.push({
          'type': 'subtract',
          'category': $scope.item.category,
          'name': $scope.item.name,
          'amount': $scope.item.amount
        });
      } else if($scope.item.category==='income') {
        $scope.items.push({
          'type': 'add',
          'category': $scope.item.category,
          'name': $scope.item.name,
          'amount': $scope.item.amount
        });
      } else if($scope.item.category==='savings') {
        $scope.items.push({
          'type': 'subtract',
          'category': $scope.item.category,
          'amount': $scope.item.amount
        });
      }
      $scope.item = {};
    };

    $scope.removeItem = function(item) {
      $scope.items.splice($scope.items.indexOf(item),1);
    };

    $scope.total = function(type) {
      var totalAdd = 0;
      var totalSubtract = 0;
      var totalSavings = 0;
      // var total = 0;

      angular.forEach($scope.items, function(item) {
        if (item.type === type && type==='add') {
          totalAdd += item.amount;
        }
        if (item.type === type && type==='subtract') {
          totalSubtract += item.amount;
        }
        if (item.category === 'savings') {
          totalSavings += item.amount;
        }
      });

      return {totalAdd:totalAdd, totalSubtract:totalSubtract, totalSavings:totalSavings};
    };

  }]);
