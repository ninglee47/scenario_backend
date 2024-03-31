const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // Choose any available port
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
require('dotenv').config();

const getModels = require('./apps/getModels')
const generateImages = require('./apps/generateImages')
const getInferences = require('./apps/getInferences')
const getImagesOfIntance = require('./apps/getImagesOfIntance')

//Generate a image
app.post('/api/generateImage', async (req, res) => {
  const result = await generateImages(req, res)
  console.log(result)
  res.json(JSON.stringify(result))
});

//get private model list
app.get('/api/getModels', (req,res) => {
  getModels(req, res)
})

//get private model list
app.get('/api/getInferences',  async (req,res) => {
  const result = await getInferences(req, res)
  console.log(result)
  es.json(JSON.stringify(result))
})

//get private model list
app.get('/api/test', (req,res) => {
  const key = process.env.API_KEY
  const secret_key = process.env.Secret_API_KEY
  const token = Buffer.from(`${key}:${secret_key}`).toString('base64');

  const sdk = require('api')('@scenario-api/v1.0#fydhn73iklq3ujnso');
  sdk.auth(`Basic ${token}`);
  sdk.getInferences()
    .then(({ data }) => res.json(data))
    .catch(err => console.error(err));
})

//get Images of a instance
app.get('/api/getImagesOfIntance', (req,res) => {
  getImagesOfIntance(req, res)
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});