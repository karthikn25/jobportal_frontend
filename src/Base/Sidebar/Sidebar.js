import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import profile from "../../Images/PROFILE.jpg";
import { URL } from "../../Server";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

const navigate = useNavigate();

const [user,setUser] =useState([]);

const [post,setPost]=useState([]);


const token = sessionStorage.getItem("token");

const id = sessionStorage.getItem("id");

  const handleLogout = ()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("id")
    navigate("/")
  }

  useEffect(()=>{
    handleShowUser();
    handlePost();
  })


  const handleShowUser = async(e)=>{
    const res = await fetch(`${URL}/user/getuser/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
     
    })
    const data = await res.json();
    setUser(data.user)

  }

  const handlePost = async()=>{
    const res = await fetch(`${URL}/notes/data`,{
      method:"GET",
      headers:{
        "x-auth-token":token
      }
    })
    const data = await res.json();
    setPost(data.length)
  
  }
  return (
    <div className="sidebar-container">
      <div id="sidebar-box">
        <div id="sidebar-details">
        
          <div id="sidebar-profile">
            <img src={ user.avatar ?? profile} alt="profile" />
          </div>
          <div id="sidebar-profile-detail">
            <h3>{ user.name ?? "Name"}</h3>
            <h5>{user.position ?? "ReactJs Developer"}</h5>
            <h5>{user.location ?? "Bangalore"}</h5>
          </div>
          <div id="sidebar-edit-btn">
            <button onClick={()=>navigate(`/profile/${token}`)}>Edit</button>
          </div>
          <div id="sidebar-post">
           <h6>POST : {post ? post : "0" }</h6>
          </div>
        </div>
        <div id="sidebar-logout" onClick={handleLogout}>
          <p>Logout</p>
          <i class="bx bx-log-out"></i>
        </div>
      </div>
    </div>
  );
}
