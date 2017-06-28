const check_valid = require('./scripts/check_valid')

window.onload = function () {
	document.getElementById("password")
		.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode == 13) {
	        document.getElementById("login_btn").click();
	    }
	});

	document.getElementById("username")
		.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode == 13) {
	        document.getElementById("login_btn").click();
	    }
	});
}
	

function login() {
  var timeout = setTimeout(function() {
      showErr("Connection Timeout :(");
    }, 10000);
  showLoader();
  check_valid(document.getElementById("username").value, document.getElementById("password").value, function (res) {
    clearTimeout(timeout);
    if (res === true) {
      showLogout();
    }
    else if (res === false) {
      showErr("Incorrect username or password!")
    }
    else{
      showErr("Connection Error :(");
    }
  })
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("logout").style.display = "none";
  document.getElementById("err").style.display = "none";
  document.getElementById("form").style.display = "none";
}

function showLogin() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("logout").style.display = "none";
  document.getElementById("err").style.display = "none";
  document.getElementById("form").style.display = "block";
}

function showLogout() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("form").style.display = "none";
  document.getElementById("err").style.display = "none";
  document.getElementById("logout").style.display = "block";
}

function showErr(err_txt) {
  document.getElementById("err_txt").innerHTML = err_txt;
  document.getElementById("loader").style.display = "none";
  document.getElementById("form").style.display = "none";
  document.getElementById("logout").style.display = "none";
  document.getElementById("err").style.display = "block";
}
