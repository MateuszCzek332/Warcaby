var express = require("express")
var app = express()
const PORT = 3000;
var path = require("path")
var fs = require("fs")

let users = []

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

app.use(express.static('static'))

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})