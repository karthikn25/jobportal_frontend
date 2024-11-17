import React, { useState } from "react";
import "./JobPost.css";
import Base from "../../Base/Base";
import { useNavigate } from "react-router-dom";

export default function JobPost() {
  const [formData, setFormData] = useState({
    companyName: '',
    location: '',
    position: '',
    expLevel: '',
    jobtype: '',
    packages: '',
    questions: '' // We'll handle this as an array of strings (questions)
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostData = async (e) => {
    e.preventDefault();

    // Validate if all required fields are filled
    const requiredFields = ['companyName', 'location', 'position', 'expLevel', 'jobtype', 'packages'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field}`);
        return;
      }
    }

    // Proceed with the API call if validation passes
    const res = await fetch(`${process.env.REACT_APP_URL}/notes/create/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json", // Make sure the content type is set
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
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>
          <div id="post-form-field">
            <select name="jobtype" value={formData.jobtype} onChange={handleChange}>
              <option value="">Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
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
              name="questions"
              value={formData.questions} // Join the array items with newlines for better user experience
              onChange={handleChange}
            />
          </div>
          <div id="post-form-field">
            <select name="expLevel" value={formData.expLevel} onChange={handleChange}>
              <option value="">Experience Level</option>
              <option value="Fresher">Fresher</option>
              <option value="0-3 Years">0-3 Years</option>
              <option value="3-6 Years">3-6 Years</option>
              <option value="6-9 Years">6-9 Years</option>
              <option value="9 Years above">9+ Years</option>
            </select>
            <input
              type="text"
              placeholder="Salary Range"
              name="packages"
              value={formData.packages}
              onChange={handleChange}
            />
          </div>
          <div id="post-btn">
            <button onClick={handlePostData}>POST</button>
          </div>
          {error && (
            <div id="error" style={{ textAlign: "center" }}>{error}</div>
          )}
          {success && (
            <div id="success" style={{ textAlign: "center" }}>{success}</div>
          )}
        </div>
      </div>
    </Base>
  );
}
