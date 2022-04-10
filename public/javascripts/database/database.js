const mysql = require('mysql')
const config = require('../config/configdb')
const e = require("express");
const {log} = require("debug");
const fs = require("fs");
let request_sql = '';

const bdd = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
});
let connected = false

class Database {

    connexion() {
        if (!connected) {
            bdd.connect(error => {
                if (error) throw error;
                console.log("/////////////////////////////////\nconnecte a la bdd\n/////////////////////////////////")
                connected = true
            })
        }
    }

    deconnexion() {
        if (connected) {
            bdd.end(error => {
                if (error) throw error;
                console.log("deconnexion de la bdd")
                connected = false
            })
        }
    }

    set_password(res, username, newpassword) {
        if (connected) {
            request_sql = "UPDATE `user` SET `password`='" + newpassword + "' WHERE `username` = '" + username + "'"
            bdd.query(request_sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({error: "denied"}))
                }
                res.send(JSON.stringify({valide: true}))
            })
        } else {
            res.send(JSON.stringify({error: "denied"}))
        }
    }


    set_pseudo(res, username, newpseudo) {
        if (connected) {
            request_sql = "UPDATE `user` SET `pseudo`='" + newpseudo + "' WHERE `username` = '" + username + "'"
            bdd.query(request_sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({error: "denied"}))
                }
                res.send(JSON.stringify({valide: true}))
            })
        } else {
            res.send(JSON.stringify({error: "denied"}))
        }
    }


    get_list(res, username) {
        if (connected) {
            request_sql = "SELECT pseudo,image,status FROM `user` WHERE NOT `username` = '" + username + "'"
            bdd.query(request_sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({error: "denied"}))
                }
                if (result.length) {
                    res.send(JSON.stringify({valid: true, result: result}))
                } else {
                    res.send(JSON.stringify({error: "denied"}))
                }
            })


        } else {
            res.send(JSON.stringify({error: "denied"}))
        }
    }

    get_vehicles(res) {
        if (connected) {
            request_sql = "SELECT name,image,description FROM `vehicles`"
            bdd.query(request_sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({error: "denied"}))
                }
                if (result.length) {
                    res.send(JSON.stringify({valid: true, result: result}))
                } else {
                    res.send(JSON.stringify({error: "denied"}))
                }
            })


        } else {
            res.send(JSON.stringify({error: "denied"}))
        }
    }

    check_user(res, username, password) {
        if (connected) {
            request_sql = "SELECT pseudo FROM `user` WHERE `username` = '" + username + "' AND `password` = '" + password + "'"
            bdd.query(request_sql, (err, result) => {
                if (err) {
                    console.log(err)
                    res.send(JSON.stringify({error: "denied"}))
                }
                if (result.length) {
                    console.log("connection reussi")
                    res.send(JSON.stringify({valid: true, pseudo: result[0].pseudo}))
                } else {
                    console.log("connection refuser")
                    res.send(JSON.stringify({error: "denied"}))
                }
            })
        } else {
            res.send(JSON.stringify({error: "denied"}))
        }
    }
}

module.exports = Database

