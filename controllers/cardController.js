// Controllers.js
const model = require("../models/cardModel.js");

function getCards(request, response) {

    model.getAllCards(function(err, cards) {
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

module.exports = {
    getCards: getCards,
    searchCards: searchCards
};