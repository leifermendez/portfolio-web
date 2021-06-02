const axios = require('axios');

const url = ['https://www.googleapis.com/youtube/v3/subscriptions?part=id&mine=true&',
  'forChannelId=', process.env.YOUTUBE_CHANNEL]

const checkSub = (token) => {
  console.log(JSON.stringify(token), url.join(''))
  return axios.get(url.join(''), {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
}

module.exports = {checkSub}
