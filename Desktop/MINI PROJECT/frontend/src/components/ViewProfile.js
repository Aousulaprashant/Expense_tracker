import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiRobot3Fill } from "react-icons/ri";
import axios from "axios";
import Sheader from "./Sheader";
import { Link } from "react-router-dom";

const ViewProfile = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();
  const username = location.state?.id;
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
            <span>Skill:</span> {studentData.data?.skill}
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

export default ViewProfile;
