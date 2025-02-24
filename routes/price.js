var express = require('express');
var router = express.Router();
const Price = require('../models/price-modal');
const priceSub = require('../models/priceSub-modal')
const { error } = require('console');

router.post('/create', async function (req, res, next) {

  const dataFromFront = req.body
  console.log(dataFromFront)

  try {

    // Save the price data
    const pricebid = await Price.create(dataFromFront);
    console.log('Created PriceBid:', pricebid);
    res.status(201).send(pricebid);
  } catch (err) {
    console.error('Error creating PriceBid:', err);
    res.status(500).send({ message: 'Error creating PriceBid' }); // Send error response if something goes wrong
  }

});

router.post('/submit', async function (req, res, next) {

  const dataFromFront = req.body
  console.log(dataFromFront)

  try{
    const pricebid = await priceSub.create(dataFromFront);
    console.log('Created PriceBid:', pricebid);
    res.status(201).send(pricebid);


  }catch(err){
    console.error('Error creating PriceBid:', err);
    res.status(500).send({ message: 'Error PriceBid Submission' });
  }
  
})
router.get('/getprice/:rfxNumber', async function (req, res) {
  const { rfxNumber } = req.params;

  try {
    const priceDetails = await Price.find({ rfxNumber: rfxNumber });
    console.log(priceDetails)
    if (!priceDetails) {
      return res.status(404).json({error: "Price Not Found"})
    }
    res.json(priceDetails);
  }catch(err){
    console.error("Error fetching price details:", err);
    res.status(500).json({ error: 'Failed to fetch Price details' });

  }  
   })


module.exports = router;