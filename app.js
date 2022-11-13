
require("dotenv").config()
const express = require("express");
const app = express()
const User = require('./model/user')

app.get("/",(req, res) => {
    res.send("<h1> Hi Pandiri Pramod Reddy <h1>")  
})

app.post("/signup", async (req, res) => {
    // check for all mandatory fieldss
    const {firstname, lastname, email, password } = req.body
    if(!(email && password && firstname && lastname)){
        res.status(400).send("All the fields are required")
        
    }
    // checking mail is unique or not
    const extuser = await User.findOne(email)
    if(extuser){
        res.status(400).send("User already exists")
    }
    // password

})
module.exports = app;
