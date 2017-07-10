// manipulate_data :
// input - JS Object, Dispatched/Pending, Cement Type
// Codes - 
// opc_43 - 1, opc_53 - 2, ppc - 4, psc - 8, all - 15
// dis - 1, pen - 2, both - 3
// output - JS Object | Ex. {address_txt: 'NAGPUR', weight: 5}
function manipulate_data(res, cem_type, dis_pen) {
	if (res.constructor === Array) {
		let final =  res.map(function(json_obj){
			let total = 0;
			if (dis_pen === 1 || dis_pen === 3) {
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
			else if (dis_pen === 2 || dis_pen === 3){
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
			return({address_txt: json_obj.address_txt, weight: total});
		});
		return final;
	}

}

module.exports = manipulate_data;