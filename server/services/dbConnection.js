const mongoose = require('mongoose')
const DB_URI = process.env.DB_URI;


const dbConnect = () => {

  mongoose.connect(
    DB_URI,
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) {
        console.log('Error conexión DB')
      } else {
        console.log('Conexión Correcta!')
      }
    }
  )


}

module.exports = {dbConnect}
