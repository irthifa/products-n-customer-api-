var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
        
        db.run(`CREATE TABLE customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            address text,
            email text,
            dateOfBirth text,
            gender text,
            age text,
            cardHolderName text,
            cardNumber text,
            expiryDate text,
            cvv text,
            timeStamp text
            )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Table just created, creating some rows
                var insert = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
                db.run(insert, ["irthifa ikram", "11/2 A, Wonder Lane, Beautiful City", "myemail@gmail.com", "2000.02.02", "female", "23", "irthifa ikram", "123456789012", "02/2025", "123", "2023-04-25 22:22:22"])
            }
        })
        
        


    }
})

module.exports = db

