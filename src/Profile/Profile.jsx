import {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Profile.css'

function Profile() {

  const [userDetails, setUserDetails] = useState(null);
  const [loader,setLoader]=useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
          withCredentials: true
        });
        if(res.data.message!=='User details retrieved successfully'){
          navigate('/login');
        }else{
          setUserDetails(res.data.userDetails);
        }
      } catch (err) {
        navigate('/login');
      } finally {
        setLoader(false);
      }
    };

    fetchProfile();
  }, []);


  const handleLogout = async() => {
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`, {}, {
      withCredentials: true
    });
    setUserDetails(null);
    navigate('/login');
  }

  return (
    <div>
      <h2>Profile</h2>
      {loader && <p>Loading...</p>}
      {userDetails && (
        <div>
          <div className="profile-header card">
            <img className="avatar" src={userDetails.profileImage || userDetails.avatar || ''} alt={userDetails.username} />
            <div className="info">
              <h2>{userDetails.username}</h2>
            </div>
          </div>
          <div style={{marginTop:12}}>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <div className="profile-actions">
              <button className="btn" onClick={() => navigate('/create-post')}>Create Post</button>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile