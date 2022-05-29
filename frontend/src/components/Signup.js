import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Route, Link } from 'react-router-dom'

const Signup = () => {
  const [passViewing, setPassViewing] = useState(false)
  const [confViewing, setConfViewing] = useState(false)
  const [message, setMessage] = useState('')
  const [pass, setPass] = useState('')
  const [username, setUsername] = useState('')
  const [conPass, setConPass] = useState('')

  const togglePassword = () => {
    setPassViewing(!passViewing)
  }

  const toggleConfirm = () => {
    setConfViewing(!confViewing)
  }

  const createUser = async () => {
    await axios.post('http://localhost:3001/account/signup', { username, password: pass })
  }

  return (
    <>
      <div>
        <p><strong>Account Registration</strong></p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
            <Form.Text className="text-muted">
              This is who you will be recognized as!
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPlaintextPasswords">
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control onChange={e => setPass(e.target.value)} type={passViewing ? 'text' : 'password'} placeholder="Password" aria-describedby="basic-addon2" />
              <Button onClick={togglePassword} variant="outline-secondary" id="button-addon3">
                Toggle Password
              </Button>
            </InputGroup>
          </Form.Group>

          <Button as={Link} to="/login" variant="primary" type="submit" onClick={createUser}>
            Sign up
          </Button>
          <p>
            {passViewing}
          </p>
        </Form>
      </div>

    </>
  )
}

export default Signup
