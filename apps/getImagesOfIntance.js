const getImagesOfIntance = async (req, res) => {
    console.log("get images from a instance")
    const key = process.env.API_KEY
    const secret_key = process.env.Secret_API_KEY
    const token = Buffer.from(`${key}:${secret_key}`).toString('base64');
    let { inferenceId } = req.query;
    
    try {
      const sdk = require('api')('@scenario-api/v1.0#c0uhbh36ll5jduwg');
  
      const modelId = 'UrRPiXxwSAioVqu5bR5bbA' // It's one of our signature public models 
      //let inferenceId
      sdk.auth(`Basic ${token}`);
      // const inferenceId = data.inference.id
      //const inferenceId = 'inf_brnVSSnKqymJMBjRWkQQf7CR'
      console.log('check id',inferenceId)
      
      await sdk.getModelsInferencesByModelIdAndInferenceId({
        modelId, 
        inferenceId
      })
       .then(({ data }) => { return res.json(data)})
       .catch(err => console.error(err));
    } catch(err) {
      res.json(err)
    }
  }
  
  module.exports = getImagesOfIntance;