const express = require('express');

const db = require('./data/dbConfig.js');

const AccountRouter = require('./data/seeds/accountRouter');

const server = express();

server.use(express.json());

server.use('/api/account', AccountRouter);

server.get('/', (req, res) => {
    res.send("Its working!")
})

module.exports = server;