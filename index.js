const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient } = require('mongodb');
const { parse } = require('dotenv');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;


const serviceAccount = require('./potteryshop3-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function verifyToken(req, res, next) {
    if (req.headers.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];


        try {
            const decodedUser = await admin.auth().verifyIdToken(token);
            req.decodedEmail = decodedUser.email;
        }
        catch {

        }


    }

    next();
}


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
        const usersCollection = database.collection('users');
        const promosCollection = database.collection('promos');


        // Post user api
        app.post('/userList', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.json(result);
        });

        // Get user api
        app.get('/userList/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }

            res.json({ admin: isAdmin });
        });



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

        // search promo api
        app.get('/promo', async (req, res) => {
            const search = req.query.search;
            const query = { promoCode: search };
            const discount = await promosCollection.find(query).toArray();
            res.send(discount);
        });



        // Get product by ID api
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.findOne(query);
            res.send(result);
        });

        // Get product by Product_code api
        app.get('/product', async (req, res) => {
            const search = parseInt(req.query.search);
            const query = { product_code: search };
            const result = await productsCollection.find(query).toArray();
            res.send(result);
            console.log(result);
        });

        // Post Product api
        app.post('/users', async (req, res) => {
            const orderDetails = req.body;
            const options = { ordered: true };
            const result = await OrderCollection.insertMany(orderDetails, options);
            res.send(result);

        });

        // Delete product by id Api
        app.delete('/deleteproduct/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
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

        // Get all orders api
        app.get('/allOrders', async (req, res) => {
            const cursor = OrderCollection.find({});
            const allItems = await cursor.toArray();
            res.send(allItems);
        });

        // Update orders by id api
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const updateStatus = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: updateStatus[0]
                }
            };

            const result = await OrderCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // update user api
        app.put('/userList', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: user
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);
        });

        // update user api
        app.put('/makeAdmin/admin', verifyToken, async (req, res) => {
            const user = req.body;
            const requester = req.decodedEmail;
            if (requester) {
                const requesterAccount = await usersCollection.findOne({ email: requester });
                if (requesterAccount.role === 'admin') {

                    const filter = { email: user.email };
                    const updateDoc = {
                        $set: { role: 'admin' }
                    };
                    const result = await usersCollection.updateOne(filter, updateDoc);
                    res.json(result);

                }
            }
            else {
                res.status(403).json({ message: 'You do not have access to make admin' });
            }
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