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

router.post('/', async (req, res) => {
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

router.put('/:id', (req, res) => {
    db('accounts')
        .where({ id : req.params.id })
        .update({
            name: req.body.name,
            budget: req.body.budget
        })
        .then(account => {
            res.status(200).json(account + 'account got updated!')
        })
        .catch(error => {
            res.status(500).json({
                message: "Error updating account" + error.message
            })
        })
})

router.delete(':/id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(account => {
            res.status(200).json(account + 'account got deleted!')
        })
        .catch( error => {
            res.status(500).json({
                message: "Error deleting account" + error.message
            })
        })
})

module.exports = router;