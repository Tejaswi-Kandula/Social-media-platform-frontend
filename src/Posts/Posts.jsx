import {useState,useEffect} from 'react'
import axios from 'axios'
import PostCard from '../Components/PostCard/PostCard.jsx';
import './Posts.css'
import { useNavigate } from 'react-router-dom';
function Posts() {
  
  const [posts, setPosts] = useState([]);
  const [loader,setLoader]=useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post`, {
          withCredentials: true
        });
        setPosts(res.data.posts);
        console.log(res.data);
      } catch (err) {
        if(err.response.data.message=="No token, access denied!" || err.response.data.message=='Invalid token!'){
          navigate('/login');
        }
        console.error(err);
      }finally{
        setLoader(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {loader ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => (
          console.log(post),
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  )
}

export default Posts