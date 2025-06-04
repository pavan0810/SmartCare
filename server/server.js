var http = require('http');
var express = require('express');
var propertiesReader = require("properties-reader");
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var path = require('path');
const { json } = require('stream/consumers');
const { error } = require('console');

var app = express();
app.use(express.json());
app.use(cors());
let propertiesPath = path.resolve(__dirname, "conf/db.properties");
let properties = propertiesReader(propertiesPath);

// setting up connection to MongoDB
let dbPprefix = properties.get("db.prefix");
let dbUsername = encodeURIComponent(properties.get("db.user"));
let dbPwd = encodeURIComponent(properties.get("db.pwd"));
let dbName = properties.get("db.dbName");
let dbUrl = properties.get("db.dbUrl");
let dbParams = properties.get("db.params");
const uri = dbPprefix + dbUsername + ":" + dbPwd + dbUrl + dbParams;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
let db = client.db(dbName);


app.param('collectionName', function(req, res, next, collectionName) {
    req.collection = db.collection(collectionName);
    next();
})

app.get('/collections/:collectionName', async function(req, res) {
    const query = JSON.parse('{}');
    var patients = await dbSearch(query, req.collection);
    res.json(patients);
});

app.get('/getPatientData/:collectionName/:query', async function(req, res) {
    try {
        const query = JSON.parse(decodeURIComponent(req.params.query));
        var patients = await dbSearch(query, req.collection);
        res.json(patients);
    } catch(err) {
        console.error(error);
    }
});

var server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server listening on port 5000!");
})

async function dbSearch(query, collection) {
    const results = await collection.find(query).toArray();
    return results;
}