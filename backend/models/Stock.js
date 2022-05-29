const mongoose = require('mongoose')

const { Schema, model } = mongoose

const stockSchema = new Schema({
  name: String,
  response: [Object],
  lastUpdated: Date,
})

const Stock = model('Stock', stockSchema)

module.exports = Stock
