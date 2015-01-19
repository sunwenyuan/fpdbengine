/**
 * Created by wenyuan on 2014-12-08.
 */
"use strict";
var app = angular.module('fpdbengine', [
    'angularBootstrapNavTree',
    'app-controllers',
    'ui.router',
    'app-directives',
    'app-models',
	'app-resources'
]);

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('table', {
            url: '/table',
            templateUrl: 'views/edit-table.tpl.html',
            controller: 'EditTableController'
        })
        .state('interface', {
            url: '/api',
            templateUrl: 'views/edit-interface.tpl.html',
            controller: 'EditInterfaceController'
        })
        .state('datasource', {
              url: '/datasource',
              templateUrl: 'views/edit-source.tpl.html',
              controller: 'EditDataSourceController'
        })
        .state('db', {
            url: '/db',
            templateUrl: 'views/edit-db.tpl.html',
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