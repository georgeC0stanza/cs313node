 const{Pool} = require('pg');
// const conn = "something";
const connectionString = process.env.DATABASE_URL || "postgres://dtkohxpfxoreeh:f3ab65d5f6057d7265c8017d71161b048403502ab8b2b8f0c96d1aecd9ba95b9@ec2-23-23-241-119.compute-1.amazonaws.com:5432/dfk26h47jatf77?ssl=true";
const pool = new Pool({connectionString: connectionString});


/******************************************************
 * returns a password for a selected user to the controller
 */
function getPassword(username, callback){
    console.log("username", username);
    var sql = `SELECT passwrd FROM person WHERE username = '${username}'`;

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            callback(err, null);
            console.log("Error in query: ")
            console.log(err);
        }
        password = result.rows;
        callback(null, password[0].passwrd);

    });      
}

/******************************************************
 * adds a card for a selected user to the database
 */
function createCard(username, cardtext_front, cardtext_back, callback) {
    console.log('username: ', username, ' - ', cardtext_front, ', ', cardtext_back);
    var sql = `SELECT id FROM person WHERE username = '${username}'`;

    pool.query(sql, function(err, result) {
        // If an error occurred...
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            callback(null);
        }
        // Log this to the console for debugging purposes.
        //password = result.rows;
        console.log(result.rows);
        const user_id = result.rows[0].id;
        console.log(user_id);
        (() => {
            console.log('user: ', result, ' - ', cardtext_front, ', ', cardtext_back);
            var inner_sql = `insert into cardset (user_id, cardtext_front, cardtext_back)
            values ( ${user_id} , '${cardtext_front}', '${cardtext_back}' ); = '${username}'`;
        
            pool.query(inner_sql, function(error, result) {
                // If an error occurred...
                if (err) {
                    callback(error, null);
                    console.log("Error in query: ")
                    console.log(error);
                }
                // Log this to the console for debugging purposes.
                //password = result.rows;
                console.log("this should have inserted: ", inner_sql);
                callback(null);
        
            }); 
        })();

    });      


}


/******************************************************
 * returns all cards for a selected user to the controller
 */
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


/******************************************************
 * returns a requested cardback to the controller
 */
function getCardBack(userid, cardid, callback) {
    var sql = `SELECT cardtext_back FROM cardset WHERE user_id = ${userid} AND id = ${cardid}`;

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

module.exports = {
    getPassword: getPassword,
    getCardBack: getCardBack,
    getAllCards: getAllCards,
    createCard: createCard
};