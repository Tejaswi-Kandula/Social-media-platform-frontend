import './PostCard.css'
import { useState, useEffect } from 'react';
import boxIcon from 'boxicons'
import axios from 'axios';

function PostCard({ post }) {
  const { title, content, contentType, author ,likes,comments} = post;
  const avatarSrc = author.avatar;
  const [clicked, setClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes?.length||0);
  const [commentsCount, setCommentsCount] = useState(comments?.length||0);
  const [openedComments,setOpenedComments]=useState(false);
  const [comment,setComment]=useState("");
  const [loader,setLoader]=useState(false);
  useEffect(() => {
    setClicked(likes.some((user) => user._id === author._id));
    setLikeCount(likes.length);
    setCommentsCount(comments.length);
  }, [comments, likes, author._id]);

  const handleLike = async() => {
    await setClicked(prev=>!prev);
    if(clicked){
      await setLikeCount(prev=>prev - 1);
    }else{
      await setLikeCount(prev=>prev + 1);
    }
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/post/like/${post._id}`,{},{
      withCredentials:true
    });
  }

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/comment/${post._id}`, {comment}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(res.data.message==='Comment added successfully'){
        comments.unshift({user:author, text: comment, _id: res.data.comment._id});
        setComment("");
        setCommentsCount(prev=>prev+1);
      }
    } catch (err) {
      console.error(err);
    }finally{
      setLoader(false);
    }
  }

  return (
    <div className="post-card card">
      <div className="post-header">
        {avatarSrc ? <img className="avatar" src={avatarSrc} alt={author.username} /> : <div className="avatar" />}
        <div className="meta">
          <div className="name">{author?.username}</div>
          <div className="time">{/* time placeholder */}</div>
        </div>
      </div>

      <h3>{title}</h3>

      {contentType === "image" ? (
        <img className="post-image" src={content} alt={title} />
      ) : (
        <p>{content}</p>
      )}

      <div className="post-actions">
        <button onClick={() => handleLike()}>
          <box-icon name='like' className={clicked ? 'liked' : ''} type={clicked?"solid":"regular"} color="#6ee7b7"></box-icon> {likeCount}
        </button>
        <button onClick={() => setOpenedComments(!openedComments)}>
          <box-icon name='comment' color="#6ee7b7"></box-icon> {commentsCount}
        </button>
          {openedComments && (
            <>
            <div className="bg-window" onClick={() => setOpenedComments(false)}></div>
              <div className="comments-section">
                <div className="comments-cont">
                  {comments.map((comment,idx) => (
                    <div key={idx} className="comment" onClick={() => console.log(comment._id)}>
                      <img className="comment-avatar" src={comment.user.avatar} alt={comment.user.username} />
                      <div className="comment-author">{comment.user.username}</div>
                      <div className="comment-content">{comment.text}</div>
                    </div>
                  ))}
                </div>
                <form className="comment-form" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    className="comment-input" 
                    placeholder="Write a comment..." 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                  <button type="submit" className="comment-submit" disabled={loader}>
                    {loader ? <box-icon name='send' animation='fade-right'></box-icon> : <box-icon name='send' ></box-icon>}
                  </button>
                </form>
              </div>
          </>)}
      </div>
    </div>
  )
}

export default PostCard