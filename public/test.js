function login() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState>3 && xhttp.status==200) { 
            var data = JSON.parse(this.responseText);
            if (data.success = true){                
            alert("logged in!");
            }
        }
        else if (xhttp.status >= 500) { 
            alert("Sorry the provided credentials are incorrect.");
        }
        else if (xhttp.status >= 300) { 
            alert("error logging in!");
        }
    };
    xhttp.open("POST",  "/login", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send("username=" + username + "&password=" + password);
}
/*
function logout() {
	$.post("/logout", function(result) {
		if (result && result.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

function getServerTime() {
	$.get("/getServerTime", function(result) {
		if (result && result.success) {
			$("#status").text("Server time: " + result.time);
		} else {
			$("#status").text("Got a result back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	}).fail(function(result) {
		$("#status").text("Could not get server time.");
	});
}*/