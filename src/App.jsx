import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Signup from './SignUp/Signup'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import CreatePost from './CreatePosts/CreatePosts'
import PostList from './Posts/Posts'
import Nav from './Components/Nav/Nav'
function App() {
    return(
        <div className="app-container">
            <Nav />
            <Routes>
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/" element={<PostList />} />
            </Routes>
        </div>
    );
}

export default App
