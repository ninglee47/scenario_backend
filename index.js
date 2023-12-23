const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Choose any available port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
require('dotenv').config();

const getModels = require('./apps/getModels')
const generateImages = require('./apps/generateImages')

//Generate a image
app.post('/api/generateImage', (req, res) => {
  generateImages(req, res)
});

//get private model list
app.get('/api/getModels', (req,res) => {
  getModels(req, res)
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


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});