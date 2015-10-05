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
    $scope.items = [];

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
      $scope.total();
    };

    $scope.removeItem = function(item) {
      $scope.items.splice($scope.items.indexOf(item),1);
      $scope.total();
    };

    $scope.totalAdd = 0;
    $scope.totalSubtract = 0;
    $scope.totalSavings = 0;
    $scope.totalCash = 0;

    $scope.total = function() {
      $scope.totalAdd = 0;
      $scope.totalSubtract = 0;
      $scope.totalSavings = 0;
      angular.forEach($scope.items, function(item) {
        if (item.type==='add') {
          $scope.totalAdd += item.amount;
        }
        if (item.type==='subtract') {
          $scope.totalSubtract += item.amount;
        }
        if (item.category === 'savings') {
          $scope.totalSavings += item.amount;
        }
        $scope.totalCash = $scope.totalAdd - $scope.totalSubtract;
      });
      $scope.labels = ["Cash", "Expenses", "Savings"];
      $scope.colours = ["#337ab7", "#f0ad4e","#5bc0de"];
      $scope.data = [$scope.totalCash, $scope.totalSubtract, $scope.totalSavings];
    };

  }]);
