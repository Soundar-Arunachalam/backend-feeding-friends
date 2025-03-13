const express =require( "express");
const { MongoClient } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const dbURL = "mongodb+srv://praveenkumartv1:1234@praveendb.ac0h0.mongodb.net/?retryWrites=true&w=majority&appName=praveendb";
const dbName = "receivers";
//app initialization
const app = express();
// Middleware
app.use(cors({
    origin: "https://feeding-friends-b21fc.web.app", // Your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
  }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let db;




async function connectToDB() {
    try {
        const client = new MongoClient(dbURL);
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

app.post('/registerDonor', async (req, res) => {
    try {
        const collection = db.collection('donor-details');
        const obj = {
                typeOfDonor,
                businessName,
                contactName,
                mobileNumber,
                emailId,
                address,
                pinCode,
        } = req.body
        await collection.insertOne(obj);
        console.log(obj);

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save receiver details' });
    }
});





//app running
app.listen(5999,async ()=>{
    await connectToDB();
console.log("App is listening in port 5999")
});