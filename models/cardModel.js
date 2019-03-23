// const{Pool} = require("pg");
// const conn = "something";
// pool = Pool({connectionString: conn});

function getAllCards(callback) {
    // const badThings = false; // just pretending...
    // if (badThings == true) {
    //     err = "Error in getting the scriptures"
    //     callback(err, null);
    // }

    // pool.query("SELECT id, book, chapter, verse FROM scripture", function(err, result) {
    //     if (err) {
    //         callback(err, null);
    //     } else {
    //         callback(null, result.rows);
    //     }
    // });

    const scriptures = [
        {id: 1, book: "Helaman", chapter: 5, verse: 12},
        {id: 2, book: "John", chapter: 13, verse: 14},
        {id: 3, book: "Ether", chapter: 12, verse: 27}
    ]

    callback(null, scriptures);


}

function getCardsForBook(book, callback) {
    const scriptures = [
        {id: 1, book: book, chapter: 5, verse: 12},
        {id: 2, book: book, chapter: 13, verse: 14},
        {id: 3, book: book, chapter: 12, verse: 27}
    ]

    callback(null, scriptures);
}

function createCard(book, chapter, verse, callback) {
    const theNewCardFromTheDb = "";
    callback(err, theNewCardFromTheDb);
}

module.exports = {
    getAllCards: getAllCards,
    getCardsForBook: getCardsForBook,
    createCard: createCard
};