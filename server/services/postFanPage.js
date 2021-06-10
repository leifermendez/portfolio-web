const {getCTATest} = require('../services/dbHandler')

const axios = require('axios');
const qs = require('qs');

let url = `https://graph.facebook.com/v10.0/${process.env.FP_ID}`;

const postFb = ({dataJson, id}) => new Promise((resolve, reject) => {
  const m = getCTATest(id)
  const message = [
    `👋 Hola!`,
    `${dataJson.first_name} 💆‍♂️`
  ].join(' ')

  const data = qs.stringify({
    'message': `${message} ${m.message}`,
    'access_token': process.env.APP_FB_TOKEN
  });

  const idPost = m.url.split('/').pop();

  url += `_${idPost}/comments`;

  const config = {
    method: 'post',
    url,
    headers: {
      'Host': 'graph.facebook.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };

  axios(config)
    .then((response) => {
      resolve({res: response.data})
    })
    .catch((error) => {
      reject(error)
    });
})

module.exports = {postFb}
