 const{Pool} = require('pg');
// const conn = "something";
const connectionString = process.env.DATABASE_URL || "postgres://dtkohxpfxoreeh:f3ab65d5f6057d7265c8017d71161b048403502ab8b2b8f0c96d1aecd9ba95b9@ec2-23-23-241-119.compute-1.amazonaws.com:5432/dfk26h47jatf77?ssl=true";
const pool = new Pool({connectionString: connectionString});

function getPassword(username, userPassword, callback){
    console.log("modelhere1");
    var sql = `SELECT passwrd FROM person WHERE username = '${username}'`;

    pool.query(sql, function(err, userPassword, result) {
        // If an error occurred...
        if (err) {
            callback(err, userPassword, null);
            console.log("Error in query: ")
            console.log(err);
        }
        console.log("modelhere2");
        // Log this to the console for debugging purposes.
        callback(null, userPassword, result.row);
        console.log("Back from DB with result:");
        console.log(result.row);
    });      
}


//todo
function getAllCards(userid, callback) {
    var sql = `SELECT * FROM cardset where user_id = ${userid} order by cardtext_front`;

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            callback(err, null);
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        callback(null, result.rows);
        console.log("Back from DB with result:");
        console.log(result.rows);
    });      
}


//todo
function getCardBack(id, callback) {
    var sql = `SELECT * FROM cardset where id = 1 order by cardtext_front`;

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            callback(err, null);
            console.log("Error in query: ")
            console.log(err);
        }

        // Log this to the console for debugging purposes.
        callback(null, result.rows);
        console.log("Back from DB with result:");
        console.log(result.rows);
    });      
}

//not mine
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
    getPassword: getPassword,
    getCardBack: getCardBack,
    getAllCards: getAllCards,
    getCardsForBook: getCardsForBook,
    createCard: createCard
};