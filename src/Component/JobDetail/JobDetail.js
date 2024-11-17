import React, { useEffect, useState } from "react";
import "./JobDetail.css";
import Base from "../../Base/Base";
import { useParams } from "react-router-dom";

export default function JobDetail() {
  const { id } = useParams();
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any error

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        // If token doesn't exist, handle it
        if (!token) {
          setError("Token is missing");
          setLoading(false);
          return;
        }

        const res = await fetch(`${process.env.REACT_APP_URL}/notes/getsingle/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,  // Ensure the token is sent in headers
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        console.log(data);
        if (data && data.notes) {
          setNotes(data.notes);
        } else {
          setError("No data found for this job");
        }
      } catch (err) {
        setError(err.message);  // Capture any error that occurred during fetch
      } finally {
        setLoading(false);  // Ensure loading is false when done
      }
    };

    getData();
  }, [id, token]);  // Only re-run when `id` or `token` changes

  if (loading) {
    return <Base>Loading...</Base>;  // Show loading message while fetching
  }

  if (error) {
    return <Base>Error: {error}</Base>;  // Show error message if any
  }

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
              <i className="bx bx-briefcase">{notes ? notes.position : "Position"}</i>
            </h6>
            <h6>
              <i className="bx bx-map">{notes ? notes.location : "Location"}</i>
            </h6>
            <div id="job-more">
              <h6>{notes ? notes.jobtype : "Job Type"}</h6>
              <h6>{notes ? notes.explvl : "Experience Level"}</h6>
              <h6>{notes ? notes.packages : "Salary"}</h6>
            </div>
          </div>
          <div id="job-detail-asked-questions">
            <h2>Asked Questions?</h2>
            {
              notes && notes.questions && notes.questions.length > 0 ? (
                <ul>
                  {notes.questions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>No questions available</p>
              )
            }
          </div>
        </div>
      </div>
    </Base>
  );
}
