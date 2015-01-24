"use strict";

var fs = require('fs');
var _ = require('lodash');
var templateFolder = __dirname+'/template/';
var templateFileName = 'model';
var templateFileExt = 'tpl';
var beautify = require('js-beautify').js_beautify;

var outputRootFolder = __dirname+'/../../output/code';

module.exports = function(dbDef){
	var dbName = dbDef.def.dbName;
	var templateFilePath = templateFolder+templateFileName+'.'+templateFileExt;
	fs.readFile(templateFilePath, {encoding: 'utf8'}, function(err, data){
		if(err){
			return;
		}
		else{
			var outputFolder = outputRootFolder+'/'+dbName+'/';
			var tables = dbDef.tables;
			_.forEach(tables, function(tableDef){
				var template = data;
				var tableName = tableDef.name;
				var fileName = outputFolder+tableName+'.js';
				var columns = tableDef.columns;

				template = template.replace(/::name::/g, tableName);
				var columnsStrArray = [];
				_.forEach(columns, function(column){
					var str = column.name+': DataTypes.'+column.dataType.toUpperCase();
					columnsStrArray.push(str);
				});
				template = template.replace('::columns::', columnsStrArray.join(','));
				fs.writeFileSync(fileName, beautify(template, {indent_size: 4}), {encoding: 'utf8'});
			});
		}
	});
};