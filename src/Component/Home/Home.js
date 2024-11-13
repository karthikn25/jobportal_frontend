import React, { useEffect, useState } from "react";
import "./Home.css";
import Base from "../../Base/Base";
import profile from "../../Images/PROFILE.jpg";
import { useNavigate } from "react-router-dom";
import { URL } from "../../Server";

export default function Home() {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  const [product,setProduct]=useState([]);

  const id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
    const getPostData = async () => {
      const res = await fetch(`${URL}/notes/getall/${id}`, {
        method: "GET",
        headers: {
          "x-auth-token": token,
        },
      });
      const data = await res.json();
      setPost(data);
      setProduct(post.notes);
    };
      getPostData();
    
  });
  
  return (
    <Base>
      <div id="home">
        <div id="home-box-container">
        
        { 
           post.notes ? product && product.map((item,idx)=>(
            <div id="home-box" key={idx}>
            <div id="home-box-top">
              <img src={item.user ? item.user.avatar :  profile} alt="profile" />
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
          )):<></>
        }
           
         
   { /*      {" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Company Name</h5>
              <p>Position</p>
              <div id="job-type">
                <p>Sallery</p>
                <p>Location</p>
              </div>
            </div>
          </div>{" "}
          <div id="home-box">
            <div id="home-box-top">
              <img src={profile} alt="profile" />
              <h5>Name</h5>
            </div>
            <hr />
            <div id="job-detail" onClick={() => navigate("/detail")}>
              <h5>Infosis</h5>
              <p>ReactJs Developer</p>
              <div id="job-type">
                <p>4LPA</p>
                <p>Chennai</p>
              </div>
            </div>
      </div>*/}
        </div>
      </div>
    </Base>
  );
}
