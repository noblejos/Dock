import { Link } from 'react-router-dom'

// styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { useLogout } from '../hooks/useLogout'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


export default function Navbar() {
  const {logout,isPending} = useLogout()
  const {user} = useContext(AuthContext)
  
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>Dock</span>
        </li>

      {!user &&  (
        <>
      <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        </>
        )}
       
       {user && <li>
          {!isPending?<button className="btn" onClick={logout}>Logout</button>:
          <button className="btn" disabled>Loging out...</button>}
          </li>}
      </ul>
    </nav>
  )
}
