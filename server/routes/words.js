var express = require("express");
var router = express.Router();
const fs = require('fs');
const WORD_LIST_API = 'data/words.list.json';

router.get("/", function(req, res, next) {
    new Promise((resolve, reject) => {
        fs.readFile(WORD_LIST_API, 'utf8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        throw err;
    });
});

module.exports = router;