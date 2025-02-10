import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import "./css/Allques.css";
const Allquestions = (q) => {
  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate("/view-page", { state: { question: q.quetion } });
  };
  //console.log("from", q.quetion);

  function truncat(str) {
    if (!str) return ""; // Ensure str is not undefined
    return str.length > 40 ? str.substring(0, 40) + "..." : str;
  }

  const tagsString = q.quetion?.tags?.[0]; // Extract the string safely

  let tagsArray = [];
  if (tagsString) {
    try {
      tagsArray = JSON.parse(tagsString); // Convert string to an array
    } catch (error) {
      console.error("Error parsing tags:", error);
    }
  }

  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>11</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>2 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer" onClick={handleClick}>
          <Link to="/view-page">{q.quetion.title}</Link>

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{parse(truncat(q.quetion?.body || ""))}</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {tagsArray.map((_tag, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#e0f2f1",
                    color: "#00796b",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                    display: "inline-block", // Ensures it doesn't stretch full width
                  }}
                >
                  {_tag}
                </span>
              ))}
            </div>
          </div>
          <div className="author">
            <small>
              {q.quetion.user.email ? (
                <>{q.quetion.user.email}</>
              ) : (
                <>unknown@gmail</>
              )}
            </small>
            <div className="auth-details">
              {q.quetion.user.photoURL ? (
                <>
                  <img src={q.quetion.user.photoURL} />
                </>
              ) : (
                <RiAccountCircleFill />
              )}

              <p>
                {q.quetion.user.displayName ? (
                  <>{q.quetion.user.displayName}</>
                ) : (
                  <>unknown</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allquestions;
