import * as React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import StockCard from './StockCard'

const Trade = () => {
  const day = 86400000
  const aaplLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/600px-Apple-logo.png?20200509031052/669px669'
  const amznLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2500px-Amazon_icon.svg.png'
  const msftLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png'
  const googLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png'
  const cscoLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1280px-Cisco_logo_blue_2016.svg.png'
  const metaLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png'
  const ibmLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png'
  const intcLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/1005px-Intel_logo_%282006-2020%29.svg.png'
  const jpmLink = 'https://logos-world.net/wp-content/uploads/2021/02/JP-Morgan-Chase-Symbol.png'
  const nflxLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1024px-Netflix_icon.svg.png'
  const qcomLink = 'https://1000logos.net/wp-content/uploads/2020/08/Qualcomm-Symbol.jpg'
  const tslaLink = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/800px-Tesla_T_symbol.svg.png'

  useEffect(() => {
    async function updatePrice(ticker) {
      const options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data',
        params: { symbol: ticker, region: 'US' },
        headers: {
          'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
          'X-RapidAPI-Key': 'f221475510msh8e05212f2549499p16e480jsn705b89e7410f',
        },
      }

      const r = await axios.request(options)
      const { data } = r
      const { prices } = data
      await axios.post(`http://localhost:3001/stock/updateResponse/${ticker}`, { response: prices })
    }

    async function dayCheck() {
      const date = await axios.post('http://localhost:3001/stock/getLastUpdated')

      if (date - Date.now() > day) {
        setTimeout(updatePrice('AAPL'), 5000)
        setTimeout(updatePrice('AMZN'), 5000)
        setTimeout(updatePrice('MSFT'), 5000)
        setTimeout(updatePrice('GOOG'), 5000)
        setTimeout(updatePrice('TSLA'), 5000)
        setTimeout(updatePrice('FB'), 5000)
        setTimeout(updatePrice('JPM'), 5000)
        setTimeout(updatePrice('QCOM'), 5000)
        setTimeout(updatePrice('NFLX'), 5000)
        setTimeout(updatePrice('IBM'), 5000)
        setTimeout(updatePrice('CSCO'), 5000)
        setTimeout(updatePrice('INTC'), 5000)
      }
    }
    dayCheck()
  })

  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="3">
            <StockCard ticker="AAPL" imglink={aaplLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="AMZN" imglink={amznLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="MSFT" imglink={msftLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="GOOG" imglink={googLink} />
          </Col>
        </Row>

        <Row className="justify-content-md-center my-4">
          <Col md="3">
            <StockCard ticker="TSLA" imglink={tslaLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="FB" imglink={metaLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="JPM" imglink={jpmLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="NFLX" imglink={nflxLink} />
          </Col>
        </Row>

        <Row className="justify-content-md-center my-4">
          <Col md="3">
            <StockCard ticker="IBM" imglink={ibmLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="QCOM" imglink={qcomLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="CSCO" imglink={cscoLink} />
          </Col>
          <Col md="3">
            <StockCard ticker="INTC" imglink={intcLink} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Trade
