const generateImages = async (req, res) => {
  console.log("Reccinved")
  const key = process.env.API_KEY
  //const key = req.body.key
  const secret_key = process.env.Secret_API_KEY
  const token = Buffer.from(`${key}:${secret_key}`).toString('base64');
  const promptInput = req.body?.prompt
  console.log('req', req.body)
  try {
    const sdk = require('api')('@scenario-api/v1.0#c0uhbh36ll5jduwg');

    const modelId = 'UrRPiXxwSAioVqu5bR5bbA' // It's one of our signature public models 
    //let inferenceId
    sdk.auth(`Basic ${token}`);
    return await sdk.postModelsInferencesByModelId({
      parameters: {
        type: 'txt2img',
      prompt: promptInput
    }
    }, {modelId: 'UrRPiXxwSAioVqu5bR5bbA'})
      .then(({ data }) => {return data.inference.id})
      .catch(err => console.error(err));
  } catch(err) {
    res.json(err)
  }
}

module.exports = generateImages;