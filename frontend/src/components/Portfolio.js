/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Portfolio = () => {
  const [nameP, setName] = useState('')
  const [moneyP, setMoney] = useState(0)
  const [inventoryP, setInventory] = useState({})

  useEffect(() => {
    async function setUp() {
      // Set user name
      const { data } = await axios.post('http://localhost:3001/api/getUser')
      const name = data
      setName(name)

      // Set user money
      const money = await axios.post('api/getUserMoney', { username: name })
      setMoney(parseFloat(money.data.money).toFixed(2))

      // Set user inventory
      const inventory = await axios.post('api/tickers', { username: name })
      setInventory(inventory.data)
    }
    setUp()
  }, [])

  return (
    <div>
      <p><strong>{nameP}s portfolio:</strong></p>
      <p>
        Your remaining money: ${moneyP}
      </p>
      <p>
        Your stocks:
      </p>
      <ul>
        <li>Apple (AAPL): {inventoryP.AAPL}</li>
        <li>Amazon (AMZN): {inventoryP.AMZN}</li>
        <li>Microsoft (MSFT): {inventoryP.MSFT}</li>
        <li>Google (GOOG): {inventoryP.GOOG}</li>
        <li>Tesla (TSLA): {inventoryP.TSLA}</li>
        <li>Facebook (FB): {inventoryP.FB}</li>
        <li>JP Morgan Chase (JPM): {inventoryP.JPM}</li>
        <li>Qualcomm (QCOM): {inventoryP.QCOM}</li>
        <li>Netflix (NFLX): {inventoryP.NFLX}</li>
        <li>IBM (IBM): {inventoryP.IBM}</li>
        <li>Cisco (CSCO): {inventoryP.CSCO}</li>
        <li>Intel (INTC): {inventoryP.INTC}</li>
      </ul>
    </div>
  )
}

export default Portfolio
