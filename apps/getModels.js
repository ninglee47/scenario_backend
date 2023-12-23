const getModels = (req,res) => {
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
}

module.exports = getModels;