import React, { useState } from "react";
import "./Topbar.css";
import logo from "../../Images/JobSearchWebLogo.png";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  const [keyword,setKeyword]=useState();
  
  const token = sessionStorage.getItem("token")

  const handleSearch = async(e)=>{
    e.preventDefault();
    navigate(`/search/${keyword}`) 
  }
  
 return (
    <div id="topbar-container">
      <div id="topbar-box">
        <ul id="topbar-details">
          <li id="topbar-logo">
            <img src={logo} alt="logo" />
          </li>
          <li id="topbar-search">
            <input type="text" placeholder="Search" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/><i class='bx bx-search-alt-2' onClick={handleSearch}></i>
          </li>
          <li id="topbar-nav" onClick={()=>navigate(`/home/${token}`)}>Home</li>
          <li id="topbar-nav" onClick={()=>navigate(`/post/${token}`)}>JobPost</li>
          <li id="mobile-menu"><i class='bx bx-menu' onClick={()=>navigate(`/menu/${token}`)}></i></li>
        </ul>
      </div>
    </div>
  );
}
