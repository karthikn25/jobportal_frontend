import React, { useState } from "react";
import "./Forget.css";
import img from "../../../Images/jobsearch3.webp";
import logo from "../../../Images/JobSearchWebLogo.png";
import { URL } from "../../../Server";

export default function Forget() {

  const [email,setEmail]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();



  const handleForget = async(e)=>{
    e.preventDefault();

    const userData = {
      email
    }

    const res = await fetch(`${URL}/user/forget-password`,{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const data = await res.json();

    if(data.link){
      setSuccess("Email send Successfully")
      setError('')
      setTimeout(()=>{
        setEmail("")
        setSuccess("")
      },3000)
    }else{
      setError("Error Occured in Email send")

    }


  } 

  return (
    <div id="forget">
      <div className="row" id="forget-img-row">
        <div className="col">
          <div id="forget-img">
            <img src={img} alt="forget-img" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div id="forget-form">
            <div id="forget-logo">
              <img src={logo} alt="logo" />
              <p>JobWave</p>
            </div>
            <div id="forget-form-field">
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div id="forget-btn">
              <button onClick={handleForget}>Update</button>
            </div>
            {
              error ? <div id="error">{error}</div> : <div id="success">{success}</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
