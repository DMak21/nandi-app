// const manipulated_data = require("./scripts/manipulated_data");

function create_heatmap() {
	// Check if logged in
	if (document.getElementById("logout").style.display == "none") {
		
		// hideAllSectionsAndDeselectButtons()
	
		document.getElementById("button-login").classList.add("is-selected");
		document.getElementById("button-heatmap_input").classList.remove("is-selected");
		
		document.getElementById("heatmap_input").classList.remove("is-shown");
		document.getElementById("login").classList.add("is-shown");
		return;
	}



	// Get username and password
	// const username = document.getElementById('username');
	// const password = document.getElementById('password');

	// // Get from_date and to_date
	// const from = document.getElementById('from').value.split('-');
	// const to = document.getElementById('to').value.split('-');

	// const from_date = from[2] + '/' + from[1] + '/' + from[0];
	// const to_date = to[2] + '/' + to[1] + '/' + to[0];

	document.getElementById("button-heatmap_input").classList.remove("is-selected");
	document.getElementById("heatmap_input").classList.remove("is-shown");
	document.getElementById("button-heatmap").classList.add("is-selected");
	document.getElementById("heatmap").classList.add("is-shown");



	console.log("A");

	// Call function

}