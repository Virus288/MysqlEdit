// External modules
require('dotenv').config();
const express = require('express')

// Internal modules
const {getData} = require("./Database/GetData");
const {updateData} = require("./Database/UpdateData");
const {addData} = require("./Database/AddData");
const {removeData} = require("./Database/RemoveData");

const app = express();
app.set('view engine', 'ejs');
app.set('views');

// middleware
app.use("/public", express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

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

app.post("/removeData", function(req, res){
    if(req.body.id){
        removeData(req.body.id)
            .then(data => res.send({message: data, type: "success"}))
            .catch(err => res.send({message: err, type: "error"}));
    } else {
        getData().then(data => res.render('home', {data: data}));
    }
});

app.get('*', function(req, res){
    res.status(404).send('Seems like there was an error with your data. Make sure that you are sending right type of data, <a href="/">Go back home</a>');
});
