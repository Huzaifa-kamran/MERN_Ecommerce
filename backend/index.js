const express = require('express');
const app = express();

const dotenv = require("dotenv").config();
const {connectionDB} = require('./Config/ConnectionDB');



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
    connectionDB();
})