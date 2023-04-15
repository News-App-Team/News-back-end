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
const apiKey = process.env.API_KEY;
// const client = new Client(url);
app.get('/getNews', getNewsHandler);
app.post('/addNews', addNewsHandler);

app.get('*', notFoundErrorHandler);
app.use(errorHandler);

async function getNewsHandler(req, res) {

    let url = `https://newsapi.org/v2/top-headlines?sources=the-washington-post&apiKey=${apiKey}`;
    try {
        let result = await axios.get(url);
        let news = result.data.articles.map((obj) => {
            return new Event(obj);
        })
        res.json(news);
        // res.json(result.data.articles);
    } catch {
        (error) => {
            errorHandler(error, req, res);
        }
    }
}
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

function errorHandler(error, req, res) {
    res.status(500).send(error);
}
function notFoundErrorHandler(req, res) {
    res.status(404).send("Not Found");
}
function Event(newsObj) {

    this.source = newsObj.source.name;
    this.author = newsObj.author;
    this.title = newsObj.title;
    this.description = newsObj.description;
    this.url = newsObj.url;
    this.image = newsObj.urlToImage;
    this.publishedAt = newsObj.publishedAt;
}


client.connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Welcome to my server ${PORT}`);
    })

})

