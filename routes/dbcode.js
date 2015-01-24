"use strict";

var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var router = express.Router();
var modelGenerator = require('../lib/model-generator');

var dbDefinitionFolderPath = __dirname+'/../output/databases/';
var dbFileExt = 'db';
var outputFolderPath = __dirname+'/../output/code/';


router.get('/:dbName', function(req, res){
	var dbName = req.params.dbName;
	var codeFolder = outputFolderPath+req.params.dbName;
	fs.exists(codeFolder, function(exists){
		if(exists){
			var files = fs.readdirSync(codeFolder);
			_.forEach(files, function(file){
				var filePath = codeFolder+'/'+file;
				fs.unlinkSync(filePath);
			});
			fs.rmdirSync(codeFolder);
		}
		fs.mkdir(codeFolder, function(err){
			if(err){
				res.statusCode = 400;
				res.end();
			}
			else{
				var dbDefFilePath = dbDefinitionFolderPath+dbName+'.'+dbFileExt;
				fs.readFile(dbDefFilePath, {encoding: 'utf8'}, function(err, data){
					if(err){
						res.statusCode = 400;
						res.end();
					}
					else{
						var result = modelGenerator(JSON.parse(data));
						res.statusCode = 200;
						res.end();
					}
				});
			}
		});
	});
});

module.exports = router;