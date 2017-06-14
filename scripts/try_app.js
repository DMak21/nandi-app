// GET DATA

// const get_data = require('./get_data');

// const user = 'T0058';
// const pass = 'T0058';

// const from_date = '01/03/2015';
// const to_date = '02/03/2015';

// get_data(from_date, to_date, user, pass, function(res) {
// 	console.log(res);
// })


// MANIPULATE DATA

var manipulate_data = require('./manipulate_data');

var user = 'T0058';
var pass = 'T0058';

var from_date = '01/03/2015';
var to_date = '02/03/2015';

var dis_pen = '3';
var cem_type = '15';

manipulate_data(from_date, to_date, user, pass, dis_pen, cem_type, function(res) {
	console.log(JSON.stringify(res, null, 2));
})

// MODIFY ADDRESS

// var modify_address = require('./modify_address');

// var user = 'T0058';
// var pass = 'T0058';

// var from_date = '01/03/2015';
// var to_date = '02/03/2015';

// modify_address(from_date, to_date, user, pass, function(res) {
// 	console.log(res);
// })
