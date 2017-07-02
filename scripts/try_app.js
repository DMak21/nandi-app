// GET DATA

// const get_data = require('./get_data');

// const user = 'T0058';
// const pass = 'T0058';

// const from_date = '01/03/2015';
// const to_date = '02/03/2015';

// get_data(from_date, to_date, user, pass, function(res) {
// 	console.log(JSON.stringify(res, null, 2));
// })


// MANIPULATE DATA

// var Datastore = require('nedb')
// var db = new Datastore({filename: '../database/coordinates.db', autoload: true});

var manipulate_data = require("./manipulated_data");

var user = "T0058";
var pass = "T0058";

var from_date = "01/03/2015";
var to_date = "02/03/2015";

var dis_pen = "3";
var cem_type = "15";

manipulate_data(from_date, to_date, user, pass, dis_pen, cem_type, function(res) {
	console.log(JSON.stringify(res, null, 2));
// 	var final = res.map(function(json_obj){

// 		if (true) {}

// 		db.insert({address: json_obj.address, coordinates: json_obj.coordinates}, function (err) {
// 			console.log(err)
// 			db.find({}, function (err, doc) {
// 				console.log(doc)
// 			})
// 		});
		
// 	})

// 	db.insert(final, function (err) {
// 		console.log(err)
// 		db.find({}, function (err, doc) {
// 			console.log(doc)
// 		})
// 	});
});



// MODIFY ADDRESS

// var modify_address = require('./modify_address');

// var user = 'T0058';
// var pass = 'T0058';

// var from_date = '01/03/2015';
// var to_date = '02/03/2015';

// modify_address(from_date, to_date, user, pass, function(res) {
// 	console.log(res);
// })
