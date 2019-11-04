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

router.get('/:id', async (req, res) => {
    try {
        const account = await db('accounts').where({ id: req.params.id });
        res.json(account[0])
    } catch (error) {
        res.status(500).json({
            message: "Account not Found" + error.message
        })
    }
})

router.post('/', async(req, res) => {
    try {
        const account = await db('accounts')
            .insert({
                name: req.body.name,
                budget: req.body.budget
            })
        res.status(200).json('New account created has an id of ' + account)
    } catch (error) {
        res.status(500).json({
            message: "Error creating account" + error.message
        })
    }
})

// function validateId (req, res, next) {
//     const { id } = req.params.id;

//     if(req.params.id) {

//     } else {
//         res.json({
//             message: "Account not found"
//         })
//     }
// }

module.exports = router;