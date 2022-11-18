
require("dotenv").config()
require('./config/database').connect()
const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json()) // kind of middleware
app.use(cookieParser()) // kind of middleware
app.use(express.urlencoded({ extended: true}))
// import model - user
const User = require('./model/user');

const { json } = require("express");
const auth = require("./middleware/auth");
const SECRET = process.env.SECRET

app.get("/",(req, res) => {
    res.send("<h1> Hi Pandiri Pramod Reddy <h1>")  
})

app.post("/signup", async (req, res) => {
    try{
    // collect info    
    const {firstname, lastname, email, password } = req.body
    // check for all mandatory fieldss
    if(!(email && password && firstname && lastname)){
        res.status(400).send("All the fields are required")
        
    }
    // check user exits
    // checking mail is unique or not
    const extuser = await User.findOne({email})
    if(extuser){
        res.status(400).send("User already exists")
    }
    // encrypt password
    myEncryptedPassword = await bcrypt.hash(password, 10)
    
    // create a new entry to database
    const user = await User.create({
        firstname,
        lastname,
        email,
        password: myEncryptedPassword
    })
    // create a token and send to user
    const token = jwt.sign({
        id: user._id, email
    }, SECRET, {expiresIn: '2h'} )
    user.token = token
    // dont want to send password
    user.password = undefined
    
    //send to frot-end
    res.status(200).json(user)


} catch (error) {
        console.log(error);
        console.log("route problem");

    }
    


})
app.post('/login', async (req, res) => {
    try{
        // collect info
        const {email , password } = req.body

        //validate info
        if(!(email && password)){
            res.status(400).send("All fields are required")

        }
        //check user in database
        const extuser = await User.findOne({email})
        //match the password
        if(extuser && (await bcrypt.compare(password, extuser.password))){
            //create a token
            const token = jwt.sign({id: extuser._id, email}, SECRET, {expiresIn: '2h'})
            //do not send password to front-end
            extuser.password = undefined
            extuser.token = token
            // create options for cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,


            }
            // send res with cookie
            res.status(200).cookie('token', token, options).json({
                success: true,
                token,
                extuser
            })

        }
        else{
            res.status(400).send("Please register before logging in ")
        }

    } catch (error) {
        console.log(error);
    }
})

app.get("/dashboard", auth, (req, res) => {
    res.send("<h1>Welcome to dashboard</h1>")
})
app.get('/profile',auth, (req, res) => {
    res.send("<h1>This is yur profile</h1>")
    //we already hav access to req.user = id, email
    
    
    
    // based on id , query to DB and get all information
    // of the user - findOne({id})

    // send a json reponse with all data

})
module.exports = app
