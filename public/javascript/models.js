/**
 * Created by Wenyuan on 2015/1/12.
 */
"use strict";
var models = angular.module('app-models', []);

models.factory('DataSource', [function(){
	var DataSource = {
		data: {
			sourceName: '',
			sourceType: 'MySQL',
			sourceURL: '127.0.0.1',
			sourcePort: 3306,
			loginUser: 'root',
			password: 'root',
			charset: 'UTF-8',
		},

		set: function(data){
			this.data = _.clone(data, true);
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

models.factory('DBDefinition', [function(){
	var DBDefinition = {
		data: {
			def: {
				dbName: 'DB1',
				dataSourceName: 'Data Source 1'
			},
			tables: [{
				name: 'Table 1'
			}, {
				name: 'Table 2'
			}, {
				name: 'Table 3'
			}],
			interfaces: [{
				name: 'API1'
			}, {
				name: 'API2'
			}, {
				name: 'API3'
			}],
			triggers: [{
				name: 'Trigger1'
			}, {
				name: 'Trigger2'
			}, {
				name: 'Trigger3'
			}]
		},

		set: function(data){
			this.data = _.clone(data, true);
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

models.factory('DataSourceList', [function(){
	var DataSourceList = {
		data: [{
			label: 'Data Source 1'
		}, {
			label: 'Data Source 2'
		}],

		getData: function(){
			return this.data;
		},

		set: function(list){
			this.data = list;
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