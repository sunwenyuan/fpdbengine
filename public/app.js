/**
 * Created by wenyuan on 2014-12-08.
 */
"use strict";
var app = angular.module('fpdbengine', [
    'angularBootstrapNavTree',
    'app-controllers',
    'ui.router',
    'app-directives'
]);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state('createdb', {
        url: '/createdb',
        templateUrl: 'views/createdb.tpl.html',
        controller: 'CreateDBController'
      });
});

app.factory('GlobalCache', ['$cacheFactory', function($cacheFactory){
  return $cacheFactory('global-cache');
}]);

app.controller('AppController', ['$scope', 'GlobalCache', function($scope, GlobalCache){
  $scope.needLogIn = function(){
    return GlobalCache.get('user') === undefined;
  };
}]);