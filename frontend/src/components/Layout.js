/* eslint-disable react/jsx-one-expression-per-line */
import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Outlet, Link,
} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Layout = () => {
  const [logged, setLogged] = useState(false)
  const [person, setPerson] = useState('')

  useEffect(() => {
    const checkLogged = async () => {
      const loggedIn = await axios.post('/api/isLoggedIn')
      setLogged(loggedIn.data.result)
    }
    checkLogged()
  }, [])

  const logOut = async () => {
    await axios.post('/account/logout')
    setLogged(false)
  }

  const who = async () => {
    const user = await axios.post('api/getUser')
    setPerson(user.data)
  }

  who()

  return (
    <div>
      <Navbar fixed="top" bg="light" variant="light" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Paper Trading</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/features">Features</Nav.Link>
            {logged && (
              <>
                <Nav.Link as={Link} to="/trade">Trade</Nav.Link>
                <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
              </>
            )}
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {!logged && (
              <>
                <Navbar.Text>
                  <Nav.Link as={Link} to="/login">
                    Log in
                    <Button as={Link} to="/signup" className="mx-2" variant="outline-success">Sign up!</Button>
                  </Nav.Link>
                </Navbar.Text>
              </>
            )}
            {logged && (
              <>
                <Navbar.Text>
                  Signed in as: {person}
                </Navbar.Text>
                <Navbar.Text>
                  <Nav.Link as={Link} to="/" onClick={logOut}> Log out </Nav.Link>
                </Navbar.Text>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="m-5" />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Layout
