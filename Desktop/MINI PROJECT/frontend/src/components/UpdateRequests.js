import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateRequests = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/feedbacks");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      alert("Request deleted successfully!");
    } catch (error) {
      console.error("Error deleting request:", error);
    }

    window.location.reload();
  };

  return (
    <div className="updateMain">
      <h2>Update Requests:</h2>
      <table className="table">
        <thead className="table-header">
          <tr>
            <th>Username</th>
            <th>Feedback</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {feedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.username}</td>
              <td>{feedback.feedback}</td>
              <td>
                <button onClick={() => handleDelete(feedback.username)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateRequests;
