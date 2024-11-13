import React, { useState } from "react";
import "./JobPost.css";
import Base from "../../Base/Base";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../Server";

export default function JobPost() {


  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    position: '',
    expLevel: '',
    jobtype: '',
    packages: '',
    questions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const {token} = useParams();

  const navigate = useNavigate();

  const handlePostData = async(e) => {
    e.preventDefault();


    const res = await fetch(`${URL}/notes/create`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type":"application/json",
        "x-auth-token": token,
      },
    });
    const data = await res.json();
    console.log(data);
    if (!data.notes) {
      setError(data.message);
      setSuccess("");
    } else {
      setSuccess(data.message);
      setError("");
      setTimeout(() => {
        navigate(`/home/${token}`);
      }, 2000);
    }
  };

  return (
    <Base>
      <div id="jobpost">
        <div id="jobpost-form">
          <div id="post-form-field">
            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Job Position"
              value={formData.position}
              name="position"
              onChange={handleChange}
            />
          </div>
          <div id="post-form-field">
           <select onChange={handleChange} name="jobtype">
           <option >JobType</option>           
           <option  value={"Full Time"} onChange={handleChange} >Full Time</option>           
           <option  value={"Part Time"} onChange={handleChange} >Part Time</option> 
           <option  value={"Internship"} onChange={handleChange}>Internship</option>          
           <option  value={"Freelance"} onChange={handleChange} >Freelance</option>           
           </select>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div id="job-questions">
          
            <textarea
              placeholder="Asked Question?"
              value={formData.questions}
              name="questions"
              onChange={handleChange}
      ></textarea>
          </div>
          <div id="post-form-field">
          <select onChange={handleChange} name="expLevel">
           <option>Exp Level</option>           
           <option value={"Fresher"}>Fresher</option>           
           <option value={"0-3 Years"}>0-3 Years</option> 
           <option value={"3-6 Years"}>3-6 Years</option>          
           <option value={"6-9 Years"}>6-9 Years</option>           
           <option value={"9 Years above"}>9 Years above</option>           
           </select>
            <input
              type="text"
              placeholder="Sallery Range"
              value={formData.packages}
              name="packages"
              onChange={handleChange}
            />
          </div>
          <div id="post-btn">
            <button onClick={handlePostData}>POST</button>
          </div>
          {error ? (
            <div id="error" style={{textAlign:"center"}}>{error}</div>
          ) : (
            <div id="success" style={{textAlign:"center"}}>{success}</div>
          )}
        </div>
      </div>
    </Base>
  );
}
