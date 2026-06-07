import {useState} from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import './Signup.css'
function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoader(true);
    const formData={
      username,
      email,
      password
    }
    try{
      const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/user/register', formData,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials: true
      });

      if(res.data.message!=='User registered successfully'){
        setError(res.data.message)
      }else{
        setError(null);
        navigate('/login');
      }
    }catch(err){
      setError(err.response.data.message);
    }finally{
      setLoader(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h2>Create account</h2>
        <p className="lead">Join the community</p>
        <form onSubmit={handleSubmit}>
          <div className="auth-fields">

          <input 
            type="text" 
            placeholder='Username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <input 
            type="email" 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{color:'salmon'}}>{error}</p>}
          <div className="auth-actions">
            <button className="btn" type='submit' disabled={loader}>
              {loader ? 'Loading...' : 'Signup'}
            </button>
          </div>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  )
}

export default Signup