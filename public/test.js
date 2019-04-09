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
