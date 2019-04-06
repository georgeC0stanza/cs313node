// Controllers.js
const model = require("../models/cardModel.js");

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
    const book = request.body.book;
    const chapter = request.body.chapter;
    const verse = request.body.verse;

    model.createCard(book, chapter, verse, function(err, newCard) {
        if (err) {

        } else {
            response.json(newCard);

        }
    });
}

function login(request, response){
    const username = request.body.username;
    const password = request.body.password;
    console.log("here1");
     model.getPassword(username, password, function(err, databasePassword, userPassword) {
        if (err) {
            console.log("control fail");
            response.status(500).json({success: false});

        } 
        else if (userPassword == databasePassword) {
            const params = {
                success: true, sessionID: userid
            };
            console.log("control success");
            response.json(params);
        }
        else {
            response.json({success: false})
            console.log("control fail2");
        }
/*
        if (username == "admin" && userPassword == "password"){
            if (!req.session.user) {
                req.session.user = {
                    username: username
                };
            }
        }
        */
    });
}

function logout(request, response){
    const seesionID = request.body.sessionID;

}

module.exports = {
    getCards: getCards,
    searchCards: searchCards,
    login: login,
    logout: logout
}; 