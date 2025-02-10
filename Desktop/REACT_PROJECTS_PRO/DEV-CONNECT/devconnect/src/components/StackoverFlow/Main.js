import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import Allquestions from "./Allquestions";
import "./css/main.css";
import axios from "axios";
const Main = () => {
  const [allquestion, setallquestion] = useState([]);

  useEffect(() => {
    try {
      const fun = async () => {
        const response = await axios.get(
          "https://dev-connect-mern-stack.onrender.com/api/question/"
        );
        if (response.status === 200) {
          console.log(response);
          setallquestion(response.data);
          console.log(allquestion);
        } else {
          console.log("error 400");
        }
      };
      fun();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc">
          <p>10 questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <a href="/">Newest</a> */}
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>

                {/* <a href="/">Active</a> */}
              </div>
              <div className="main-tab">
                {/* <a href="/">More</a> */}
                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <IoFilter />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          <div className="question">
            {allquestion.map((q, index) => (
              <div>
                <Allquestions quetion={q} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
