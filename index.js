'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { Client } = require('pg');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT;
let url = process.env.dburl;
const client = new Client(url);
app.get ('/getDbNews', getDbNewsHandler)





function getDbNewsHandler(req, res) {
    let sql = `SELECT * FROM news;`;
    client
        .query(sql)
        .then((result) => {
            res.json(result.rows);
            console.log(result.rows);
        })
        .catch(() => {
            res.status(500).send("Internal server error");
        });
}

client.connect()
.then(() => {
    app.listen(PORT, () => {
        console.log("Welcome to my server");
    })
})
