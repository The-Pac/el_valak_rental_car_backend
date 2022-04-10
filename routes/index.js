const express = require('express');
const router = express.Router();
const Database = require("../public/javascripts/database/database");
let database = new Database()


router.post('/check_user', function (req, res, next) {
    console.log("une connexion arrive\n-ip:" + req.ip + "\n")
    res.setHeader('Content-Type', 'application/json');
    //const newSecret = twofactor.generateSecret({ name: "Need for bite", account: req.body.username });
    database.check_user(res, req.body.username, req.body.password)
    res.status(200)
});

router.post('/set_password', function (req, res, next) {
    console.log("une connexion arrive\n-ip:" + req.ip + "\n")
    res.setHeader('Content-Type', 'application/json');
    database.set_password(res, req.body.username, req.body.newpassword)
    res.status(200)
});

router.post('/set_pseudo', function (req, res, next) {
    console.log("une connexion arrive\n-ip:" + req.ip + "\n")
    res.setHeader('Content-Type', 'application/json');
    database.set_pseudo(res, req.body.username, req.body.newpseudo)
    res.status(200)
});


router.get('/get_list', function (req, res, next) {
    console.log("une connexion arrive\n-ip:" + req.ip + "\n")
    res.setHeader('Content-Type', 'application/json');
    database.get_list(res, req.body.username)
    res.status(200)
});

router.get('/get_vehicles', function (req, res, next) {
    console.log("une connexion arrive\n-ip:" + req.ip + "\n")
    res.setHeader('Content-Type', 'application/json');
    console.log("suce")
    database.get_vehicles(res)
    res.status(200)
});

module.exports = router;
