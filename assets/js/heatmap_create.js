// const manipulated_data = require("./scripts/manipulated_data");

function create_heatmap() {
	// Check if logged in
	if (document.getElementById('logout').style.display == 'none') {

		document.getElementById('button-login').classList.add('is-selected');
		document.getElementById('button-heatmap_input').classList.remove('is-selected');

		document.getElementById('heatmap_input').classList.remove('is-shown');
		document.getElementById('login').classList.add('is-shown');
		return;
	}
	else if(document.getElementById('from').value && document.getElementById('to').value) {

		document.getElementById('heatmap_input').classList.remove('is-shown');
		document.getElementById('heatmap').classList.add('is-shown');

		document.getElementById('button-heatmap').classList.add('is-selected');
		document.getElementById('button-heatmap_input').classList.remove('is-selected');

		var username = document.getElementById('username').value;
		var password = document.getElementById('password').value;

		var from = document.getElementById('from').value.split('-');
		var to = document.getElementById('to').value.split('-');
		var from_date = from[2] + '/' + from[1] + '/' + from[0];
		var to_date = to[2] + '/' + to[1] + '/' + to[0];
		
		var dis_pen = 0;
		var cem_type = 0;

		if(document.getElementById('c_1').checked){
			cem_type += 1;
		}
		if(document.getElementById('c_2').checked){
			cem_type += 2;
		}
		if(document.getElementById('c_4').checked){
			cem_type += 4;
		}
		if(document.getElementById('c_8').checked){
			cem_type += 8;
		}
		if(document.getElementById('dp_1').checked){
			dis_pen += 1;
		}
		if(document.getElementById('dp_2').checked){
			dis_pen += 2;
		}

		// console.log(username,password,from_date,to_date,cem_type,dis_pen);

		document.getElementById('heatmap_loader').style.display = 'block';
		document.getElementById('map').style.display = 'none';
		
		add_markers(username,password,from_date,to_date,cem_type,dis_pen);
	}
	else{
		// 
	}

}