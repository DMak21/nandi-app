const get_realization = require('./scripts/get_realization');

async function show_realization() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd = '0'+dd;
	} 

	if(mm<10) {
		mm = '0'+mm;
	} 

	today = dd + '/' + mm + '/' + yyyy;
	// console.log(today);

	res = await get_realization('T0058', 'T0058', today, today);
	// console.log(res);

	var sum = 0;
	for (var i = res.length - 1; i >= 0; i--) {
		sum += parseInt(res[i].realization);
	}

	var avg = sum/res.length;

	document.getElementById('today').innerText = 'TODAY - ' + avg.toFixed(2);
	
	for(var a=1; a<7; a++){
		var day = new Date();
		day.setDate(day.getDate() - a);
		dd = day.getDate();
		mm = day.getMonth()+1;
		yyyy = day.getFullYear();
		day = dd + '/' + mm + '/' + yyyy;
		var res_week = await get_realization('T0058', 'T0058', day, day);
		sum = 0;
		for (var b = res_week.length - 1; b >= 0; b--) {
			sum += parseInt(res_week[b].realization);
		}
		avg = sum/res_week.length;
		var dayId = 'd_'+ a;
		document.getElementById(dayId).innerText = dd + '/' + mm + ' - ' + avg.toFixed(2);
	}
}