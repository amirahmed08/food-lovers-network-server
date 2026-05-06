const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.alyjj2b.mongodb.net/?appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Routes
app.get('/', (req, res) => {
    res.send('server is running');
});

async function run(){
  try{
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const database = client.db("foodNetwork");
    const foodsCollection = database.collection('foods');

    //google signup user data post
    app.post('/users', async (req, res) => {
       const newUser = req.body;
       const result = await usersCollection.insertOne(newUser);
       res.send(result);
    })

    // post all foods
    app.post('/foods', async (req, res) => {
        const newFood = req.body;
        const result = await foodsCollection.insertOne(newFood);
        res.send(result)
    });

    //get all foods

    

    app.get('/foods', async (req, res) => {
      // const projectField = { name: 1, price_min: 1, price_max: 1, image: 1 };
      //   const cursor = foodsCollection.find().sort({price_min: 1}).skip(2).limit(6).project(projectField);
      
        const cursor = foodsCollection.find() 
        const result = await cursor.toArray();
        res.send(result);
    })

    

    //post review
    

    // delete a food
   


    await client.db("admin").command({ ping : 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!!");
  }
  finally{
    // Ensures that the client will close when you finish/error
  }
}

run().catch(console.dir);

// Start the server
app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`)
})