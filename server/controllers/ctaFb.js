

const getCtaFB = async (req, res) => {
  const {query} = req; //idTest
  res.send({page: process.env.FB_PAGE})
}

module.exports = {getCtaFB}
