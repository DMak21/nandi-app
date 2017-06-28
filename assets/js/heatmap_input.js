function set_date() {
	const prd = document.getElementById("prd").value.split("_");
	const year = parseInt(document.getElementById("fin_yr").value);
	const from = parseInt(prd[0]);
	const to = parseInt(prd[1]);
	
	let from_date;
	if(from >= 4 && from <= 12){
		from_date = year + "-" + prd[0] + "-" + "01";
	}
	else {
		from_date = (year + 1).toString() + "-" + prd[0] + "-" + "01";
	}
	document.getElementById("from").value = from_date;
	
	let to_date;
	let last_day;
	if(to >= 4 && to <= 12){
		last_day = new Date(year, to, 0).getDate();
		to_date = year + "-" + prd[1] + "-" + last_day;
	}
	else {
		last_day = new Date((year + 1).toString(), to, 0).getDate();
		to_date = (year + 1).toString() + "-" + prd[1] + "-" + last_day;
	}
	document.getElementById("to").value = to_date;
}