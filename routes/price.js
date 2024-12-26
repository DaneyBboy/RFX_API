var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb')
const client = new MongoClient('mongodb://localhost:27017/')

router.get('/list', async function (req, res, next) {
    res.json(await getpricelist())
});

router.post('/create', async function (req, res, next) {
    res.json(await createprice())
});

module.exports = router;

async function getpricelist(){

  await client.connect();
  const database = client.db('Rfx_Database')
  const collection = database.collection('Price_Bid')
  const result = await collection.find().toArray();
  client.close()
    console.log(result)
    return result
}

async function createprice() {
    await client.connect();
   const database = client.db('Rfx_Database');
   const collection =  database.collection('Price_Bid');
   const result = await collection.insertOne({
    "s.no": 3,
    "item name": "charger",
    "quantity": 5,
    "unit rate": 100
   })
   client.close()
   return result
    
}