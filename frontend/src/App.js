import * as React from 'react'
import {
  Routes, Route, Outlet, Link,
} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Dashboard from './components/Dashboard'
import Trade from './components/Trade'
import Portfolio from './components/Portfolio'
import Login from './components/Login'
import Signup from './components/Signup'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<About />} />
          <Route path="trade" element={<Trade />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
