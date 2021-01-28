const express = require("express");
const app = express();
const MongoClient = require('mongodb').MongoClient;

let db;
//define variable for mongo db database
MongoClient.connect('mongodb+srv://MongoUser:Dg3w3l9mmpYB5jY3@clusterapp.frsqz.mongodb.net/<dbname>?retryWrites=true&w=majority', (err, client) => {
    db = client.db('MongoDatabase');
});

app.use(express.json());

app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
});

app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/:collectionName');
});

app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
    });
});

app.listen(3000, function() {
    console.log("Express server on port 3000");
});