import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Nav.css'


function Nav() {
  const navigate = useNavigate();
  return (
    <>
        <nav className="nav-container">
            <div className="logo" onClick={() => navigate('/')}>SocialApp</div>
            <div className="nav-links">
                <button onClick={() => navigate('/profile')}>Profile</button>
                <button onClick={() => navigate('/create-post')}>Create Post</button>
            </div>
        </nav>
    </>
  )
}

export default Nav