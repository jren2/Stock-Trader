const express = require('express')
const passport = require('passport')

const bcrypt = require('bcryptjs')
const User = require('../models/User')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { body } = req
  const { username, password } = body
  const money = 10000
  const inventory = {
    AAPL: 0,
    AMZN: 0,
    CSCO: 0,
    FB: 0,
    GOOG: 0,
    IBM: 0,
    INTC: 0,
    JPM: 0,
    MSFT: 0,
    NFLX: 0,
    QCOM: 0,
    TSLA: 0,
  }
  try {
    await User.create({
      username, password, money, inventory,
    })
    res.send('user creation was successful')
  } catch (e) {
    res.send('user creation had a problem')
  }
})

router.post('/logout', async (req, res) => {
  try {
    req.session = null
    res.send('user logout was successful')
  } catch (e) {
    res.send('user logout had a problem')
  }
})

router.post('/login', async (req, res) => {
  const { body } = req
  const { username, password } = body
  User.findOne({ username },
    (err, user) => {
      if (err) {
        const isLogged = { logged: false }
        res.json(isLogged)
      } else if (user == null) {
        const isLogged = { logged: false }
        res.json(isLogged)
      } else if (user.password !== password) {
        const isLogged = { logged: false }
        res.json(isLogged)
      } else {
        const isLogged = { logged: true }
        req.session.user = username
        req.session.password = password
        res.json(isLogged)
      }
    }).clone()
})

router.post('/delete', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    req.session = null
    User.deleteOne({ username },
      (err, user) => {
        if (err) {
          res.send('user delete had a problem')
        } else {
          res.send('account successfully deleted')
        }
      })
  } catch (e) {
    res.send('user delete had a problem')
  }
})

module.exports = router
