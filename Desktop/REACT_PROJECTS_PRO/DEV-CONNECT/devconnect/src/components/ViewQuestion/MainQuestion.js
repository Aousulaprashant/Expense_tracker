import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import ReactQuill from "react-quill";
import paser from "html-react-parser";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/UserSlice";

const MainQuestion = (question) => {
  const [click, setclick] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  console.log("hi from here:", user);
  const [answers, setanswers] = useState([]);

  // console.log("hay i am here:", question.question?._id);

  const [ansbody, setansbody] = useState("");

  const tagsString = question.question?.tags?.[0]; // Extract the string safely

  let tagsArray = []; // Initialize as an empty array

  if (tagsString) {
    try {
      tagsArray = JSON.parse(tagsString); // Convert string to an array
      console.log("Parsed Tags:", tagsArray); // Check if it's correctly parsed
    } catch (error) {
      console.error("Error parsing tags:", error);
    }
  }

  useEffect(() => {
    try {
      const fun = async () => {
        const res = await axios.get(
          `https://dev-connect-mern-stack.onrender.com/api/question/${question.question?._id}`
        );
        if (res.status === 200) {
          setanswers(res.data.answers);
        } else {
          console.log("no answers yet");
        }
      };

      fun();
    } catch (err) {
      console.log(err);
    }
  }, [question.question?._id, answers]);

  const handleSubmit = () => {
    try {
      const data = {
        question_id: question.question?._id,
        answer: ansbody,
        user: question.question?.user,
      };
      console.log(data);
      const fun = async () => {
        const response = await axios.post(
          "https://dev-connect-mern-stack.onrender.com/api/answer/",
          data
        );

        if (response.status === 201) {
          console.log("Answer Added");
          setansbody("");
          // setanswers((prevAnswers) => [...prevAnswers, response.data]);
        }
      };
      fun();
    } catch (er) {
      console.log(er);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["clean"], // Remove formatting
    ],
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{question?.question.title}</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
          {/* <a href="/add-question">
        <button>Ask Question</button>
      </a> */}
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>11-12-25</span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>
              </div>
            </div>
            <div className="question-answer">
              <div>
                {typeof question.question?.body === "string"
                  ? paser(question.question.body)
                  : "No content available"}
              </div>

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

              <div className="author">
                <small>
                  {new Date(question?.question.created_at).toLocaleDateString(
                    "en-CA"
                  )}
                </small>

                <div className="auth-details">
                  {question.question.user.photoURL ? (
                    <>
                      <img src={question.question.user.photoURL} />
                    </>
                  ) : (
                    <RiAccountCircleFill />
                  )}
                  <p>{question?.question.user?.displayName}</p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {question?.question.user?.displayName}
                </div>
                <p onClick={() => setclick(!click)}>Add a comment</p>

                {click ? (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            21 Answers
          </p>
          <>
            <div
              style={{
                borderBottom: "1px solid #eee",
              }}
              className="all-questions-container"
            >
              <div className="question-answer">
                {answers.length > 0 ? (
                  answers.map((ans, index) => (
                    <div
                      key={index}
                      style={{
                        borderBottom: "1px solid #eee",
                        padding: "10px 0",
                      }}
                      className="all-questions-container"
                    >
                      <div className="all-questions-left">
                        <div className="all-options">
                          <p className="arrow">▲</p>
                          <p className="arrow">0</p>
                          <p className="arrow">▼</p>
                        </div>
                      </div>

                      <div className="question-answer">
                        <div>{paser(ans.answer)}</div>
                        <div className="author">
                          <small>
                            answered on{" "}
                            {new Date(ans.created_at).toLocaleDateString(
                              "en-CA"
                            )}
                          </small>
                          <div className="auth-details">
                            {question.question.user.photoURL ? (
                              <>
                                <img src={question.question.user.photoURL} />
                              </>
                            ) : (
                              <RiAccountCircleFill />
                            )}

                            <p>{ans.user?.displayName || "Anonymous"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No answers yet. Be the first to answer!</p>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value={ansbody}
          onChange={(value) => {
            setansbody(value);
          }}
          modules={modules}
          theme="snow"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>
  );
};

export default MainQuestion;
