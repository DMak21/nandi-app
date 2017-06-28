var a = 0;

function secret() {
	a++;
	
	if (a == 5) {
		console.log(a)
		document.getElementById('secret_txt').classList.add('is-shown')
	}

	if (a == 6) {
		console.log(a)
		document.getElementById('secret_txt').classList.remove('is-shown')
	}

}