var express = require('express');
var router = express.Router();
const { MongoClient } = require("mongodb");

/* GET users listing. */
router.get('/', function(req, res, next) {
    const uri =
    "mongodb+srv://shubham:H7ZqtPyQudV4PqlJ@cluster0.yk5sx.mongodb.net/camp?retryWrites=true&w=majority";
  
    const client = new MongoClient(uri);
    let user_id = req.query.user_id;
    let is_admin = false
    async function run() {
      try {
        await client.connect();
    
        const database = client.db('camp');
        if(user_id === "false"){
            const collection = database.collection('users');
            user_id = String(new Date().getTime())
            const query = { user_id: user_id };
            const room = await collection.insertOne(query);
        }

        const collection1 = database.collection('rooms_users');
        const query1 = { room_name: req.query.roomName,user_id: user_id };
        const member = await collection1.findOne(query1)

        const collection2 = database.collection('rooms_admin');
        const query2 = { room_name: req.query.roomName};
        const member1 = await collection2.findOne(query2);
        
        if(member1){
           if(member1.admin_id === user_id){
                is_admin = true
            }
        }
        else{
            is_admin = true
            const collection3 = database.collection('rooms_admin');
            const query3 = { room_name: req.query.roomName, admin_id: user_id};
            const member3 = await collection3.insertOne(query3);
        }




        if(member){

        }else{
            await collection1.insertOne(query1)
        }
        

        
    
      } finally {
        // Ensures that the client will close when you finish/error
        
        await client.close();
        // socket.room = roommName
        res.send({roomName: req.query.roomName, user_id: user_id, is_admin: is_admin});
      }
    }
    run().catch(console.dir);
//   res.send('respond with a resource2');
});

module.exports = router;
