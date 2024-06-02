import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiRobot3Fill } from "react-icons/ri";
import axios from "axios";
import Sheader from "./Sheader";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { FaTimesCircle } from "react-icons/fa";

const StudentProfile = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();
  const username = location.state?.id;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Create a function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    if (username) {
      fetchStudentData(username);
    } else {
      navigate("/");
    }
  }, [username, navigate]);

  const fetchStudentData = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/students/${username}`
      );

      const { data } = response;
      setStudentData(data);
    } catch (error) {
      console.log(error);
      setStudentData(null);
    }
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Sheader />
      {!sidebarVisible && (
        <GiHamburgerMenu
          size={30}
          onClick={toggleSidebar}
          className="sidebar-icon"
        />
      )}
      {sidebarVisible && (
        <div className="sidebar">
          <div className="Bot">
            <div className="close">
              <RiRobot3Fill size={22} className="icon" />
              <a
                href="https://mediafiles.botpress.cloud/a668b86e-15a7-4dc9-b989-dd4d0642e59a/webchat/bot.html"
                target="_blank"
                rel="noopener"
              >
                I'M UR AI
              </a>
            </div>
            <button className="close-btn" onClick={toggleSidebar}>
              <FaTimesCircle size={25} />
            </button>
          </div>
          <div className="buttons">
            <div className="inner">
              <a
                className="bnts"
                href={`https://www.linkedin.com/jobs/search/?currentJobId=3893335809&keywords=${studentData.data?.skill}%20developer&origin=JOBS_HOME_KEYWORD_AUTOCOMPLETE&refresh=true`}
                target="_blank"
              >
                Find Jobs
              </a>
              <Link
                to={{
                  pathname: `/RequestAdmin/${username}`,
                }}
              >
                <button className="bnts">UpDate New</button>
              </Link>
            </div>
            <Link to="/">
              <button className="bnts logout">Logout</button>
            </Link>
          </div>
        </div>
      )}

      <div className="profile-student">
        <h1 className="subheading">Student Profile</h1>
        <div className="proInfo-student">
          <p>
            <span>ID: </span>
            {studentData.data?.username}
          </p>
          <p>
            <span>Name: </span>
            {studentData.data?.name}
          </p>
          <p>
            <span>Email:</span> {studentData.data?.email}
          </p>
          <p>
            <span>Father name:</span>
            {studentData.data?.fatherName}
          </p>
          <p>
            <span>Phone:</span>
            {studentData.data?.phone}
          </p>

          <div className="project-student">
            <h3 className="subheading">Projects:</h3>
            {studentData.data?.projects ? (
              <ul>
                {studentData.data.projects.map((project) => (
                  <li key={project.projectName}>
                    <h4>
                      <span>Name:</span> {project.name}
                    </h4>
                    <p>
                      <span>Description:</span> {project.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <span>No projects found</span>
              </p>
            )}
          </div>

          <div className="experiance-student">
            <h3 className="subheading">Experience:</h3>
            {studentData.data?.experience ? (
              <ul>
                {studentData.data.experience.map((exp) => (
                  <li key={exp.name}>
                    <h4>
                      <span>Name: </span>
                      {exp.company}
                    </h4>
                    <p>
                      <span>Description:</span> {exp.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <span>No experience found</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
