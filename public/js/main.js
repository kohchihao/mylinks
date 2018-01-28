var id_cookie = "";
var access_token_cookie = "";
var links = document.getElementById("links");

$(document).ready(function() { 
	var image_cookie = getCookie("profile_picture");
	var username_cookie = getCookie("username");
	access_token_cookie = getCookie("access_token")
	id_cookie = getCookie('id');

	var r = /\\u([\d\w]{4})/gi;
	image_cookie = image_cookie.replace(r, function (match, grp) {
	    return String.fromCharCode(parseInt(grp, 16)); } );
	image_cookie = unescape(image_cookie);

	var user_image = document.getElementById("user-image");
	var username = document.getElementById("username");


	user_image.src = image_cookie;
	username.innerHTML = username_cookie;

	$.ajax({
		type: 'POST',
		url: 'https://secretive-shoemaker.glitch.me/getlinks/' + id_cookie,
		data: {
			access_token : access_token_cookie
		},
		success: function(data){
			for (i=0; i<data.length; i++){
				var iDiv = document.createElement('div')
				var innerDiv = document.createElement('div');
				var actions = document.createElement('div');
				var title_p = document.createElement('p');
				var des_p = document.createElement('p');
				var edit_btn = document.createElement('button');
				var del_btn = document.createElement('button');
				var mv_btn = document.createElement('button');
				innerDiv.className = 'created_link';
				iDiv.className = 'link';
				title_p.className = 'title-p';
				des_p.className = 'des-p';
				edit_btn.className = 'edit-btn button';
				del_btn.className = 'del-btn button';
				mv_btn.className = 'mv-btn button';
				edit_btn.innerHTML = "<i class='fa fa-pencil' aria-hidden='true'></i>";
				mv_btn.innerHTML = "<i class='fa fa-arrows' aria-hidden='true'></i>"
				del_btn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>"
				title_p.innerHTML = data[i].url_title;
				des_p.innerHTML = data[i].url_link; 
				innerDiv.appendChild(title_p);
				innerDiv.appendChild(des_p); 
				actions.appendChild(mv_btn);
				actions.appendChild(edit_btn);
				actions.appendChild(del_btn);
				iDiv.appendChild(innerDiv);
				iDiv.appendChild(actions)
				links.appendChild(iDiv)
			}
		}
	});
});

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

var add_links = document.getElementById("add-links-btn");
add_links.addEventListener("click", function(){
	var link = document.getElementById("link");
	var link_des = document.getElementById('link_description');
	
	$.ajax({
		type: 'post',
		url: 'https://secretive-shoemaker.glitch.me/createlinks/' + id_cookie,
		data: {
			user_id: id_cookie,
			url_title: link_des.value,
			url_link: link.value,
			access_token: access_token_cookie
		},
		success: function(data){
			link.innerHTML = "";
			link_des.innerHTML = "";
			var iDiv = document.createElement('div')
			var innerDiv = document.createElement('div');
			var actions = document.createElement('div');
			var title_p = document.createElement('p');
			var des_p = document.createElement('p');
			var edit_btn = document.createElement('button');
			var del_btn = document.createElement('button');
			var mv_btn = document.createElement('button');
			innerDiv.className = 'created_link';
			iDiv.className = 'link';
			title_p.className = 'title-p';
			des_p.className = 'des-p';
			edit_btn.className = 'edit-btn button';
			del_btn.className = 'del-btn button';
			mv_btn.className = 'mv-btn button';
			edit_btn.innerHTML = "<i class='fa fa-pencil' aria-hidden='true'></i>";
			mv_btn.innerHTML = "<i class='fa fa-arrows' aria-hidden='true'></i>"
			del_btn.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>"
			title_p.innerHTML = link_des.value;
			des_p.innerHTML = link.value; 
			innerDiv.appendChild(title_p);
			innerDiv.appendChild(des_p); 
			actions.appendChild(mv_btn);
			actions.appendChild(edit_btn);
			actions.appendChild(del_btn);
			iDiv.appendChild(innerDiv);
			iDiv.appendChild(actions)
			links.appendChild(iDiv)
		}
	})
});