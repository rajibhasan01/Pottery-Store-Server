const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const { parse } = require('dotenv');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nzlp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db('PotteryStore');
        const productsCollection = database.collection('products');
        const OrderCollection = database.collection('orderList');
        const ReviewCollection = database.collection('reviews');


        // Get all products api
        app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });

        // Get all review api
        app.get('/reviews', async (req, res) => {
            const cursor = ReviewCollection.find({});
            const products = await cursor.toArray();
            res.send(products);
        });



        // Get product by ID api
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.findOne(query);
            res.send(result);
        });

        // Post Product api
        app.post('/users', async (req, res) => {
            const orderDetails = req.body;
            const result = await OrderCollection.insertOne(orderDetails);
            res.send(result);

        });

        // Post review api
        app.post('/review', async (req, res) => {
            const myReview = req.body;
            const result = await ReviewCollection.insertOne(myReview);
            res.send(result);

        });


        // Get Product by id Api
        app.get('/myOrders', async (req, res) => {
            const search = req.query.search;
            const query = { email: search };
            const myOrder = await OrderCollection.find(query).toArray();
            res.send(myOrder);

        });

        // Delete Order by id Api
        app.delete('/myOrders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await OrderCollection.deleteOne(query);

            res.send(result);
        });

        // Post products Api
        app.post('/product', async (req, res) => {
            const productDetails = req.body;
            const result = await productsCollection.insertOne(productDetails);
            res.send(result);

        });



    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    console.log('Assignment 12 server is ready');
    res.send('Assignment server is ready');
})

app.listen(port, () => {
    console.log('listening at port ', port);
});