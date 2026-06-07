import axios from 'axios';
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './CreatePosts.css'

function CreatePosts() {
  const [contentType,setContentType]=useState("text");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [preview,setPreview]=useState(null);
  const [error,setError]=useState(false);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(contentType==="image"){
        const formData =new FormData();
        formData.append("media", file);
        formData.append("title", title);
        
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/image`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          console.log(res.data);
          if(res.data.message==='Post Added'){
            navigate('/');
          }
        } catch (err) {
          if(err.response.data.message=="No token, access denied!" || err.response.data.message=='Invalid token!'){
            navigate('/login');
          }
          setError(err.response.data.message || "An error occurred while uploading the image.");
          console.error(err);
        }
    }else{
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/text`, {title, content: text}, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log(res.data);
          if(res.data.message==='Post Added'){
            navigate('/');
          }
        } catch (err) {
          if(err.response.data.message=="No token, access denied!" || err.response.data.message=='Invalid token!'){
            navigate('/login');
          }
          setError(err.response.data.message || "An error occurred while creating the post.");
          console.error(err);
        }
    }
  };

  const handleChange = async(e)=>{
        const file=e.target.files[0]
        if (file) {
            setError("")
            setPreview(URL.createObjectURL(file));
        }
        setFile(file)
    }

  return (
    <div className="create-posts card">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="title input-cont">
          <label>Title:</label>
          <input type="text" name="title" required onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="input-cont">
          <label>Content Type:</label>
          <select name="contentType" required onChange={(e) => setContentType(e.target.value)}>
            <option value="text">Text</option>
            <option value="image">Image</option>
          </select>
        </div>
        <div className="content-input">
          <label>Content:</label>
          {contentType === 'image' ? <input type="file" name="content" accept="image/*" required onChange={handleChange} /> :
          <textarea name="content" required onChange={(e) => setText(e.target.value)}></textarea>}
        </div>
        {preview && <img src={preview} alt="Preview" />}
        {error && <p style={{color:"salmon"}}>{error}</p>}
        <div className="actions">
          <button className="btn" type="submit">Create Post</button>
        </div>
      </form>
    </div>
  )
}

export default CreatePosts