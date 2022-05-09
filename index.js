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
        const inventoryItemsCollections = client.db('warehouse-inventor-management').collection('invenrotyitems');

        // adding items 
        app.post('/invenrotyitems', async (req, res) => {
            const doc = req.body;
            const result = await inventoryItemsCollections.insertOne(doc);
            res.send(result);
        });


        // get all items 
        app.get('/invenrotyitems', async (req, res) => {
            const query = {};
            const cursor = inventoryItemsCollections.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        // get an items using id 
        app.get('/invenrotyitems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const item = await inventoryItemsCollections.findOne(query);
            res.send(item);
        });

        // update a item
        app.put('/invenrotyitems/:id', async (req, res) => {
            const id = req.params.id;
            const updatedItem = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedItem.newQuantity
                }
            };
            const updetedResult = await inventoryItemsCollections.updateOne(filter, updatedDoc, options);
            res.send(updetedResult);
        });

        //delete items from manage inventory
        app.delete('/invenrotyitems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await inventoryItemsCollections.deleteOne(query);
            res.send(result);
        });

        // my items
        app.get('/invenrotyitems', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = inventoryItemsCollections.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('server running');
});
app.get('/check', (req, res) => {
    res.send('CHecked Successed');
});

app.listen(port, () => {
    console.log('listining to port:', port);
})