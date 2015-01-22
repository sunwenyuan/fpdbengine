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
	'DataSource',
	'DataSourceResource',
	function($scope, $state, DataSourceList, DBList, SelectedPath, DataSource, DataSourceResource){
		$scope.model = {
			sourceData: DataSourceList.getData(),
			dbData: DBList.getData(),
			selectedPath: SelectedPath.getData()
		};

		$scope.model.dbTree = {};
		$scope.model.sourceTree = {};

		DataSourceResource
			.getList()
			.$promise
			.then(function(response){
				DataSourceList.set(response);
				$scope.model.sourceData = DataSourceList.getData();
			}, function(){
				alert('Get data source list failed!');
			});

		$scope.methods = {
			gotoAddDatabase: function(){
				$state.go('db');
			},

			gotoAddDataSource: function(){
				DataSource.reset();
				$state.go('datasource');
			},

			sourceTreeSelectHandler: function(branch){
				var sourceName = branch.label;
				DataSourceResource
					.get({sourceName: sourceName})
					.$promise
					.then(function(response){
						DataSource.set(response);
						$state.go('datasource');
					}, function(){
						alert('Data source not found!');
					});
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

			gotoAddInterface: function(){
				$state.go('interface');
			},

			gotoEditTrigger: function(trigger){},

			gotoRemoveTrigger: function(trigger){},

			gotoAddTrigger: function(){},

			saveDBDefinition: function(){},

			cancelDBDefinitionEdit: function(){}
		};
	}
]);

controllers.controller('EditDataSourceController', [
	'$scope',
	'$state',
	'DataSource',
	'DataSourceResource',
	function($scope, $state, DataSource, DataSourceResource){
		$scope.model = {
			dataSource: _.clone(DataSource.getData(), true)
		};

		$scope.methods = {
			saveDataSource: function(){
				if(DataSource.get('sourceName') === ''){
					DataSourceResource
						.save($scope.model.dataSource)
						.$promise
						.then(function(){
							DataSource.set($scope.model.dataSource);
						}, function(){
							alert('Save data source failed!');
						});
				}
				else{
					DataSourceResource
						.modify({
							oldSourceName: DataSource.get('sourceName'),
							data: $scope.model.dataSource
						})
						.$promise
						.then(function(){
							DataSource.set($scope.model.dataSource);
						}, function(){
							alert('Modify data source failed!');
						});
				}
			},

			resetDataSource: function(){
				$scope.model.dataSource = _.clone(DataSource.getData(), true);
			},

			removeDataSource: function(){
				var sourceName = DataSource.get('sourceName');
				DataSourceResource
					.remove({sourceName: sourceName})
					.$promise
					.then(function(){
						DataSource.reset();
						$state.go('datasource');
					}, function(){
						alert('Remove data source failed!');
					});
			},

			removeBtnDisabled: function(){
				if(DataSource.get('sourceName') === ''){
					return true;
				}
				else{
					return false;
				}
			}
		};
	}
]);

controllers.controller('EditTableController', [
	'$scope',
	'TableDefinition',
	'DataTypeList',
	function($scope, TableDefinition, DataTypeList){
		$scope.model = {
			table: TableDefinition.getData(),
			dataTypeList: DataTypeList.getData()
		};

		$scope.methods = {
			addColumn: function(){

			},

			removeColumn: function(){},

			saveTable: function(){},

			cancelTableEdit: function(){}
		};
	}
]);

controllers.controller('EditInterfaceController', [
	'$scope',
	'InterfaceDefinition',
	function($scope, InterfaceDefinition){
		$scope.model = {
			api: InterfaceDefinition.getData()
		};

		$scope.methods = {
			saveInterface: function(){},

			cancelInterfaceEdit: function(){},

			addParam: function(){},

			removeParam: function(){}
		};
	}
]);