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
			url: '/datasource/:sourceName'
		},

		get: {
			method: 'GET',
			url: '/datasource/:sourceName'
		},

		modify: {
			method: 'PUT',
			url: '/datasource'
		},

		getList: {
			method: 'GET',
			url: '/datasource/get/list',
			isArray: true
		}
	});
}]);

resources.factory('DatabaseResource', ['$resource', function($resource){
	return $resource('/db', {}, {
		save: {
			method: 'POST',
			url: '/db'
		},

		remove: {
			method: 'DELETE',
			url: '/db/:dbName'
		},

		get: {
			method: 'GET',
			url: '/db/:dbName'
		},

		modify: {
			method: 'PUT',
			url: '/db'
		}
	});
}]);