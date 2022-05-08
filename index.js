const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


// middle ware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server running');
});

app.listen(port, () => {
    console.log('listining to port:', port);
})