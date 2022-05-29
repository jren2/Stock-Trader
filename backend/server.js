const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')

const { database } = require('./config')

const User = require('./models/User')
const accountRouter = require('./routes/account')
const apiRouter = require('./routes/api')
const stockRouter = require('./routes/stock')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || database

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(cookieSession({
  name: 'session',
  keys: ['pineapple'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use(express.json())
app.use(express.static('dist'))

app.use('/stock', stockRouter)
app.use('/account', accountRouter)
app.use('/api', apiRouter)

// set the static folder

// THESE ROUTES SHOULD BE PUT AFTER ALL OTHER ROUTERS
// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 3001')
})
