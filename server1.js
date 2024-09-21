const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/loginpage");
let db = mongoose.connection;

db.on('error', () => console.log("Error connecting to database"));
db.once('open', () => console.log("Connection Successful"));

app.post('/register', (req, res) => {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password
    }

    db.collection('user').insertOne(data, (err,result) => {
        if (err) {
            throw err;
        } else {
            console.log("Record inserted successfully");
        }
    });
 
    return res.redirect('MAIN.HTML');
});

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('MAIN.HTML');
}).listen(5090);

console.log(`listening at port 5090`);
