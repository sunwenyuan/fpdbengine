/**
 * Created by Wenyuan on 2014/12/8.
 */
"use strict";
var controllers = angular.module('app-controllers', ['app-models']);

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

controllers.controller('DashboardController', [
	'$scope',
	'$state',
	'DataSourceList',
	'DBList',
	'SelectedPath',
	function($scope, $state, DataSourceList, DBList, SelectedPath){
		$scope.model = {
			sourceData: DataSourceList.getData(),
			dbData: DBList.getData(),
			selectedPath: SelectedPath.getData()
		};

		$scope.model.dbTree = {};
		$scope.model.sourceTree = {};


		$scope.methods = {
			gotoAddDatabase: function(){
				$state.go('db');
			},

			gotoAddDataSource: function(){
				$state.go('datasource');
			}
		};
	}
]);

controllers.controller('EditDBController', [
	'$scope',
	'DBDefinition',
	'DataSourceList',
	'$state',
	function($scope, DBDefinition, DataSourceList, $state){
		$scope.model = {
			db: DBDefinition.getData(),
			dataSourceList: DataSourceList.getData()
		};

		$scope.methods = {
			gotoEditTable: function(table){

			},

			gotoRemoveTable: function(table){},

			gotoAddTable: function(){
				$state.go('table');
			},

			gotoEditInterface: function(api){},

			gotoRemoveInterface: function(api){},

			gotoAddInterface: function(api){},

			gotoEditTrigger: function(trigger){},

			gotoRemoveTrigger: function(trigger){},

			gotoAddTrigger: function(){},

			saveDBDefinition: function(){},

			cancelDBDefinitionEdit: function(){}
		};
	}
]);

controllers.controller('EditDataSourceController', ['$scope', 'DataSource', function($scope, DataSource){
	$scope.model = {
		dataSource: DataSource.getData()
	};

	$scope.methods = {

	};
}]);

controllers.controller('EditTableController', ['$scope', function($scope){

}]);