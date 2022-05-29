const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  username: String,
  password: String,
  money: Number,
  inventory: {
    AAPL: Number,
    AMZN: Number,
    CSCO: Number,
    FB: Number,
    GOOG: Number,
    IBM: Number,
    INTC: Number,
    JPM: Number,
    MSFT: Number,
    NFLX: Number,
    QCOM: Number,
    TSLA: Number,
  },
})

const User = model('User', userSchema)

module.exports = User
