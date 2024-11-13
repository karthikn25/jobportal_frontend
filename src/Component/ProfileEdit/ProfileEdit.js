import React, { useState } from "react";
import "./ProfileEdit.css";
import Base from "../../Base/Base";
import profile from '../../Images/PROFILE.jpg'
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";

export default function ProfileEdit() {

  const [formData,setFormData] =useState({
    name: '',
    location: '',
    position: '',
    experience: '',
    avatar: null,
  }) 


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({
        ...formData,
        avatar: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


   const [success,setSuccess]=useState();
   const [error,setError]=useState();

   const id = sessionStorage.getItem("id");

   const token = sessionStorage.getItem("token");


   const navigate = useNavigate();


   const handleUpdateUser=async(e)=>{
    e.preventDefault();

     const data = new FormData();
      data.append('name', formData.name);
      data.append('location', formData.location);
      data.append('position', formData.position);
      data.append('experience', formData.experience);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }
    const res = await fetch(`${URL}/user/edit/${id}`,{
      method:"PUT",
      body:data,
      
    })

    const data1  = await res.json();
console.log(data1);
    if(!data1.user){
      setError(data1.message)
      setSuccess("")
    }else{
      setError("")
      setSuccess(data1.message)
      

      setTimeout(()=>{
        navigate(`/home/${token}`)
      },3000)
    }

   }





  return (
    <Base>
      <div id="profile-edit">
        <div id="profile-edit-container">
          <div id="profile-edit-box">
            <div id="profile-edit-img">
              <img src={profile} alt="profile" />
            </div>
            <div id="upload-img">
            <input type="file" name="avatar"  onChange={handleChange}/>
            </div>
            <div id="profile-form">
              <div id="profile-form-field">
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}/>
                <input type="text" placeholder="Position" name="position" value={formData.position} onChange={handleChange}/>
              </div>
              <div id="profile-form-field">
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange}/>
                <select name="experiance" onChange={handleChange}>
                <option>Experiance</option>
                <option value={"Fresher"} name="experiance" onChange={handleChange}>Fresher</option>
                <option value={"0 to 3"} name="experiance" onChange={handleChange}>0 to 3</option>
                <option value={"3 to 6"} name="experiance" onChange={handleChange}>3 to 6</option>
                <option value={"6 to 9"} name="experiance" onChange={handleChange}>6 to 9</option>
                <option value={"above 9"} name="experiance" onChange={handleChange}>above 9</option>
                </select>
                
              </div>
            </div>
            <div id="profile-edit-btn">
              <button onClick={handleUpdateUser}>UPDATE</button>
            </div>
            {
              error ? <div id="error">{error}</div> : <div id="success">{success}</div>
            }
          </div>
        </div>
      </div>
    </Base>
  );
}
