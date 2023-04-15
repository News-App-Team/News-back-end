'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL);
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT;

app.post('/addNews', addNewsHandler);

function addNewsHandler(req, res) {
    let { source, author, title, description, url, image, publishedat, comment } = req.body;
    let sql = `INSERT INTO news(source,author, title, description, url,image,publishedat,comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
    let values = [source, author, title, description, url, image, publishedat, comment];
    client.query(sql, values)
        .then((result) => {
            res.status(201).json(result.rows);

        })
        .catch(() => {

        });

}
client.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Welcome to my server ${PORT}`);
    })

})

