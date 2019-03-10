
var express = require("express");
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();
app.use(express.static("public"));

app.set("views", "views");
app.set("view engine", "ejs");

app.listen(PORT, function() {
	console.log("The server is up and listening on port 5000");
});

app.get("/", handleRoot);
app.get("/home", handleHome);
app.get("/mail_price", handleMail);

function handleRoot(request, response) {
    console.log("Receive a request for the root...");
    response.write("This is the root");
    response.send();
}

function handleHome(request, response) {
    var name = getCurrentLoggedInUserAccount();
    console.log("Received a request for home");
    // find the username
    const username = "sburton";
    const email = "burtons@byui.edu";
    const params = {user: username, email: email};
    response.render("homepage", params);
}

function handleMail(request, response) {
    console.log("Received a request for mail");


    var type = request.query.mail_type;
    var weight = request.query.mail_weight;
    var rate = calculateRate(type, weight);

    response.render("mail", rate);
}

function calculateRate(type, weight){
    console.log("calculating mail rate");
    console.log(type);
    console.log(weight);

    // calculate price
    var price = 0;

    // package
    if (type == "package"){
        if (weight >= 13){
            price = "weight is too much.";
        } else if (weight >= 12){
            price = 5.71;
        } else if (weight >= 9){
            price = 5.19;
        } else if (weight >= 5){
            price = 4.39;
        } else if (weight >= 0){
            price = 3.66;
        } else {
            price = "weight cannot be negative.";
        }
    }

    // large
    else if( type == "large" || weight > 3.5){
        price = 1 + (weight * 0.15);
    }

    // metered and stamped
    else {
        price = 0.50 + (weight * 0.15);
        if (type == "stamped"){
            price += 0.05;
        }
    }
    
    return price;
}

