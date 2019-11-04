const express = require('express');
const db = require('../data/dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
    db('accounts')
        .then(allAccounts => {
            res.status(200).json(allAccounts)
        })
        .catch(error => {
            res.status(404).json({
                message: "An error occured" + error.message
            })
        })
})

module.exports = router;