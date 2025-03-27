const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=> {
    console.log('Connected to the mongoDB successfully');
})
.catch(err => console.log("there is an error in conneting to the mongoDb: ", err));


module.exports = mongoose;