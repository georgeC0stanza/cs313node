 const{Pool} = require("pg");
// const conn = "something";
const connectionString = process.env.DATABASE_URL || "postgres://dtkohxpfxoreeh:f3ab65d5f6057d7265c8017d71161b048403502ab8b2b8f0c96d1aecd9ba95b9@ec2-23-23-241-119.compute-1.amazonaws.com:5432/dfk26h47jatf77?ssl=true";
const pool = new Pool({connectionString: connectionString});

function getAllCards(callback) {

    var sql = "SELECT * FROM person";

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        console.log("Back from DB with result:");
        console.log(result.rows);


});     



    // const badThings = false; // just pretending...
    // if (badThings == true) {
    //     err = "Error in getting the cards"
    //     callback(err, null);
    // }

    // pool.query("SELECT id, book, chapter, verse FROM card", function(err, result) {
    //     if (err) {
    //         callback(err, null);
    //     } else {
    //         callback(null, result.rows);
    //     }
    // });

    const cards = [
        {id: 1, book: "Helaman", chapter: 5, verse: 12},
        {id: 2, book: "John", chapter: 13, verse: 14},
        {id: 3, book: "Ether", chapter: 12, verse: 27}
    ]

    callback(null, cards);


}

function getCardsForBook(book, callback) {
    const cards = [
        {id: 1, book: book, chapter: 5, verse: 12},
        {id: 2, book: book, chapter: 13, verse: 14},
        {id: 3, book: book, chapter: 12, verse: 27}
    ]

    callback(null, cards);
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