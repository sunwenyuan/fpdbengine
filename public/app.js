/**
 * Created by wenyuan on 2014-12-08.
 */
"use strict";
var app = angular.module('fpdbengine', [
    'angularBootstrapNavTree',
    'app-controllers',
    'ui.router',
    'app-directives',
    'app-models'
]);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('datasource', {
              url: '/datasource',
              templateUrl: 'views/editsource.tpl.html',
              controller: 'EditDataSourceController'
        })
        .state('db', {
            url: '/db',
            templateUrl: 'views/editdb.tpl.html',
            controller: 'EditDBController'
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