const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();


// middle ware 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xz1rk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const inventoryItemsCollections = client.db('WAREHOUSE-INVENTORY-MANAGEMENT').collection('invenrotyitems');

        app.post('/invenrotyitems', async (req, res) => {
            const doc = req.body;
            const result = await serviceCOllection.insertOne(doc);
            res.send(result);
        });

    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('server running');
});

app.listen(port, () => {
    console.log('listining to port:', port);
})