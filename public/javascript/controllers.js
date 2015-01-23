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
	'$rootScope',
	'$state',
	'DataSourceList',
	'DBList',
	'SelectedPath',
	'DataSource',
	'DataSourceResource',
	'DBDefinition',
	function($scope, $rootScope, $state, DataSourceList, DBList, SelectedPath, DataSource, DataSourceResource, DBDefinition){
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
			}, function(){
				alert('Get data source list failed!');
			});

		$scope.$on('datasourceListUpdated', function(){
			$scope.model.sourceData = DataSourceList.getData();
		});

		$scope.methods = {
			gotoAddDatabase: function(){
				DBDefinition.reset();
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
	'TableDefinition',
	function($scope, DBDefinition, DataSourceList, $state, TableDefinition){
		$scope.model = {
			db: DBDefinition.getData(),
			dataSourceList: DataSourceList.getData()
		};

		$scope.methods = {
			gotoEditTable: function(table){
				TableDefinition.set(table);
				$state.go('table');
			},

			gotoRemoveTable: function(tableIndex){
				DBDefinition.removeTableByIndex(tableIndex);
			},

			gotoAddTable: function(){
				TableDefinition.reset();
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

			cancelDBDefinitionEdit: function(){},

			removeDB: function(){},

			removeBtnDisabled: function(){
				if(DBDefinition.get('def').dbName === ''){
					return true;
				}
				else{
					return false;
				}
			}
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
	'$state',
	'TableDefinition',
	'DataTypeList',
	'DBDefinition',
	function($scope, $state, TableDefinition, DataTypeList, DBDefinition){
		$scope.model = {
			table: _.cloneDeep(TableDefinition.getData()),
			dataTypeList: DataTypeList.getData()
		};

		$scope.methods = {
			addColumn: function(){
				$scope.model.table.columns.push(TableDefinition.getDefaultColumn());
			},

			removeColumn: function(columnIndex){
				_.remove($scope.model.table.columns, function(column, index){
					return index === columnIndex;
				});
			},

			saveTable: function(){
				var oldTableName = TableDefinition.get('name');
				TableDefinition.set($scope.model.table);
				if(oldTableName === ''){
					DBDefinition.addTable(TableDefinition.getData());
				}
				else{
					DBDefinition.updateTable(oldTableName, TableDefinition.getData());
				}
				$state.go('db');
			},

			cancelTableEdit: function(){
				$state.go('db');
			},

			resetTableEdit: function(){
				$scope.model.table = _.cloneDeep(TableDefinition.getData());
			}
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