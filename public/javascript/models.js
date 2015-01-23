/**
 * Created by Wenyuan on 2015/1/12.
 */
"use strict";
var models = angular.module('app-models', []);

models.factory('DataTypeList', [function(){
	var DataTypeList = {
		data: ['String', 'Integer', 'Float', 'Decimal', 'Date', 'Boolean'],

		getData: function(){
			return this.data;
		}
	};

	return DataTypeList;
}]);

models.factory('DataSource', [function(){
	var DataSource = {
		data: {
			sourceName: '',
			sourceType: 'MySQL',
			sourceURL: '127.0.0.1',
			sourcePort: 3306,
			loginUser: 'root',
			password: 'root',
			charset: 'UTF-8'
		},

		set: function(data){
			if(data === undefined || data === null){
				this.reset();
			}
			else{
				this.data = _.clone(data, true);
				if(this.data.$resolved !== undefined){
					delete this.data.$resolved;
				}
				if(this.data.$promise !== undefined){
					delete this.data.$promise;
				}
			}
		},

		get: function(paramName){
			return this.data[paramName];
		},

		reset: function(){
			this.data.sourceName = '';
			this.data.sourceType = 'MySQL';
			this.data.sourceURL = '127.0.0.1';
			this.data.sourcePort = 3306;
			this.data.loginUser = 'root';
			this.data.password = 'root';
			this.data.charset = 'UTF-8';
		},

		getData: function(){
			return this.data;
		}
	};

	return DataSource;
}]);

models.factory('TableDefinition', [function(){
	var TableDefinition = {
		data: {
			name: '',
			columns: []
		},
		
		getData: function(){
			return this.data;
		},

		set: function(data){
			this.data = _.cloneDeep(data);
		},

		get: function(param){
			return this.data[param];
		},

		reset: function(){
			this.data.name = '';
			this.data.columns = [];
		},

		addColumn: function(){},

		getDefaultColumn: function(){
			return {
				name: '',
				dataType: 'Integer',
				length: 4
			};
		},

		removeColumn: function(){}
	};

	return TableDefinition;
}]);

models.factory('InterfaceDefinition', [function(){
	var InterfaceDefinition = {
		data: {
			name: 'API1',
			url: '/api1',
			params: [{
				name: 'id'
			}, {
				name: 'value'
			}],
			logic: ''
		},

		getData: function(){
			return this.data;
		},

		addParam: function(){},

		removeParam: function(){}
	};

	return InterfaceDefinition;
}]);

models.factory('DBDefinition', [function(){
	var DBDefinition = {
		data: {
			def: {
				dbName: '',
				dataSourceName: ''
			},
			tables: [],
			interfaces: [],
			triggers: []
		},

		set: function(data){
			this.data = _.clone(data, true);
		},

		get: function(param){
			return this.data[param];
		},

		reset: function(){
			this.data = {
				def: {
					dbName: '',
					dataSourceName: ''
				},
				tables: [],
				interfaces: [],
				triggers: []
			};
		},

		getData: function(){
			return this.data;
		},

		getTableByName: function(tableName){

		},

		getInterfaceByName: function(interfaceName){

		},

		getTriggerByName: function(triggerName){

		},

		updateTable: function(oldTableName, tableData){
			var tables = this.get('tables');
			_.forEach(tables, function(table){
				if(table.name === oldTableName){
					table.name = tableData.name;
					table.columns = _.cloneDeep(tableData.columns);
					return false;
				}
			}, this);
		},

		addTable: function(tableData){
			var tables = this.get('tables');
			tables.push(tableData);
		},

		removeTableByIndex: function(tableIndex){
			var tables = this.get('tables');
			_.remove(tables, function(table, index){
				return index === tableIndex;
			});
		}
	};

	return DBDefinition;
}]);

models.factory('SelectedPath', [function(){
	var SelectedPath = {
		data: [{
			id: 'db1',
			name: 'Database 1'
		}, {
			id: 'table1',
			name: 'Table 1'
		}],

		getData: function(){
			return this.data;
		},

		reset: function(){
			this.data = [];
		},

		set: function(path){
			this.data = path;
		}
	};

	return SelectedPath;
}]);

models.factory('DataSourceList', ['$rootScope', function($rootScope){
	var DataSourceList = {
		data: [],

		getData: function(){
			return this.data;
		},

		set: function(list){
			this.data = [];
			_.forEach(list, function(item){
				this.data.push({
					label: item.label
				});
			}, this);
			$rootScope.$broadcast('datasourceListUpdated');
		}
	};

	return DataSourceList;
}]);

models.factory('DBList', [function(){
	var DBList = {
		data: [{
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
		}],

		getData: function(){
			return this.data;
		},

		set: function(list){
			this.data = list;
		}
	};

	return DBList;
}]);