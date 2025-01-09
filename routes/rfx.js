var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const { MongoClient } = require('mongodb');
const rfx = require('../models/rfxlist-model');
const { error } = require('console');

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

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

router.get('/number/:rfxNumber', async function (req, res, next) {
  const { rfxNumber } = req.params;

  try {
    const rfxDetails = await rfx.findOne({ rfxNumber: rfxNumber }); // Find by the RFX number
    console.log(rfxDetails)
    if (!rfxDetails) {
      return res.status(404).json({ error: 'RFX not found' });
    }
    const fileUrl = `http://localhost:4000/${rfxDetails.fileUpload}`;
    res.json({ ...rfxDetails._doc, fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch RFX details' });
  }
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


router.post('/create', authorize, async function (req, res, next) {
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

// router.post('/createnew', upload.single('fileUpload'), async(req,res)=>{

//     const  dataFromPostman = req.body

//     console.log(dataFromPostman)  
//     const result = await rfx.create(dataFromPostman)      
//     res.send(result)

// })

router.post('/createnew', upload.single('fileUpload'), async (req, res) => {
  try {
    //  Extract the data from the request body and the uploaded file
    const { proposalCriteria, rfxNumber, dateIssued, contactPerson, submissionDate, purpose, projectGoals, scopeOfWork } = req.body;
    const file = req.file;

    console.log('Received file:', file);

    // Prepare the data to be stored, including the file metadata
    const fileMetadata = file ? {
      fileName: file.originalname,
      filePath: file.path,  // Save the file path to MongoDB
      fileSize: file.size,
      mimeType: file.mimetype
    } : null;

    //   Save the new record in the database
    const newRFX = new rfx({
      proposalCriteria,
      rfxNumber: parseInt(rfxNumber), // Make sure rfxNumber is an integer
      dateIssued: new Date(dateIssued),
      contactPerson,
      submissionDate: new Date(submissionDate),
      purpose,
      projectGoals,
      scopeOfWork,
      fileUpload: fileMetadata ? fileMetadata.filePath : null,  // Store file path or name
    });

    const result = await newRFX.save();

    // Return the created record (including file metadata) in the response
    res.json({
      success: true,
      message: 'Record created successfully',
      data: result
    });
  } catch (err) {
    console.error('Error creating new RFX record:', err);
    res.status(500).json({
      success: false,
      message: 'Error saving the data',
      error: err.message,
    });
  }
});


module.exports = router;

