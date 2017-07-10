// reduce_array : Combines different objects with same address_txt and adds their weight
// input - JS Array | Ex. [{address_txt: 'NAGPUR', weight: 7}, {address_txt: 'PUNE', weight: 3}, {address_txt: 'NAGPUR', weight: 5}]
// output- JS Array | Ex. [{address_txt: 'NAGPUR', weight: 12}, {address_txt: 'PUNE', weight: 3}]
function reduce_array(js_array) {
	var result = [js_array[0]];
	for(let i=1; i<js_array.length; i++){
		var flag = 1;
		for(var j=0; j<result.length; j++){
			if(js_array[i].address_txt === result[j].address_txt){
				result[j].weight = result[j].weight + js_array[i].weight;
				flag = 0;
			}
		}
		if(flag === 1){
			result.push(js_array[i]);
		}
	}
	return result;
}
	
module.exports = reduce_array;