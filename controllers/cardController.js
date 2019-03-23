// Controllers.js
const model = require("../models/scriptureModel.js");

function getScriptures(request, response) {

    model.getAllScriptures(function(err, scriptures) {
        if (err) {
            const data = {
                success: false,
                message: err
            };

            response.status(500).json(data);
        } else {
            const data = {
                success: true,
                scriptures: scriptures
            };
    
            response.json(data);    
        }
    });

}

function searchScriptures(request, response) {

    const book = request.query.book;
    model.getScripturesForBook(book, function(err, scriptures) {
        if (err) {
            response.status(500).json({success: false});
        } else {
            response.json({
                success:true,
                scriptures: scriptures
            });
        }
    });
}

function createScripture(request, response) {
    const book = request.body.book;
    const chapter = request.body.chapter;
    const verse = request.body.verse;

    model.createScripture(book, chapter, verse, function(err, newScripture) {
        if (err) {

        } else {
            response.json(newScripture);

        }
    });
}

module.exports = {
    getScriptures: getScriptures,
    searchScriptures: searchScriptures
};