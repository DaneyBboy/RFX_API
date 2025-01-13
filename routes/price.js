var express = require('express');
var router = express.Router();
const rfx = require('../models/rfxlist-model')
const Price = require('../models/price-modal')

router.post('/create', async function (req, res, next) {

    const dataFromFront = req.body
    console.log(dataFromFront)
    
    try {
      // let result = await rfx.findOne({ rfxNumber: dataFromFront.rfxNumber });
      // console.log(result)
      
      // if(!result){
      //   return res.status(400).send({ message: 'Invalid RFX number' });
      // }const priceData = {
      //   ...dataFromFront,
      //   rfxNumber: rfx._id, // Link the RFX _id
      // };
      // Save the price data
      const pricebid = await Price.create(dataFromFront);
      console.log('Created PriceBid:', pricebid);
      res.status(201).send(pricebid);
    } catch (err) {
      console.error('Error creating PriceBid:', err);
      res.status(500).send({ message: 'Error creating PriceBid' }); // Send error response if something goes wrong
    }
  
  });
  

module.exports = router;

// router.get('/pricebids/:rfxNumber', async function (req, res) {
//   const { rfxNumber } = req.params;

//   try {
//       // Find the RFX document by rfxNumber
//       const rfx = await Rfx.findOne({ rfxNumber });
//       if (!rfx) {
//           return res.status(404).send({ message: 'RFX not found' });
//       }

//       // Find all PriceBid documents linked to this RFX
//       const priceBids = await Price.find({ rfxNumber: rfx._id });
//       res.send(priceBids);
//   } catch (err) {
//       console.error('Error fetching PriceBids:', err);
//       res.status(500).send({ message: 'Error fetching PriceBids' });
//   }
// });

// router.get('/list', async function (req, res, next) {
//     res.json(await getpricelist())
// });

// async function getpricelist(){

//   await client.connect();
//   const database = client.db('Rfx_Database')
//   const collection = database.collection('Price_Bid')
//   const result = await collection.find().toArray();
//   client.close()
//     console.log(result)
//     return result
// }

// async function createprice() {
//     await client.connect();
//    const database = client.db('Rfx_Database');
//    const collection =  database.collection('Price_Bid');
//    const result = await collection.insertOne({
//     "s.no": 3,
//     "item name": "charger",
//     "quantity": 5,
//     "unit rate": 100
//    })
//    client.close()
//    return result
    
// }