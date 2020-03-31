'use strict'

const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let serviceAccount = require('./serviceAccountKey.json');

serviceAccount.project_id = process.env.FIREBASE_PROJECT_ID;
serviceAccount.private_key_id = process.env.FIREBASE_PRIVATE_KEY_ID;
serviceAccount.private_key = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
serviceAccount.client_email = process.env.FIREBASE_CLIENT_EMAIL;
serviceAccount.client_id = process.env.FIREBASE_CLIENT_ID;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
let db = admin.firestore();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/restaurants', (req, res) => {
    
    console.log('Processing GET request for Restaurants');

    db.collection('restaurants').get()
    .then((snapshot) => {
        const restaurants = [];
        res.set('Content-Type', 'application/json');
        snapshot.forEach((doc) => {
            restaurants.push({
                name: doc.data().name,
                id: doc.id
            });
        });        
        return res.send(restaurants);
    })
    .catch((err) => {
        console.log('Error getting restaurants:', err);
    });
})

app.post('/restaurant', async (req, res) => {

    console.log(req.body);

    let setDoc = db.collection('restaurants').doc().set(req.body);

    try {
        const response = await setDoc;
        console.log('Set: ', response);
        res.set('Content-Type', 'text/plain');
        res.send(req.body);
    }
    catch (err) {
        console.log(`"Add failed with error: ${err}`);
    }
})

app.get('/people', (req, res) => {
    console.log('Processing GET request for People');

    db.collection('people').get()
    .then((snapshot) => {
        const people = [];
        res.set('Content-Type', 'application/json');
        snapshot.forEach((doc) => {
            console.log(doc.id);
            people.push(doc.data());
        });        
        return res.send(people);
    })
    .catch((err) => {
        console.log('Error getting people:', err);
    });
})

app.post('/person', async (req, res) => {

    console.log(req.body);

    let setDoc = db.collection('people').doc().set(req.body);

    try {
        const response = await setDoc;
        console.log('Set: ', response);
        res.set('Content-Type', 'text/plain');
        console.log(`new person: ${response.name}`);
        res.send(req.body);
    }
    catch (err) {
        console.log(`"Add failed with error: ${err}`);
    }
})

app.get('/reviews/:restaurantId', (req, res) => {
    console.log(`Processing GET request for Reviews for restaurant id: ${req.params["restaurantId"]}`);

    db.collection('reviews')
    .where('restaurantId', '==', req.params["restaurantId"])
    .get()
    .then((snapshot) => {

        if (snapshot.empty){
            return res.status(404).send("No reviews found");
        }

        const reviews = [];
        snapshot.forEach((doc) => {
            reviews.push(doc.data());
        });
        
        res.set('Content-Type', 'application/json');
        return res.send(reviews);
    })
    .catch((err) => {
        console.log('Error getting reviews:', err);
    });
})

app.post('/reviews', async (req, res) => {

    const personName = req.body.person;
    const opinionId = req.body.orderAgain;
    const itemName = req.body.name;

    let stringified = `${personName} would${opinionId ? '' : ' not'} order ${itemName} again.`;

    let setDoc = db.collection('reviews').doc().set(req.body);

    try {
        const response = await setDoc;
        console.log('Set: ', response);
        res.set('Content-Type', 'text/plain');
        res.send(stringified);
    }
    catch (err) {
        console.log(`"Add failed with error: ${err}`);
    }
})

app.listen(process.env.PORT || 5000, err => {
    if (err) {
        throw err;
    }
})

console.log('Node.js web server at port 5000 is running..')