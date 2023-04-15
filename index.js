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
// const client = new Client(url);
app.get('/', test);

app.delete('/deleteNews/:id',deleteNewsHandler)
function test(req, res){
    res.send('Hello team');
}


function deleteNewsHandler(req,res)
{
    let {id}= req.params;
    let sql =`DELETE FROM News WHERE id =$1;`;
    let value =[id];
    client.query(sql,value) .then(result =>
        {res.status(204).send("successfully Deleted")})
         .catch();

}
app.listen(PORT, () => {
    console.log("Welcome to my server");
}) 