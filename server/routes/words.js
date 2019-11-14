var express = require("express");
var router = express.Router();
const _ = require('underscore');
const fs = require('fs');
const WORD_LIST_API = 'data/words.list.json';

/**
 * get the word list
 * @returns {Promise.<*>}
 */
const getWordList = async () => {
    return await new Promise((resolve, reject) => {
        fs.readFile(WORD_LIST_API, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

// get word list
router.get("/", async function(req, res, next) {
    getWordList().then((response) => {
        res.send(response);
    });
});

// add new word on the list
router.post("/", async function(req, res, next) {
    // console.log("input:", req.body);

    getWordList().then((response) => {
        let words = JSON.parse(response); // {Array}
        let elWithMaxId = _.max(words['result_data'], function(word) {
            return word.id;
        });
        let inputId = !_.isEmpty(elWithMaxId) ? parseInt(elWithMaxId.id) + 1 : 0;
        let inputWord = req.body.word;

        words['result_data'].push({
            id: inputId,
            word: inputWord
        });
        // console.log(words);

        fs.writeFile(WORD_LIST_API, JSON.stringify(words), 'utf-8', function(err) {
            if (err) throw err;
            res.sendStatus(200);
         });
    });
});

// delete the word from the word list
router.delete("/:id", async function(req, res, next) {
    // console.log(req.params);

    getWordList().then((response) => {
        let words = JSON.parse(response); // {Array}
        let paramId = parseInt(req.params.id);
        let targetId = _.findIndex(words['result_data'], function(word) {
            return _.isEqual(word.id, paramId);
        });

        words['result_data'].splice(targetId, 1);
        // console.log(words);

        fs.writeFile(WORD_LIST_API, JSON.stringify(words), 'utf-8', function(err) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

module.exports = router;