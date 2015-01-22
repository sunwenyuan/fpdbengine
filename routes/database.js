"use strict";

var express = require('express');
var fs = require('fs');
var _ = require('lodash');
var router = express.Router();
var outputFolderPath = __dirname+'/../output/databases/';
var dbFileExt = 'db';

router.post('/', function(req, res) {
	var db = req.body;
	var filePath = outputFolderPath+db.def.dbName+'.'+dbFileExt;
	fs.writeFile(filePath, JSON.stringify(db, null, 4), {encoding: 'utf8'}, function(err){
		if(err){
			res.statusCode = 400;
		}
		res.statusCode = 200;
		res.end();
	});
});

router.put('/', function(req, res){
	var oldDbName = req.body.oldDbName;
	var data = req.body.data;
	var oldDbFilePath = outputFolderPath+oldDbName+'.'+dbFileExt;

	fs.unlink(oldDbFilePath, function(err){
		if(err){
			res.statusCode = 400;
			res.end();
		}
		else{
			var filePath = outputFolderPath+data.def.dbName+'.'+dbFileExt;
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

router.get('/:dbName', function(req, res){
	var filePath = outputFolderPath+req.params.dbName+'.'+dbFileExt;
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

router.delete('/:dbName', function(req, res){
	var filePath = outputFolderPath+req.params.dbName+'.'+dbFileExt;
	fs.unlink(filePath, function(err){
		if(err){
			res.statusCode = 400;
		}
		res.statusCode = 200;
		res.end();
	});
});