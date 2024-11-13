import React, { useState } from "react";
import "./Signin.css";
import img from "../../../Images/JobSearchWebLogo.png";
import { Link, useNavigate } from "react-router-dom";
import {URL} from '../../../Server.js' 

export default function Signin() {
  const [show,setShow]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();


  const navigate = useNavigate();

  const toggle = ()=>setShow(!show);

  var handleLogin = async (e)=>{
    e.preventDefault();
    
    const userData = {
      email,
      password
    }
    const res = await fetch(`${URL}/user/login`,{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        'Content-Type':"application/json"
      }
    })
    const data = await res.json();
    console.log(data);
    if(!data.token){
       setError(data.message)
       setSuccess("")
    }else{
      setError("")
      setSuccess(data.message);
      sessionStorage.setItem("token",data.token)
      sessionStorage.setItem("id",data.user._id)
      setTimeout(()=>{
        navigate(`/home/${data.token}`)
      },2000)
    }
  }

  return (
    <div id="signin" className="container">
      <div className="row">
        <div className="col-6" id="signin-form-col">
          <div id="signin-form">
            <div id="signin-logo">
              <img src={img} alt="logo" />
            </div>
            <div id="signin-form-field">
              <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div id="signin-form-field">
              <input type={!show ? "password" : "text"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div id="signin-show">
              <input type="checkbox" onClick={toggle}/>
              <p>Show</p>
            </div>
            <div id="signin-btn">
              <button onClick={handleLogin}>Signin</button>
            </div>
            <div id="signin-nav">
              <Link to={"/forget"} id="signin-link">ForgetPassword?</Link>
              <p>
                Don't Have An Account?<Link to={"/register"} id="signin-link">Signup</Link>
              </p>
            </div>
            {
              error ? <div id="error">{error}</div> : <div id="success">{success}</div>
            }
          </div>
        </div>
        <div className="col-6" id="signin-img"></div>
      </div>
    </div>
  );
}
