import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const RequestAdmin = () => {
  const { username } = useParams();

  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSendFeedback = async () => {
    if (!feedback.trim()) {
      return;
    }

    setSending(true);

    try {
      const response = await axios.post("http://localhost:8000/api/feedback", {
        username,
        feedback,
      });

      if (response.status === 200) {
        alert("Sucessfully Sent !!");
        setSent(true);
        setFeedback("");
      } else {
        console.error("Error sending feedback:", response);
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="main-request">
      <h2 className="head">Changes You Wish to Do !</h2>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter your messege..."
        rows={5}
      />
      <button onClick={handleSendFeedback} disabled={sending}>
        {sending ? "Sending..." : "Send Request"}
      </button>
      {sent && <p>Request sent successfully!</p>}
    </div>
  );
};

export default RequestAdmin;
