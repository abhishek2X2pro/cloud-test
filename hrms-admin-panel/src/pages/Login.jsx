'use client';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'

export default function Login({ setAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    // Dummy authentication - in real app, call backend API
    // For demo: admin@example.com / admin = ADMIN role
    // For demo: super@example.com / admin = SUPER_ADMIN role
    
    if (email === 'admin@example.com' && password === 'admin') {
      const authData = { email, role: 'ADMIN', name: 'Admin User' }
      localStorage.setItem('auth', JSON.stringify(authData))
      setAuth(authData)
      navigate('/admin/dashboard')
    } else if (email === 'super@example.com' && password === 'admin') {
      const authData = { email, role: 'SUPER_ADMIN', name: 'Super Admin User' }
      localStorage.setItem('auth', JSON.stringify(authData))
      setAuth(authData)
      navigate('/super-admin/dashboard')
    } else {
      setError('Invalid credentials. Try admin@example.com or super@example.com (password: admin)')
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>RJIT BSF</h1>
          <p>HRMS Admin Panel</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p className="demo-text">
            <strong>Demo Credentials:</strong>
            <br />
            Admin: admin@example.com / admin
            <br />
            Super Admin: super@example.com / admin
          </p>
        </div>
      </div>
    </div>
  )
}
