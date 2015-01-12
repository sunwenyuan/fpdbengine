/**
 * Created by Wenyuan on 2015/1/12.
 */
"use strict";
var models = angular.module('app-models', []);

models.factory('DataSource', [function(){
	var DataSource = {
		sourceName: '',
		sourceType: 'MySQL',
		sourceURL: '127.0.0.1',
		sourcePort: 3306,
		dbName: '',
		loginUser: 'root',
		password: 'root',
		charset: 'UTF-8',

		init: function(data){
			this.sourceName = data.sourceName;
			this.sourceType = data.sourceType;
			this.sourceURL = data.sourceURL;
			this.sourcePort = data.sourcePort;
			this.dbName = data.dbName;
			this.loginUser = data.loginUser;
			this.password = data.password;
			this.charset = data.charset;
		},

		reset: function(){
			this.sourceName = '';
			this.sourceType = 'MySQL';
			this.sourceURL = '127.0.0.1';
			this.sourcePort = 3306;
			this.dbName = '';
			this.loginUser = 'root';
			this.password = 'root';
			this.charset = 'UTF-8';
		}
	};

	return DataSource;
}]);