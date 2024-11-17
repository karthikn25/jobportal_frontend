import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import profile from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]); // Changed to an array to hold all posts
  const [product, setProduct] = useState([]); // Added a state for products if necessary

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // Redirect to login if there's no token
  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Fetch post data when the component is mounted
  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_URL}/notes/getall/${id}`, {
          method: "GET",
          headers: {
            "x-auth-token": token,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch posts data");
        }
  
        const data = await res.json();
        console.log("Fetched data:", data);  // Log the data to check the structure
        setPost(data); // Assuming `data` is the full list of posts
        setProduct(data.notes || []); // Ensure that `data.notes` is the correct structure
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
  
    if (id && token) {
      getPostData();
    }
  }, [id, token]);  // Run the effect only when `id` or `token` changes
  
  return (
    <Base>
      <div id="home">
        <div id="home-box-container">
          {/* Map through posts if they are available */}
          {product.length > 0 ? (
            product.map((item, idx) => (
              <div id="home-box" key={idx}>
                <div id="home-box-top">
                  <img src={item.user ? item.user.avatar : profile} alt="profile" />
                  <h5>{item.user ? item.user.name : "Name"}</h5>
                </div>
                <hr />
                <div id="job-detail" onClick={() => navigate(`/detail/${item._id}`)}>
                  <h5>{item.companyName}</h5>
                  <p>{item.position}</p>
                  <div id="job-type">
                    <p>{item.packages}</p>
                    <p>{item.location}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </div>
    </Base>
  );
}
