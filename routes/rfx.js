var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const { MongoClient } = require('mongodb');
const rfx = require('../models/rfxlist-model');
const { error } = require('console');

const client = new MongoClient('mongodb://localhost:27017/')

router.get('/list', async function (req, res, next) {
    let result = await rfx.find()
    console.log(result)
    res.send(result)
});

router.get('/rfxone', async function (req, res, next) {

    console.log(req.query.rfxid)
    let result = await rfx.find({ rfxid: req.query.rfxid })
    console.log(result)
    res.json(result)
});

router.get('/:rfxid', async function (req, res, next) {

    console.log(req.params.rfxid)
    let result = await rfx.find({ rfxid: req.params.rfxid })
    console.log(result)
    res.json(result)
});

function authorize(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Extract token after 'Bearer'
    console.log('Token:', token)

    if (!token) {
        console.log('Token missing');
        return res.sendStatus(403);
    }
     jwt.verify(token, "hello-world", (err, user) => {
        if (err) {
            console.log('JWT verification failed', err);
            return res.sendStatus(403);
        }

        if (user.role !== 'admin') {
            console.log('User does not have admin role');
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}


router.post('/create',authorize, async function (req, res, next) {
    const dataFromPostman = req.body
    try {
        let result = await rfx.create(dataFromPostman)
        console.log(result)
        res.send(result)
    } catch (err) {
        console.error('Error creating RFx:', err);
        res.status(500).send({ message: 'Error creating RFx' }); // Send error response if something goes wrong
    }

});



module.exports = router;

