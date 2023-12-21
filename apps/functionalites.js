const sdk = require('api')('@scenario-api/v1.0#c0uhbh36ll5jduwg');

const modelId = 'WMFVfL6ASISizG1T7X2NNw' // It's one of our signature public models 

sdk.auth('Basic <<base64(key:secret)>>');
sdk.postModelsInferencesByModelId({
  parameters: {
    type: 'txt2img',
    prompt: 'a bear in the woods'
  }
}, {modelId: 'WMFVfL6ASISizG1T7X2NNw'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

const inferenceId = data.inference.id
sdk.getModelsInferencesByModelIdAndInferenceId({
  modelId, 
  inferenceId
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));