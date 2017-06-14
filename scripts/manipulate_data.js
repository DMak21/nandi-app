var get_data = require('./get_data');
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyClI5qODtvyup5ZSjavBtgzNVxIvb7bHf4'
});

var user = 'T0058';
var pass = 'T0058';

var from_date = '01/03/2015';
var to_date = '02/03/2015';

function manipulate_data(from_date, to_date, user, pass, dis_pen, cem_type, callback) {

	get_data(from_date, to_date, user, pass, function(res) {
		res.map(function(json_obj){
			json_obj.total = 0;
			if (dis_pen == '1' || dis_pen == '3') {
				switch(cem_type) {
					case '1':
					json_obj.total += parseInt(json_obj.opc43_d)
					break;
					case '2':
					json_obj.total += parseInt(json_obj.opc53_d)
					break;
					case '3':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.opc53_d)
					break;
					case '4':
					json_obj.total += parseInt(json_obj.ppc_d)
					break;
					case '5':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.ppc_d)
					break;
					case '6':
					json_obj.total += parseInt(json_obj.opc53_d) + parseInt(json_obj.ppc_d)
					break;
					case '7':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.opc53_d) + parseInt(json_obj.ppc_d)
					break;
					case '8':
					json_obj.total += parseInt(json_obj.psc_d)
					break;
					case '9':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.psc_d)
					break;
					case '10':
					json_obj.total += parseInt(json_obj.opc53_d) + parseInt(json_obj.psc_d)
					break;
					case '11':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.opc53_d) + parseInt(json_obj.psc_d)
					break;
					case '12':
					json_obj.total += parseInt(json_obj.psc_d) + parseInt(json_obj.ppc_d)
					break;
					case '13':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.psc_d) + parseInt(json_obj.ppc_d)
					break;
					case '14':
					json_obj.total += parseInt(json_obj.opc53_d) + parseInt(json_obj.psc_d) + parseInt(json_obj.ppc_d)
					break;
					case '15':
					json_obj.total += parseInt(json_obj.opc43_d) + parseInt(json_obj.opc53_d) + parseInt(json_obj.psc_d) + parseInt(json_obj.ppc_d)
					break;
				}
			}
			else if (dis_pen == '2' || dis_pen == '3'){
				switch(cem_type) {
					case '1':
					json_obj.total += parseInt(json_obj.opc43_p)
					break;
					case '2':
					json_obj.total += parseInt(json_obj.opc53_p)
					break;
					case '3':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.opc53_p)
					break;
					case '4':
					json_obj.total += parseInt(json_obj.ppc_p)
					break;
					case '5':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.ppc_p)
					break;
					case '6':
					json_obj.total += parseInt(json_obj.opc53_p) + parseInt(json_obj.ppc_p)
					break;
					case '7':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.opc53_p) + parseInt(json_obj.ppc_p)
					break;
					case '8':
					json_obj.total += parseInt(json_obj.psc_p)
					break;
					case '9':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.psc_p)
					break;
					case '10':
					json_obj.total += parseInt(json_obj.opc53_p) + parseInt(json_obj.psc_p)
					break;
					case '11':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.opc53_p) + parseInt(json_obj.psc_p)
					break;
					case '12':
					json_obj.total += parseInt(json_obj.psc_p) + parseInt(json_obj.ppc_p)
					break;
					case '13':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.psc_p) + parseInt(json_obj.ppc_p)
					break;
					case '14':
					json_obj.total += parseInt(json_obj.opc53_p) + parseInt(json_obj.psc_p) + parseInt(json_obj.ppc_p)
					break;
					case '15':
					json_obj.total += parseInt(json_obj.opc43_p) + parseInt(json_obj.opc53_p) + parseInt(json_obj.psc_p) + parseInt(json_obj.ppc_p)
					break;
				}
			}

		})

		if( typeof callback == 'function' ){
	    	callback(res);
		}

	})
	
}

module.exports = manipulate_data;