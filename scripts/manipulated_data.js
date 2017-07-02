var get_data = require("./get_data");

function manipulated_data(from_date, to_date, user, pass, dis_pen, cem_type, callback) {

	get_data(from_date, to_date, user, pass, function(res) {
		if (res != null) {
			var final = res.map(function(json_obj){
				let total = 0;
				if (dis_pen == "1" || dis_pen == "3") {
					let a = cem_type;

					if (a > 7) {
						total += parseInt(json_obj.psc_d);
						a -= 8;
					}

					if (a > 3) {
						total += parseInt(json_obj.ppc_d);
						a -= 4;
					}

					if (a > 1) {
						total += parseInt(json_obj.opc53_d);
						a -= 2;
					}

					if (a > 0) {
						total += parseInt(json_obj.opc43_d);
					}
				}
				else if (dis_pen == "2" || dis_pen == "3"){
					let b = cem_type;

					if (b > 7) {
						total += parseInt(json_obj.psc_p);
						b -= 8;
					}

					if (b > 3) {
						total += parseInt(json_obj.ppc_p);
						b -= 4;
					}

					if (b > 1) {
						total += parseInt(json_obj.opc53_p);
						b -= 2;
					}

					if (b > 1) {
						total += parseInt(json_obj.opc43_p);
					}
				}

				return({address: json_obj.destination, coordinates: json_obj.address, weight: total});

			});

			if( typeof callback == "function" ){
				callback(final);
			}
		}
		
	});
	
}

module.exports = manipulated_data;