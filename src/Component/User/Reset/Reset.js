import React, { useState } from "react";
import "./Reset.css";
import img from "../../../Images/jobsearch4.jpg";
import logo from "../../../Images/JobSearchWebLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../../Server";

export default function Reset() {

  const [show, setShow] = useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword]=useState();
  const [error,setError]=useState();
  const [success,setSuccess]=useState();

  const {id,token}=useParams();

  const navigate = useNavigate();
  

  const handleReset = async(e)=>{
    e.preventDefault();
    if(!password || !confirmPassword){
      setError("All credentials are Required")
      setSuccess("")
    }if(password!==confirmPassword){
      setError("Password doesn't match");
      setSuccess("")
    }else{
      const res = await fetch(`${URL}/user/reset/${id}/${token}`,{
        method:"PUT",
        body:JSON.stringify({password}),
        headers:{
          "Content-Type":"application/json"
        }
      })
      const data = await res.json() ;
      if(!data.user){
        setError(data.message)
        setSuccess("")
      }else{
        setSuccess(data.message)
        setTimeout(()=>{
          navigate("/")
        },2000)
      }
    }
  }

  const toggle = () => setShow(!show);

  return (
    <div id="reset">
      <div className="row">
        <div className="col-6" id="reset-img-col">
          <img src={img} alt="reset" />
        </div>
        <div className="col-6" id="reset-form-col">
          <div id="reset-logo">
            <img src={logo} alt="logo" />
            <p>JobWave</p>
          </div>
          <div id="reset-form">
            <div id="reset-form-field">
              <input
                type={!show ? "password" : " text"}
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            <div id="reset-show">
              <input type="checkbox" onClick={toggle} />
              <p>Show</p>
            </div>
            <div id="reset-form-field">
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </div>
            <div id="reset-btn">
              <button onClick={handleReset}>Change</button>
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
