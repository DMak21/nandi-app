// var settings = require('electron-settings')
// var check_valid = require('./assets/scripts/check_valid')

document.getElementById("login_btn").addEventListener("click", login)

function login() {
	var username = document.getElementById('username').value()
	// settings.set('username', username)
	var password = document.getElementById('password').value()
	// settings.set('password', password)

	// check_valid(username, password, function (res) {
	// 	if (res){
	// 		settings.set('username', document.getElementById('username').value())
	// 		settings.set('password', document.getElementById('password').value())

	// 		document.getElementById('login').classList.remove('is-shown');
	// 		document.getElementById('sign_out').classList.add('is-shown');

	// 		console.log(settings.get('username'))
	// 	}
	// })

	console.log(username)
}

