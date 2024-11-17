import React, { useState } from "react";
import "./Signup.css";
import logo from "../../../Images/JobSearchWebLogo.png";
import { Link, useNavigate } from "react-router-dom";
import img from "../../../Images/jobsearch1.webp";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // To store OTP input
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to switch to OTP form
  const [isVerified, setIsVerified] = useState(false); // To check if OTP is verified

  const navigate = useNavigate();

  // Toggle password visibility
  const toggle = () => setShow(!show);

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // Prepare user data
    const userData = {
      name,
      email,
      password
    };

    try {
      // Send request to backend for signup
      const response = await fetch(`${process.env.REACT_APP_URL}/user/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.msg === "OTP sent to email") {
        // If OTP is sent successfully
        setSuccess(data.msg);
        setIsOtpSent(true); // Switch to OTP verification form
        setError("");
      } else {
        setError(data.msg);
        setSuccess("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (e) => {
    e.preventDefault();

    const otpData = {
      email,
      otp
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/user/verify-otp`, {
        method: "POST",
        body: JSON.stringify(otpData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.token) {
        setIsVerified(true);
        setSuccess("OTP verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/"); // Redirect to login page after successful OTP verification
        }, 2000);
      } else {
        setError(data.message);
        setSuccess("");
      }
    } catch (err) {
      setError("OTP verification failed. Please try again.");
      setSuccess("");
    }
  };

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

          {/* Signup Form (Initial Form) */}
          {!isOtpSent && !isVerified && (
            <>
              <div id="signup-form-field">
                <input
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div id="signup-form-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="signup-form-field">
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div id="signup-show">
                <input type="checkbox" onClick={toggle} />
                <p>Show</p>
              </div>
              <div id="signup-btn">
                <button onClick={handleSignup}>Signup</button>
              </div>
            </>
          )}

          {/* OTP Verification Form */}
          {isOtpSent && !isVerified && (
            <>
              <div id="signup-form-field">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  disabled // Disable email input after OTP is sent
                />
              </div>
              <div id="signup-form-field">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div id="signup-btn">
                <button onClick={handleOtpVerification}>Verify OTP</button>
              </div>
            </>
          )}

          {/* Navigation Link */}
          <div id="signup-nav">
            <p>
              Already Have An Account? 
              <Link to={"/"} id="signup-link">
                Login
              </Link>
            </p>
          </div>

          {/* Error and Success Messages */}
          {error && <div id="error">{error}</div>}
          {success && <div id="success">{success}</div>}
        </div>
      </div>
    </div>
  );
}
