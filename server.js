
var express = require("express");

var app = express();

app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	console.log("Received a request for /");

	res.write("This is the root.");
	res.end();
});

app.get("/home", function(req, res) {
	// Controller
	console.log("Received a request for the home page");
	var name = getCurrentLoggedInUserAccount();
	var emailAddress = "john@email.com";

	var params = {username: name, email: emailAddress};

	res.render("home", params);
});

app.listen(process.env.PORT, function() {
	console.log("The server is up and listening on port 5000");
});

// Model

function getCurrentLoggedInUserAccount() {
	// access the database
	// make sure they have permission to be on the site

	return "John";
}



app.use(express.static("public"));

app.get("/", handleRoot);
app.get("/home", handleHome);

app.get("/home-service", function(request, response) {
    const username = "sburton";
    const email = "burtons@byui.edu";
    const params = {user: username, email: email};
    response.json(params);
});



function handleRoot(request, response) {
    console.log("Receive a request for the root...");
    response.write("This is the root");
    response.send();
}

function handleHome(request, response) {
    console.log("Received a request for home");
    // find the username
    const username = "sburton";
    const email = "burtons@byui.edu";
    const params = {user: username, email: email};
    response.render("homepage", params);
}