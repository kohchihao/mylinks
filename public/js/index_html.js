

var login_btn = document.getElementById("login-btn");

login_btn.addEventListener("click",function(){
	const url_string = "http://localhost:5000/login";
	window.location.replace(url_string);
})