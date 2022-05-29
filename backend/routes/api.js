/* eslint-disable prefer-destructuring */
const { SSL_OP_NETSCAPE_CHALLENGE_BUG } = require('constants')
const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/tickers', async (req, res) => {
  const { body } = req
  const { username } = body
  console.log(`user: ${username}`)
  try {
    User.findOne({ username }, async (err, user) => {
      if (err) {
        res.send('no user found')
      } else {
        const { inventory } = user
        res.json(inventory)
      }
    })
  } catch (e) {
    res.send('error occured')
  }
})

// Buy Tickers
router.post('/tickers/buy/:ticker', async (req, res) => {
  const { body } = req
  const { params } = req
  const { ticker } = params
  const {
    amount, username, price,
  } = body

  User.findOne({ username },
    async (err, user) => {
      if (err) {
        res.send('no user found')
      } else {
        const { inventory, money, _id } = user
        if (ticker in inventory) {
          let moneyNew = money
          const inventoryNew = inventory
          inventoryNew[`${ticker}`] += amount
          moneyNew = money - (price * amount)

          try {
            await User.updateOne({ _id }, { inventory: inventoryNew })
            await User.updateOne({ _id }, { money: moneyNew })
            res.send('tickers bought!')
          } catch (e) {
            res.send('tickers buy failed')
          }
        } else {
          res.send('ticker not found')
        }
      }
    })
})

// Sell Tickers
router.post('/tickers/sell/:ticker', async (req, res) => {
  const { body } = req
  const { params } = req
  const { ticker } = params
  const {
    amount, username, price,
  } = body

  User.findOne({ username },
    async (err, user) => {
      if (err) {
        res.send('no user found')
      } else {
        const { inventory, money, _id } = user
        if (ticker in inventory) {
          let moneyNew = money
          const inventoryNew = inventory
          inventoryNew[`${ticker}`] -= amount
          moneyNew = money + (price * amount)

          try {
            await User.updateOne({ _id }, { inventory: inventoryNew })
            await User.updateOne({ _id }, { money: moneyNew })
            res.send('tickers sold!')
          } catch (e) {
            res.send('tickers sell failed')
          }
        } else {
          res.send('ticker not found')
        }
      }
    }).clone()
})

// Get Amount Ticker
router.post('/tickers/get/:ticker', async (req, res) => {
  const { body } = req
  const { params } = req
  const { ticker } = params
  const {
    username,
  } = body

  User.findOne({ username },
    async (err, user) => {
      if (err) {
        res.send('no user found')
      } else {
        const { inventory, _id } = user
        if (ticker in inventory) {
          try {
            const amount = inventory[`${ticker}`]
            res.json({ amount })
          } catch (e) {
            res.send('tickers sell failed')
          }
        } else {
          res.send('ticker not found')
        }
      }
    })
})

router.post('/isLoggedIn', async (req, res) => {
  const { session } = req
  const { user } = session
  try {
    if (user != null && user !== undefined) {
      res.json({ result: true })
    } else {
      res.json({ result: false })
    }
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/getUser', async (req, res) => {
  try {
    res.send(req.session.user)
  } catch (e) {
    res.send('error getting user')
  }
})

router.post('/getUserMoney', async (req, res) => {
  req.setTimeout(0)
  const name = req.session.user
  await User.findOne({ username: name }, (err, user) => {
    if (err) {
      res.send('no user found')
    } else {
      res.send(user)
    }
  }).clone()
})

module.exports = router
