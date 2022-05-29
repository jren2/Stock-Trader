/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prefer-destructuring */
import * as React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const StockCard = ({ ticker, imglink }) => {
  const [amount, setAmount] = useState(0)
  const [bShow, setBShow] = useState(false)
  const [sShow, setSShow] = useState(false)
  const [share, setShare] = useState()
  const [day, setDay] = useState()
  const [five, setFive] = useState()
  const [month, setMonth] = useState()
  const [showPrices, setShowPrices] = useState(true)

  useEffect(() => {
    async function setUp() {
      const response = await axios.post(`http://localhost:3001/stock/getResponse/${ticker}`)
      setShare(response.data[0].open)
      setDay(response.data[0].close - response.data[1].close)
      setFive(response.data[0].close - response.data[4].open)
      setMonth(response.data[0].close - response.data[30].open)
    }
    setUp()
  }, [])

  const toggleBuy = () => {
    setAmount(0)
    setSShow(false)
    setBShow(!bShow)
  }

  const toggleSell = () => {
    setAmount(0)
    setBShow(false)
    setSShow(!sShow)
  }

  const incrementAmount = () => {
    setAmount(amount + 1)
  }

  const decrementAmount = () => {
    if (amount > 0) {
      setAmount(amount - 1)
    }
  }

  const buyClick = async () => {
    const price = share
    let user = await axios.post('http://localhost:3001/api/getUser')
    user = user.data
    let money = await axios.post('http://localhost:3001/api/getUserMoney')
    money = money.data.money

    if (money >= price * amount) {
      setBShow(false)
      await axios.post(`/api/tickers/buy/${ticker}`, { amount, username: user, price })
      setAmount(0)
    } else {
      alert('You dont have enough money!')
    }
  }

  const sellClick = async () => {
    const price = share
    let name = await axios.post('/api/getUser')
    name = name.data
    let numberOfTicker = await axios.post(`/api/tickers/get/${ticker}`, { username: name })
    numberOfTicker = numberOfTicker.data.amount
    if (numberOfTicker >= amount) {
      setSShow(false)
      await axios.post(`/api/tickers/sell/${ticker}`, { amount, username: name, price })
      setAmount(0)
    } else {
      alert('You dont have enough of that ticker!')
    }
  }

  return (
    <>
      <Card className="shadow-sm rounded" style={{ width: '18rem' }}>
        <Card.Img variant="top" style={{ width: '18rem', height: '18rem' }} src={`${imglink}`} />
        <Card.Body>
          <Card.Title className="text-center">{ticker}</Card.Title>
          {showPrices
            && (
              <>
                <Card.Text>
                  1 Share Price:
                  {
                    share >= 0 && (
                      <div className="text-success d-inline">&nbsp; ${parseFloat(share).toFixed(2)}</div>
                    )
                  }
                  {
                    share < 0 && (
                      <div className="text-danger d-inline">&nbsp; ${parseFloat(share).toFixed(2)}</div>
                    )
                  }
                </Card.Text>
                <Card.Text>
                  1 Day +/-:
                  {
                    day >= 0 && (
                      <div className="text-success d-inline">&nbsp; +{parseFloat(day).toFixed(2)}</div>
                    )
                  }
                  {
                    day < 0 && (
                      <div className="text-danger d-inline">&nbsp; {parseFloat(day).toFixed(2)}</div>
                    )
                  }
                </Card.Text>
                <Card.Text>
                  5 Day +/-:
                  {
                    five >= 0 && (
                      <div className="text-success d-inline">&nbsp; +{parseFloat(five).toFixed(2)}</div>
                    )
                  }
                  {
                    five < 0 && (
                      <div className="text-danger d-inline">&nbsp; {parseFloat(five).toFixed(2)}</div>
                    )
                  }
                </Card.Text>
                <Card.Text>
                  1 Month +/-:
                  {
                    month >= 0 && (
                      <div className="text-success d-inline">&nbsp;+{parseFloat(month).toFixed(2)}</div>
                    )
                  }
                  {
                    month < 0 && (
                      <div className="text-danger d-inline">&nbsp;{parseFloat(month).toFixed(2)}</div>
                    )
                  }
                </Card.Text>
              </>
            )}
          <ButtonToolbar className="justify-content-center">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="success" onClick={toggleBuy}>Buy</Button>
            </ButtonGroup>
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button variant="danger" onClick={toggleSell}>Sell</Button>
            </ButtonGroup>
          </ButtonToolbar>
          {bShow && (
            <>
              <InputGroup className="my-3 justify-content-center text-center">
                <Button variant="outline-info" onClick={incrementAmount}>+1</Button>
                <Button variant="outline-danger" onClick={decrementAmount}>-1</Button>
                <Form.Label column sm="2">
                  {amount}
                </Form.Label>
                <Button variant="outline-success" onClick={buyClick} id="button-addon1">
                  Confirm
                </Button>
              </InputGroup>
            </>
          )}

          {sShow && (
            <>
              <InputGroup className="my-3 justify-content-center text-center">
                <Button variant="outline-info" onClick={incrementAmount}>+1</Button>
                <Button variant="outline-danger" onClick={decrementAmount}>-1</Button>
                <Form.Label column sm="2">
                  {amount}
                </Form.Label>
                <Button variant="outline-danger" id="button-addon1" onClick={sellClick}>
                  Confirm
                </Button>
              </InputGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

export default StockCard
