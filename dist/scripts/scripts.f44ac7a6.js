"use strict";angular.module("budgeterApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","chart.js"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("budgeterApp").controller("MainCtrl",["$scope",function(a){a.items=[],a.addItem=function(){a.editorEnabled=!1,"debt"===a.item.category||"bills"===a.item.category||"lifestyle"===a.item.category?a.items.push({type:"subtract",category:a.item.category,name:a.item.name,amount:a.item.amount}):"income"===a.item.category?a.items.push({type:"add",category:a.item.category,name:a.item.name,amount:a.item.amount}):"savings"===a.item.category&&a.items.push({type:"subtract",category:a.item.category,amount:a.item.amount}),a.item={},a.total()},a.removeItem=function(b){a.items.splice(a.items.indexOf(b),1),a.total()},a.totalAdd=0,a.totalSubtract=0,a.totalSavings=0,a.total=function(){a.totalAdd=0,a.totalSubtract=0,a.totalSavings=0,angular.forEach(a.items,function(b){"add"===b.type&&(a.totalAdd+=b.amount),"subtract"===b.type&&(a.totalSubtract+=b.amount),"savings"===b.category&&(a.totalSavings+=b.amount)}),a.labels=["Income","Expenses","Savings"],a.data=[a.totalAdd,a.totalSubtract,a.totalSavings]}}]),angular.module("budgeterApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("budgeterApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="row"> <div class="col-md-7"> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"> Add an item </h3> </div> <div class="panel-body"> <form class="form-inline" name="incomeForm" ng-submit="addItem()"> <div class="form-group"> <select name="type-select" class="form-control" ng-model="item.category"> <option value="">--Select type--</option> <option value="income">Income</option> <option value="savings" ng-model="selected">Savings</option> <option value="debt">Debt</option> <option value="bills">Bill</option> <option value="lifestyle">Lifestyle</option> </select> </div> <div class="form-group"> <input placeholder="Name" class="form-control" type="text" ng-if="item.category!=\'savings\'" ng-model="item.name"> </div> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input placeholder="Amount" class="form-control" type="number" ng-model="item.amount"> </div> </div> <button type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </form> </div> </div> </div> </div> <div class="row"> <div class="col-md-6"> <ul class="list-group"> <li class="list-group-item"> <h4 class="list-group-item-heading"> Total Monthly Income <span class="label label-success pull-right">{{ totalAdd | currency }}</span> </h4> </li> <li class="list-group-item"> <h4 class="list-group-item-heading"> Total Monthly Expenses <span class="label label-warning pull-right">{{ totalSubtract | currency }}</span> </h4> </li> <li class="list-group-item"> <h4 class="list-group-item-heading"> Total Monthly Savings <span class="label label-info pull-right">{{ totalSavings | currency }}</span> </h4> </li> <li class="list-group-item"> <h4 class="list-group-item-heading"> Total Monthly Cash Balance <span ng-class="{\'label-danger\': totalAdd - totalSubtract < 0, \'label-primary\': totalAdd - totalSubtract >= 0 }" class="label pull-right">{{ totalAdd - totalSubtract | currency }}</span> </h4> </li> </ul> </div> <div ng-show="items.length" class="col-md-6"> <div class="panel panel-default"> <div class="panel-body"> <canvas id="pie" class="chart chart-pie" chart-data="data" chart-labels="labels"> </canvas> </div> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="panel panel-success"> <div class="panel-heading"> <h3 class="panel-title">Monthly Income</h3> </div> <table class="table table-striped table-hover"> <tr ng-show="!(items | filter:{category:\'income\'}).length"> <td colspan="#" class="text-muted">Income sources...</td> </tr> <tr ng-repeat="item in items | filter:{category:\'income\'}"> <td ng-hide="item.isEdited">{{ item.name }}</td> <td ng-hide="item.isEdited">{{ item.amount | currency }}</td> <td ng-hide="item.isEdited"> <div class="btn-group pull-right" role="group"> <button type="button" class="btn btn-primary" ng-click="item.isEdited = true"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button> <button type="button" class="btn btn-danger" ng-click="removeItem(item)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </div> </td> <form ng-show="item.isEdited" class="form-inline" name="editForm"> <td ng-show="item.isEdited"> <div class="form-group"> <input class="form-control" ng-model="item.name"> </div> </td> <td ng-show="item.isEdited"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input class="form-control" ng-model="item.amount"> </div> </div> </td> <td class="pull-right" ng-show="item.isEdited"> <button ng-click="saveEdit(item); item.isEdited = false; total();" type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </td> </form> </tr> </table> </div> </div> <div class="col-md-6"> <div class="panel panel-warning"> <div class="panel-heading"> <h3 class="panel-title">Monthly Debt Payments</h3> </div> <table class="table table-striped table-hover"> <tr ng-show="!(items | filter:{category:\'debt\'}).length"> <td colspan="#" class="text-muted">Credit card, student loan...</td> </tr> <tr ng-repeat="item in items | filter:{category:\'debt\'}"> <td ng-hide="item.isEdited">{{ item.name }}</td> <td ng-hide="item.isEdited">{{ item.amount | currency }}</td> <td ng-hide="item.isEdited"> <div class="btn-group pull-right" role="group"> <button type="button" class="btn btn-primary" ng-click="item.isEdited = true"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button> <button type="button" class="btn btn-danger" ng-click="removeItem(item)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </div> </td> <form ng-show="item.isEdited" class="form-inline" name="editForm"> <td ng-show="item.isEdited"> <div class="form-group"> <input class="form-control" ng-model="item.name"> </div> </td> <td ng-show="item.isEdited"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input class="form-control" ng-model="item.amount"> </div> </div></td> <td class="pull-right" ng-show="item.isEdited"> <button ng-click="saveEdit(item); item.isEdited = false; total();" type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </td> </form> </tr> </table> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="panel panel-warning"> <div class="panel-heading"> <h3 class="panel-title">Monthly Bills</h3> </div> <table class="table table-striped table-hover"> <tr ng-show="!(items | filter:{category:\'bills\'}).length"> <td colspan="#" class="text-muted">Rent, cell phone, internet...</td> </tr> <tr ng-repeat="item in items | filter:{category:\'bills\'}"> <td ng-hide="item.isEdited">{{ item.name }}</td> <td ng-hide="item.isEdited">{{ item.amount | currency }}</td> <td ng-hide="item.isEdited"> <div class="btn-group pull-right" role="group"> <button type="button" class="btn btn-primary" ng-click="item.isEdited = true"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button> <button type="button" class="btn btn-danger" ng-click="removeItem(item)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </div> </td> <form ng-show="item.isEdited" class="form-inline" name="editForm"> <td ng-show="item.isEdited"> <div class="form-group"> <input class="form-control" ng-model="item.name"> </div> </td> <td ng-show="item.isEdited"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input class="form-control" ng-model="item.amount"> </div> </div></td> <td class="pull-right" ng-show="item.isEdited"> <button ng-click="saveEdit(item); item.isEdited = false; total();" type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </td> </form> </tr> </table> </div> </div> <div class="col-md-6"> <div class="panel panel-warning"> <div class="panel-heading"> <h3 class="panel-title">Monthly Lifestyle Payments</h3> </div> <table class="table table-striped table-hover"> <tr ng-show="!(items | filter:{category:\'lifestyle\'}).length"> <td colspan="#" class="text-muted">Groceries, gym membership, gas...</td> </tr> <tr ng-repeat="item in items | filter:{category:\'lifestyle\'}"> <td ng-hide="item.isEdited">{{ item.name }}</td> <td ng-hide="item.isEdited">{{ item.amount | currency }}</td> <td ng-hide="item.isEdited"> <div class="btn-group pull-right" role="group"> <button type="button" class="btn btn-primary" ng-click="item.isEdited = true"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button> <button type="button" class="btn btn-danger" ng-click="removeItem(item)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </div> </td> <form ng-show="item.isEdited" class="form-inline" name="editForm"> <td ng-show="item.isEdited"> <div class="form-group"> <input class="form-control" ng-model="item.name"> </div> </td> <td ng-show="item.isEdited"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input class="form-control" ng-model="item.amount"> </div> </div></td> <td class="pull-right" ng-show="item.isEdited"> <button ng-click="saveEdit(item); item.isEdited = false; total();" type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </td> </form> </tr> </table> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="panel panel-info"> <div class="panel-heading"> <h3 class="panel-title">Monthly Savings</h3> </div> <table class="table table-striped table-hover"> <tr ng-show="!(items | filter:{category:\'savings\'}).length"> <td colspan="#" class="text-muted">Savings installments...</td> </tr> <tr ng-repeat="item in items | filter:{category:\'savings\'}"> <td ng-hide="item.isEdited">{{ item.amount | currency }}</td> <td ng-hide="item.isEdited"> <div class="btn-group pull-right" role="group"> <button type="button" class="btn btn-primary" ng-click="item.isEdited = true"> <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> </button> <button type="button" class="btn btn-danger" ng-click="removeItem(item)"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span> </button> </div> </td> <form ng-show="item.isEdited" class="form-inline" name="editForm"> <td ng-show="item.isEdited"> <div class="form-group"> <div class="input-group"> <div class="input-group-addon">$</div> <input class="form-control" ng-model="item.amount"> </div> </div></td> <td class="pull-right" ng-show="item.isEdited"> <button ng-click="saveEdit(item); item.isEdited = false; total();" type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> </button> </td> </form> </tr> </table> </div> </div> </div>')}]);