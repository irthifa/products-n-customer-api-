var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8080
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.post("/api/customer/registration/", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const { name,
          address,
          email, 
          dateOfBirth, 
          gender, 
          age, 
          cardHolderName, 
          cardNumber, 
          expiryDate, 
          cvv, 
          timeStamp
        } = req.body;
        
        //validations
        const emailRegEx = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        const creditCardRegEx = /^\d{12}$/;
        
        if(emailRegEx.test(email)!=true){
            res.status(400).send("Invalid Email Address");
            return;
        }
        
        if(creditCardRegEx.test(cardNumber)!=true){
            res.status(400).send("Invalid Credit Card Number");
            return;
        }

        var sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "customer %NAME% has registered".replace("%NAME%",req.body.name),
                    "customerId": "%id%".replace("%id%", this.lastID)
                })
            }

        });
    } catch (E) {
        res.status(400).send(E);
    }
});

// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "My Edited Version" })
});
