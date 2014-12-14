/**
 * Created by wenyuan on 2014-12-08.
 */
"use strict";
var app = angular.module('fpdbengine', ['angularBootstrapNavTree', 'app-controllers']);

app.factory('GlobalCache', ['$cacheFactory', function($cacheFactory){
  return $cacheFactory('global-cache');
}]);

app.controller('AppController', ['$scope', 'GlobalCache', function($scope, GlobalCache){
  $scope.needLogIn = function(){
    return GlobalCache.get('user') === undefined;
  };
}]);