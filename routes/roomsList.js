var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

/* GET users listing. */
router.get('/', function(req, res, next) {
    const uri =
    "mongodb+srv://shubham:H7ZqtPyQudV4PqlJ@cluster0.yk5sx.mongodb.net/camp?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
    async function run() {
      try {
        await client.connect();
    
        const database = client.db('camp');
        const collection = database.collection('rooms');
    
        // Query for a movie that has the title 'Back to the Future'
        // const query = { name: req.query.roomName };
        const cursor = await collection.find({});
        let final = []
        await cursor.forEach((one)=>{final.push(one)});
        // console.log()
        res.send((final));
    
      } finally {
        // Ensures that the client will close when you finish/error
        
        await client.close();
        
      }
    }
    run().catch(console.dir);
    //res.send('respond with a list');
});

module.exports = router;
