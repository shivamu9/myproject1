const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config({path:'D:\backend\.env'});

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());


const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// template engine
app.set('views',path.join(__dirname,'/views'));
app.set('view engine', 'ejs');

//routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT,()=>{
    console.log('Listening on port ${PORT}');
})