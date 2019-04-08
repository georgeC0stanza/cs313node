// Controllers.js
const model = require("../models/cardModel.js");

var session = require('express-session');

function getCards(request, response) {

    const userid = request.body.id;
    console.log("userid= ", userid);
    model.getAllCards(userid, function(err, cards) {
        if (err) {
            const data = {
                success: false,
                message: err
            };

            response.status(500).json(data);
        } else {
            const data = {
                success: true,
                cards: cards
            };
    
            response.json(data);    
        }
    });
}

function searchCards(request, response) {

    const book = request.query.book;
    model.getCardsForBook(book, function(err, cards) {
        if (err) {
            response.status(500).json({success: false});
        } else {
            response.json({
                success:true,
                cards: cards
            });
        }
    });
}

function createCard(request, response) {
    console.log(request.body);
    const cardtext_front = request.body.cardtext_front;
    const cardtext_back = request.body.cardtext_back;
    //const user = request.session.user; // doesn't work
    const user = "dako";
    console.log(user, "is our user", cardtext_back, cardtext_front);
    model.createCard(user, cardtext_front, cardtext_back, function(err, newCard) {
        if (err) {

        } else {
            response.json(newCard);

        }
    });
}

function login(request, response){
    const username = request.body.username;
    const userPassword = request.body.password;
    model.getPassword(username, function(err, databasePassword) {
        if (err) {
            console.log("control fail");
            response.status(500).json({success: false});
        } 
        else if (userPassword == databasePassword) {
            request.session.user = username;
            const params = {
                success: true
            };
            console.log("control success");
            response.json(params);
        }
        else {
            response.json({success: false})
            console.log("control fail2");
        }
    });
}

function logout(request, response){
    const seesionID = request.body.sessionID;

}

module.exports = {
    getCards: getCards,
    searchCards: searchCards,
    login: login,
    logout: logout,
    createCard: createCard
}; 