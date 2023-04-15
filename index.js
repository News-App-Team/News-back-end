'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const {Client} = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
const PORT = process.env.PORT;
const apiKey = process.env.API_KEY;
// const client = new Client(url);
app.get('/getNews', getNewsHandler);
app.get('*', notFoundErrorHandler);
app.use(errorHandler); 

async function getNewsHandler(req, res){

    let url = `https://newsapi.org/v2/top-headlines?sources=the-washington-post&apiKey=${apiKey}`;
    try {
        let result = await axios.get(url);
        let news = result.data.articles.map((obj) => {
            return new Event(obj);
        })
        res.json(news);
    } catch {(error) => {
        errorHandler(error, req, res);
    }}
}

function notFoundErrorHandler(req, res){
    res.status(404).send("Not Found");
}

function errorHandler(error, req, res){
    res.status(500).send(error);
}

function Event(newsObj){
    
    this.source = newsObj.source.name;
    this.author = newsObj.author;
    this.title = newsObj.title; 
    this.description = newsObj.description;
    this.url = newsObj.url;
    this.image = newsObj.urlToImage;
    this.publishedAt = newsObj.publishedAt;
}

app.listen(PORT, () => {
    console.log("Welcome to my server");
}) 