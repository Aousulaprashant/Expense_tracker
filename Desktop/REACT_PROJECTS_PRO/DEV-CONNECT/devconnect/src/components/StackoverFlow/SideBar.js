import React from "react";
import { Link } from "react-router-dom";
import "./css/SideBar.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { LiaStarSolid } from "react-icons/lia";
import { RiSuitcaseFill } from "react-icons/ri";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/">Home</Link>

            {/* <a href="/">Home</a> */}
          </div>
          <div className="sidebar-option">
            <p>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
                <FaGlobeAmericas color="rgb(245, 162, 9)" />
                <Link to="/">Question</Link>

                {/* <a href="/">Question</a> */}
              </div>

              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>COLLECTIVES</p>
            <div className="link">
              <div className="link-tag">
                <LiaStarSolid color="rgb(239, 159, 40)" />
                <Link to="/">Explore Collectives</Link>

                {/* <a href="/">Explore Collectives</a> */}
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <p>FIND A JOB</p>
            <div className="link">
              <Link
                style={{
                  margin: "10px 20px",
                }}
                to="/"
              >
                Jobs
              </Link>
              {/* <a
            style={{
              margin: "10px 20px",
            }}
            href="/"
          >
            Jobs
          </a> */}
              {/* <a
            style={{
              marginLeft: "20px",
            }}
            href="/"
          >
            Companies
          </a> */}
              <Link
                style={{
                  marginLeft: "20px",
                }}
                to="/"
              >
                Companies
              </Link>
            </div>
          </div>
          <div className="sidebar-option">
            <p>TEAMS</p>
            <div className="link-tag">
              <RiSuitcaseFill color="rgb(239, 159, 40)" />
              <Link to="/">Companies</Link>
              {/* <a href="/">Companies</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
