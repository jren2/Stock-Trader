import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [passViewing, setPassViewing] = useState(false)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const togglePassword = () => {
    setPassViewing(!passViewing)
  }

  const login = async () => {
    await axios.post('http://localhost:3001/account/login', { username, password })
  }

  return (
    <>
      <div>
        <p><strong>Login</strong></p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control onChange={e => setPassword(e.target.value)} type={passViewing ? 'text' : 'password'} placeholder="Password" aria-describedby="basic-addon2" />
              <Button onClick={togglePassword} variant="outline-secondary" id="button-addon2">
                Toggle Password
              </Button>
            </InputGroup>
          </Form.Group>
          <Button onClick={login} variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </>
  )
}

export default Login
