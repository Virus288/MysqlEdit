// External modules
require('dotenv').config();
const express = require('express')

// Internal modules
const {getData} = require("./Database/GetData");
const {updateData} = require("./Database/UpdateData");
const {addData} = require("./Database/AddData");

const app = express();
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'));
app.use(express.json());

app.listen(3500, console.log("App is listening on port 3500"))

app.get('/', function(req, res){
    if(req.query.id){
        getData(req.query.id).then(data => res.render('home', {data: data}));
    } else {
        getData().then(data => res.render('home', {data: data}));
    }
});

app.get("/addData", function(req, res){
    if(req.query.name && req.query.code){
        addData({name: req.query.name, code: req.query.code})
            .then(data => res.redirect('/'))
            .catch((err) => res.send({message: err, type: "error"}));
    } else {
        getData().then(data => res.render('home', {data: data}));
    }
});

app.get("/updateData", function(req, res){
    if(req.query.id && req.query.code && req.query.name){
        updateData({id: req.query.id, name: req.query.name, code: req.query.code})
            .then(data => res.redirect('/'))
            .catch((err) => res.send({message: err, type: "error"}));
    } else {
        getData().then(data => res.render('home', {data: data}));
    }
});

app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error with your data. Make sure that you are sending right type of data, <a href="/">Go back home</a>');
});
