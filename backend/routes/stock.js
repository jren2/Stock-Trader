/* eslint-disable prefer-destructuring */
const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants')
const express = require('express')
const Stock = require('../models/Stock')

const router = express.Router()

router.post('/getResponse/:name', async (req, res) => {
  const { params } = req
  const { name } = params

  try {
    Stock.findOne({ name }, async (err, stock) => {
      if (err) {
        res.send('no user found')
      } else {
        res.json(stock.response)
      }
    })
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/updateResponse/:name', async (req, res) => {
  const { params } = req
  const { name } = params
  const { body } = req
  const { response } = body
  try {
    await Stock.findOneAndUpdate({ name }, { response })
    res.send({ result: true })
  } catch (e) {
    res.send('update failed')
  }
})

router.post('/createStock/:name', async (req, res) => {
  const { body } = req
  const { response } = body
  const { params } = req
  const { name } = params

  const lastUpdated = Date.now()

  try {
    Stock.findOne({ name }, async (err, stock) => {
      if (err === null) {
        await Stock.create({
          name, response, lastUpdated,
        })
        res.json({ result: true })
      } else {
        res.json({ result: false })
      }
    })
  } catch (e) {
    res.send('stock creation had a problem')
  }
})

router.post('/getLastUpdated', async (req, res) => {
  const name = 'AAPL'
  try {
    Stock.findOne({ name }, async (err, stock) => {
      if (err) {
        res.json({ result: false })
      } else {
        res.json({ lastUpdated: stock.lastUpdated })
      }
    })
  } catch (e) {
    res.send('get last updated had a problem')
  }
})

module.exports = router
