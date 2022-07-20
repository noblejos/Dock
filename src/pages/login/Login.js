import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin.js'

// styles
import  './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login,error,isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className={'auth-form'}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
          // placeholder='Enter email'
        />
      </label>
      <label>
        <span>password:</span>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          label='password' 
          // placeholder='Enter password'
        />
      </label>
     
     {isPending?<button className="btn" disabled>Loading..</button>:
      <button className="btn">Login</button>}
        {error?<p>{error}</p>:""}
    </form>
  )
}

