import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import profile from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [post, setPost] = useState(0);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      handleShowUser();
      handlePost();
    }
  }, [id]); // Only re-run the effect when `id` changes

  const handleShowUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/user/getuser/${id}`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUser(data.user); // Set user data from the API response
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePost = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL}/notes/data/${id}`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        // Assuming the API returns an array of posts, we count the length of the array
        setPost(data.length); // Set the number of posts
      } else {
        console.error("Failed to fetch posts data");
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  };

  return (
    <div className="sidebar-container">
      <div id="sidebar-box">
        <div id="sidebar-details">
          <div id="sidebar-profile">
            {/* Display the user's avatar, or the default one if avatar is not available */}
            <img src={user.avatar || profile} alt="profile" />
          </div>
          <div id="sidebar-profile-detail">
            {/* Display user name, position, and location */}
            <h3>{user.name || "Name"}</h3>
            <h5>{user.position || "ReactJs Developer"}</h5>
            <h5>{user.location || "Bangalore"}</h5>
          </div>
          <div id="sidebar-edit-btn">
            {/* Navigate to the user's profile edit page */}
            <button onClick={() => navigate(`/profile/${token}`)}>Edit</button>
          </div>
          <div id="sidebar-post">
            {/* Display the number of posts */}
            <h6>POST: {post || "0"}</h6>
          </div>
        </div>
        <div id="sidebar-logout" onClick={handleLogout}>
          <p>Logout</p>
          <i className="bx bx-log-out"></i>
        </div>
      </div>
    </div>
  );
}
