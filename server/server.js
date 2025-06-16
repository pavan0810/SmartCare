var http = require('http');
var winkNLP = require('wink-nlp');
var model = require( 'wink-eng-lite-web-model' );
var express = require('express');
var propertiesReader = require("properties-reader");
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var path = require('path');
const { json } = require('stream/consumers');
const { error } = require('console');
const multer = require('multer');
var symptoms = ['chest pain', 'fever', 'weight loss', 'night sweat', 'shortness of breath', 'dry cough', 'burning pee', 'stomach paining'];
// setting up wink-nlp for text extraction
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'patientFiles/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

var app = express();
app.use(express.json());
app.use(cors());
app.use("/patientFiles", express.static("patientFiles"))
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
        res.json({"message" : "Error when getting data"})
    }
});

app.post('/uploadFile/:collectionName', upload.single('file'), async function(req, res) {
    try {
        let date = req.body.date;
        let patientID = JSON.parse(req.body.patient).patientID;
        const result = await req.collection.insertOne(
            {"patientID" : patientID, "date": date, "file" : req.file.filename}
        );
        console.log(result);
        res.json({"message" : "file uploaded!"})
    } catch(err) {
        console.error(err);
        res.json({"message" : "Error when uploading file!"})
    }
});

app.post('/uploadNotes/:collectionName', async function(req, res) {
    try{
        var patientData = req.body;
        const result = await req.collection.insertOne(patientData);
        console.log(result);
        res.json({"message" : "Document successfully uploaded!"})
    } catch(err) {
        console.error(err);
        res.json({"message" : "Error when uploading document"})
    }
});

app.post('/uploadPrescription/:collectionName', async function(req, res) {
    try{
        var prescription = req.body;
        const result = await req.collection.insertOne(prescription);
        console.log(result);
        res.json({"message" : "Prescription uploaded successfully!"});
    } catch(err) {
        console.error(err);
        res.json({"message" : "Failed to upload prescription"});
    }
});

app.get('/testNLP', function(req, res) {
    var notes = " Patient reports a dry cough lasting for over 10 days. She experiences mild shortness of breath on exertion but denies chest pain. No history of fever, night sweats, or weight loss. She reports mild fatigue and occasional sore throat paining.";
    const doc = nlp.readDoc(notes);
    var notesLemma = doc.tokens().filter(t => t.out(its.type) === 'word').out(its.lemma);
    notesLemma = notesLemma.join(' ');
    var result = symptoms.map((symptom) => {
        var symptomDoc = nlp.readDoc(symptom);
        var symptomsLemma = symptomDoc.tokens().out(its.lemma).join(' ');
        return notesLemma.includes(symptomsLemma) ? 1 : 0;
    });
    console.log(result);
    res.json("Hello");
});

var server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server listening on port 5000!");
})

async function dbSearch(query, collection) {
    const results = await collection.find(query).toArray();
    return results;
}