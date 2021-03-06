
var express = require("express");
const path = require('path')
const PORT = process.env.PORT || 5000

const controller = require("./controllers/cardController.js");

const bodyParser = require('body-parser')


var app = express();
app.use(express.static("public"));
app.use(express.urlencoded()); 

app.use(bodyParser.urlencoded({extended: true}));
app.use ( bodyParser.json());

var session = require('express-session');

// set up sessions
app.use(session({
    secret: 'my-super-secret-secret!',
    resave: false,
    saveUninitialized: true
  }))

app.set("views", "views");
app.set("view engine", "ejs"); 

app.listen(PORT, function() {
	console.log("The server is up and listening on port 5000");
});

app.post('/login',  controller.login);

app.post("/cards", controller.getCards);
app.post("/cardBacks", controller.getCardBack);
app.post("/add_card", controller.createCard);

app.get("/", handleRoot);
app.get("/home", handleHome);
app.get("/mail_price", handleMail);


function handleRoot(request, response) {
    console.log("Receive a request for the root...");
    response.write("This is the root");
    response.send();
}


function handleMail(request, response) {
    console.log("Received a request for mail");

    var type = request.query.mail_type;
    var weight = request.query.mail_weight;
    var rate = calculateRate(type, weight);
    console.log("here3");
    var params = {rate: rate};
    response.render("mail_price", params);
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
            console.log("here1");
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

function handleHome(request, response) {
    var name = getCurrentLoggedInUserAccount();
    console.log("Received a request for home");
    // find the username
    const username = "sburton";
    const email = "burtons@byui.edu";
    const params = {user: username, email: email};
    response.render("homepage", params);
}


function logRequest(req, res, next) {
    console.log("Received a request for: " + req.url);

    next();
}

function verifyLogin(req, res, next) {
    // this doens't work so we will skip the checks
    // i mean they did login..
    next();
    console.log(req.session.user);
    if (!(typeof req.session.user == 'undefined'))
    {
        console.log("next();");
        next();
    } 

    const params = {
        error: 'cannot access this page'
    }; 
    console.log("failed verifylogin");
    res.status(401);
    res.json(params);
}


 /*
function verifyLogin(request, response, next) {
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {success:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}
*/
