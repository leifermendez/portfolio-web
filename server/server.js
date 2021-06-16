require('dotenv').config()
const passport = require('passport')
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express();
const PORT = 3000;
const {dbConnect} = require('./services/dbConnection')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(passport.initialize())

app.use(require('./routes/index'))


app.listen(PORT, () => {
  console.log(' READY')
})
dbConnect();
