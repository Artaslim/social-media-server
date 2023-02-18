const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const port= process.env.PORT || 5000;
const app = express();

//midleware
app.use(cors());
app.use (express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7leckst.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try{
   
    const socilMediaCollection = client.db('socialMedia').collection('socialCards')




      app.get('/socialName', async (req, res) => {
            const query = {}
            const result = await socilMediaCollection.find(query).project({ name: 1,image:1}).toArray();
            res.send(result);
        })
    
        app.get('/socialCards',  async (req, res) => {
            const query = {};
            const socialCards = await socilMediaCollection.find(query).toArray();
            res.send(socialCards);
        })
    //      app.get("/socialCards/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query={_id: ObjectId(id)};
    //   const social = await socilMediaCollection.findOne(query);
    //   res.send(social);
    // });

      app.post('/socialCards', async (req, res) => {
            const socialCard = req.body;
            const result = await socilMediaCollection.insertOne(socialCard);
            res.send(result);
        });
}
finally{

}
}
run().catch(console.log)



app.get('/', async(req, res)=>{
    res.send('social-media-server running')
})

app.listen(port, ()=>console.log(`social media is running ${port}`))