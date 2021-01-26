var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.



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
      const query = { name: req.query.roomName };
      const room = await collection.insertOne(query);
  
    } finally {
      // Ensures that the client will close when you finish/error
      
      await client.close();
      res.send({roomName: req.query.roomName});
    }
  }
  run().catch(console.dir);

  
});

module.exports = router;
