import React, { useEffect, useState } from "react";
import "./JobDetail.css";
import Base from "../../Base/Base";
import { useParams } from "react-router-dom";
import { URL } from "../../Server";

export default function JobDetail() {
const {id}=useParams();

const [notes,setNotes]=useState();

const token = sessionStorage.getItem("token");


  useEffect(()=>{
    const getData = async()=>{
      const res = await fetch(`${URL}/notes/getsingle/${id}`,{
        method:"GET",
        headers:{
          "x-auth-token":token
        }
      })
      const data = await res.json();
      setNotes(data.notes);
    }
    getData()
  })
  return (
    <Base>
      <div id="job-detail-container">

    
          <div>
          <div id="company-name-date">
              <h4>{notes ? notes.companyName : "CompanyName"}</h4>
              <p>{notes ? notes.date : "Date"}</p>
            </div>
            <div id="more-details">
              <h6>
                <i class="bx bx-briefcase">{notes ? notes.position : "Position"}</i>
              </h6>
              <h6>
                <i class="bx bx-map">{notes ? notes.location : "location"}</i>
              </h6>
              <div id="job-more">
                <h6>{notes ? notes.jobtype : "JobType"}</h6>
                <h6>{notes ? notes.explvl : "Experiance Level"}</h6>
                <h6>{notes ? notes.packages : "Sallery"}</h6>
              </div>
            </div>
            <div id="job-detail-asked-questions">
              <h2>Asked Questions?</h2>
              {
                notes ? notes.questions && notes.questions.map((items,idx)=>(
                  <ul key={idx}>
                  <li>{items}</li>
                  </ul>
                )):<></>
              }
              
            </div>
          </div>
       
     
        
      </div>
    </Base>
  );
}
