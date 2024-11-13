import React, { useState } from "react";
import "./Signup.css";
import logo from "../../../Images/JobSearchWebLogo.png";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../Images/jobsearch1.webp";
import {URL} from '../../../Server.js'

export default function Signup() {
  const [show, setShow] = useState();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();

  const navigate = useNavigate();

  const toggle = () => setShow(!show);

  const handleSignup = async (e)=>{
   e.preventDefault();
    const userData = {
      name,
      email,
      password
    }

    var res = await fetch(`${URL}/user/signup`,{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await res.json();
    console.log(data);
    if(!data.token){
      setError(data.message)
      setSuccess("")
    }else{
      setError("");
      setSuccess(data.message);
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
  }

  return (
    <div id="signup">
      <div className="row" id="signup-row">
        <div className="col" id="signup-img">
          <img src={img} alt="signup-img" />
        </div>
      </div>
      <div className="row">
        <div className="col" id="signup-form-col">
          <div id="signup-logo">
            <img src={logo} alt="logo" />
            <p>JobWave</p>
          </div>
          <div id="signup-form-field">
            <input type="text" placeholder="Username" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div id="signup-form-field">
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div id="signup-form-field">
            <input type={!show ? "password" : "text"} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div id="signup-show">
            <input type="checkbox" onClick={toggle} />
            <p>Show</p>
          </div>
          <div id="signup-btn">
            <button onClick={handleSignup}>Signup</button>
          </div>
          <div id="signup-nav">
            <p>
              Already Have An Account?
              <Link to={"/"} id="signup-link">
                Login
              </Link>
            </p>
          </div>
          {
            error ? <div id="error">{error}</div> : <div id="success">{success}</div>
          }
        </div>
      </div>
    </div>
  );
}
