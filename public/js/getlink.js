$(document).ready(function() { 
	var username_cookie = getCookie("username");

	var complied_link = document.getElementById("complied_link");

	complied_link.innerHTML = "http://mylinks/" + username_cookie;
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}