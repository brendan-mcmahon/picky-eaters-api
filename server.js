'use strict'

const express = require('express');
const bodyParser = require('body-parser');
// const pool = require('pg');

// const pool = new pool({
//     connectionSTring: process.env.DATABASE_URL,
//     ssl: true
// });

const app = express();

const likedIt = { id: 1, name: "liked it" };
const hatedIt = { id: 2, name: "hated it" };
const madeSick = { id: 3, name: "made me sick" };

const brendan = { id: 1, name: "Brendan"};
const jamie = { id: 2, name: "Jamie" };

const restaurants = [
    {
        id: 1,
        name: "Pizza King",
        menuItems: [
            {
                id: 1,
                name: "Tea",
                person: jamie,
                opinion: hatedIt
            },
            {
                id: 3,
                name: "Pepperoni Breadsticks",
                person: brendan,
                opinion: madeSick
            }
        ]
    },
    {
        id: 2,
        name: "Hana",
        menuItems: [
            {
                id: 2,
                name: "Seafood Pizza",
                person: jamie,
                opinion: likedIt
            },
            {
                id: 3,
                name: "Seafood Pizza",
                person: brendan,
                opinion: hatedIt
            }
        ]
    },
]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(restaurants));
})

app.get('/people', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify([brendan, jamie]));  
})

app.get('/opinionOptions', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify([likedIt, hatedIt, madeSick]));  
})

app.post('/addMenuItem', (req, res) => {
    const body = req.body;
    console.log(req.body);
    console.log(req.body.test);
    res.set('Content-Type', 'text/plain');
    res.send(`You sent: ${JSON.stringify(body)}`);
})

app.listen(process.env.PORT || 5000, err => {
    if (err) {
        throw err;
    }
})

console.log('Node.js web server at port 5000 is running..')