import * as React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Home = () => (
  <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/photos/digitally-enhanced-shot-of-a-graph-showing-the-ups-and-downs-shares-picture-id1322201350?b=1&k=20&m=1322201350&s=170667a&w=0&h=Cp62gZiaccwtTOwzFsdUnvyDq8JC91WMloyqfjtTx-U="
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt7VE-jxNf-AVBOdxV_59rszHxjAROmeIAmvkVQAs4gMAkcmu34bIuWTagjMKyU63Zk-Y&usqp=CAU"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.theindianwire.com/wp-content/uploads/2020/06/Investing-During-COVID19.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>
)

export default Home
