const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Choose any available port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
require('dotenv').config();

//Generate a image
app.post('/api/generateImage', (req, res) => {
  const key = process.env.API_KEY
  const secret_key = process.env.Secret_API_KEY
  const token = Buffer.from(`${key}:${secret_key}`).toString('base64');
  const promptInput = req.body.prompt
  
  try {
    const sdk = require('api')('@scenario-api/v1.0#c0uhbh36ll5jduwg');

    const modelId = 'UrRPiXxwSAioVqu5bR5bbA' // It's one of our signature public models 

    sdk.auth(`Basic ${token}`);
    sdk.postModelsInferencesByModelId({
      parameters: {
        type: 'txt2img',
      prompt: promptInput
    }
    }, {modelId: 'UrRPiXxwSAioVqu5bR5bbA'})
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));

    const inferenceId = data.inference.id
    sdk.getModelsInferencesByModelIdAndInferenceId({
      modelId, 
      inferenceId
    })
     .then(({ data }) => res.json(data))
     .catch(err => console.error(err));
  } catch(err) {
    res.json(err)
  }
});

//get private model list
app.get('/api/getModels', (req,res)=>{
  const key = process.env.API_KEY
  const secret_key = process.env.Secret_API_KEY
  const token = Buffer.from(`${key}:${secret_key}`).toString('base64')
  try {
    const sdk = require('api')('@scenario-api/v1.0#c0uhbh36ll5jduwg');
    sdk.auth(`Basic ${token}`);
    sdk.getModels()
      .then(({ data }) => res.json(data))
      .catch(err => console.error(err));
  } catch(err) {
    res.json(err)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});