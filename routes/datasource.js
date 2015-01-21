"use strict";

var express = require('express');
var fs = require('fs');
var router = express.Router();
var outputFolderPath = __dirname+'/../output/datasources/';
var dataSourceFileExt = 'ds';

/* GET users listing. */
router.post('/', function(req, res) {
	var dataSource = req.body;
	var filePath = outputFolderPath+dataSource.sourceName+'.'+dataSourceFileExt;
	fs.writeFile(filePath, JSON.stringify(dataSource, null, 4), {encoding: 'utf8'}, function(err){
		if(err){
			res.statusCode = 400;
		}
		res.statusCode = 200;
		res.end();
	});
});

router.put('/', function(req, res){
	var oldSourceName = req.body.oldSourceName;
	var data = req.body.data;
	var oldSourceFilePath = outputFolderPath+oldSourceName+'.'+dataSourceFileExt;

	fs.unlink(oldSourceFilePath, function(err){
		if(err){
			res.statusCode = 400;
			res.end();
		}
		else{
			var filePath = outputFolderPath+data.sourceName+'.'+dataSourceFileExt;
			fs.writeFile(filePath, JSON.stringify(data, null, 4), {encoding: 'utf8'}, function(err){
				if(err){
					res.statusCode = 400;
					res.end();
				}
				else{
					res.statusCode = 200;
					res.end();
				}
			});
		}
	});
});

router.get('/:sourceName', function(req, res){
	var filePath = outputFolderPath+req.params.sourceName+'.'+dataSourceFileExt;
	fs.readFile(filePath, {encoding: 'utf8'}, function(err, data){
		if(err){
			res.statusCode = 404;
			res.end();
		}
		else{
			res.json(JSON.parse(data));
			res.end();
		}
	});
});

router.delete('/:sourceName', function(req, res){
	var filePath = outputFolderPath+req.params.sourceName+'.'+dataSourceFileExt;
	fs.unlink(filePath, function(err){
		if(err){
			res.statusCode = 400;
		}
		res.statusCode = 200;
		res.end();
	});
});

module.exports = router;