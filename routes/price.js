var express = require('express');
var router = express.Router();
const Price = require('../models/price-modal')

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
  

module.exports = router;