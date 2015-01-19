"use strict";
var resources = angular.module('app-resources', ['ngResource']);

resources.factory('DataSourceResource', ['$resource', function($resource){
	return $resource('/datasource', {}, {
		save: {
			method: 'POST',
			url: '/datasource'
		},

		remove: {
			method: 'DELETE',
			url: '/datasource/:name'
		},

		get: {
			method: 'GET',
			url: '/datasource/:name'
		}
	});
}]);

resources.factory('DatabaseResource', ['$resource', function($resource){

}]);

resources.factory('DataSourceListResource', ['$resource', function($resource){

}]);

resources.factory('DatabaseListResource', ['$resource', function($resource){

}]);