/**
 * Created by Wenyuan on 2014/12/8.
 */
"use strict";
var controllers = angular.module('app-controllers', []);

controllers.controller('LoginController', ['$scope', 'GlobalCache', function($scope, GlobalCache){
	$scope.userName = 'admin';
	$scope.password = 'admin';
	$scope.submitLoginForm = function(){
		if($scope.userName === 'admin' && $scope.password === 'admin'){
			GlobalCache.put('user', $scope.userName);
		}
		else{
			$scope.userName = '';
			$scope.password = '';
		}
	};
}]);

controllers.controller('DashboardController', ['$scope', '$timeout', function($scope, $timeout){
	var tree;
	$scope.dbData = [{
		label: 'Database 1',
		children: [{
			label: 'Tables',
			children: [{
				label: 'Table 1'
			}, {
				label: 'Table 2'
			}, {
				label: 'Table 3'
			}]
		}, {
			label: 'Interfaces',
			children: [{
				label: 'API1'
			}, {
				label: 'API2'
			}, {
				label: 'API3'
			}]
		}, {
			label: 'Triggers',
			children: [{
				label: 'Trigger1'
			}, {
				label: 'Trigger2'
			}, {
				label: 'Trigger3'
			}]
		}]
	}, {
		label: 'Database 2',
		children: [{
			label: 'Tables',
			children: [{
				label: 'Table 4'
			}, {
				label: 'Table 5'
			}, {
				label: 'Table 6'
			}]
		}, {
			label: 'Interfaces',
			children: [{
				label: 'API4'
			}, {
				label: 'API5'
			}, {
				label: 'API6'
			}]
		}, {
			label: 'Triggers',
			children: [{
				label: 'Trigger4'
			}, {
				label: 'Trigger5'
			}, {
				label: 'Trigger6'
			}]
		}]
	}];

	$scope.selectedPath = [{
		id: 'db1',
		name: 'Database 1'
	}, {
		id: 'table1',
		name: 'Table 1'
	}];

	$scope.dbTree = {};
}]);

controllers.controller('CreateDBController', ['$scope', function($scope){
	$scope.model = {
		dbType: 'MySql',
		dbName: '',
		dbIpAddress: '',
		dbPort: '',
		dbUserName: '',
		dbPassword: '',
		dbCharset: 'utf-8'
	};

	$scope.resetModel = function(){
		$scope.model = {
			dbType: 'MySql',
			dbName: '',
			dbIpAddress: '',
			dbPort: '',
			dbUserName: '',
			dbPassword: '',
			dbCharset: 'utf-8'
		};
	};

	$scope.createDatabase = function(){

	};
}]);