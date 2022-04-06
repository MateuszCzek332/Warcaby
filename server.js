var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
var fs = require("fs")

let users = []
let currTab = [

    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],

];

app.use(express.text())
app.post("/ADD_USER", function (req, res) {

    if (users.length < 2 && req.body != users) {
        users.push(req.body)
        console.log(users)
        res.send({ id: users.length, loged: true })
        return;
    }
    console.log(users)
    res.send({ id: users.length, loged: false }) 
 
})

app.post("/CHECK_STATUS", function (req, res) {
    res.send({users: users.length})  
})

app.post("/CHECK_TAB", function (req, res) {
    let mess
    if(req.body != currTab){
        mess = {
            val: true,
            newTab: currTab
        }
    }
    else
        mess = {
            val:false
        } 
    res.send(mess)
    
})

app.post("/UPDATE_TAB", function (req, res) {
    currTab = JSON.parse(req.body)
    res.send(true)
})

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})