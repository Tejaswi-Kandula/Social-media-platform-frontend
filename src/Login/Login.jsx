import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css'
function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoader(true);
        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}`+'/api/user/login', { usernameOrEmail: username, password },{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            });
            if(res.data.message!='Logged in successfully'){
                setError(res.data.message)
            }else{
                setError(null);
                navigate('/profile');
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
                <h2>Login</h2>
                <p className="lead">Sign in to continue</p>
                <form onSubmit={handleSubmit}>
                    <div className="auth-fields">
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                      <button className="btn" type='submit'>{loader?"Loading...":"Login"}</button>
                    </div>
                </form>
                <p>Dont have an account? <a href="/register">Sign up</a></p>
            </div>
        </div>
    )
}

export default Login