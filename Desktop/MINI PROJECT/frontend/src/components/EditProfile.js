import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Sheader from "./Sheader";

const EditProfile = () => {
  const location = useLocation();
  const [studentData, setStudentData] = useState({});
  const navigate = useNavigate();
  const username = location.state?.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:8000/students/${username}`
      );

      const data = response.data;

      setStudentData(data);
      console.log(data.data.experience);
      setName(data.name);
      setEmail(data.email);
      setFatherName(data.fatherName);
      setPhone(data.phone);
      setProjects(data.data.projects);

      setExperiences(data.data.experience);
    };

    fetchData();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phone, setPhone] = useState("");
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: name,
        email: email,
        fatherName: fatherName,
        phone: phone,
        projects: projects,
        experiences: experiences,
      };
      const response = await axios.put(
        `http://localhost:8000/students/${username}`,
        data
      );

      console.log(response);
      if (response.status === 200) {
        alert("Data updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProject = () => {
    setProjects([...projects, { name: "", description: "" }]);
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { company: "", description: "" }]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  const handleProjectChange = (index, e) => {
    const newProjects = [...projects];
    newProjects[index][e.target.name] = e.target.value;
    setProjects(newProjects);
  };

  const handleExperienceChange = (index, e) => {
    const newExperiences = [...experiences];
    newExperiences[index][e.target.name] = e.target.value;
    setExperiences(newExperiences);
  };

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Sheader />

      <div className="edit-student-container">
        <h1 className="edit-student-header">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="edit-student-form">
          <p>ID: {username}</p>
          <label>
            Name:
            <input
              type="text"
              defaultValue={studentData.data?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <br />

          <label>
            Email:
            <input
              type="email"
              defaultValue={studentData.data?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />

          <label>
            Father name:
            <input
              type="text"
              defaultValue={studentData.data?.fatherName}
              onChange={(e) => setFatherName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="number"
              defaultValue={studentData.data?.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <h3 className="edit-student-section-title">Projects:</h3>

          {projects &&
            projects.map((project, index) => (
              <div key={index}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, e)}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, e)}
                  />
                </label>
                <button
                  type="button"
                  className="button"
                  onClick={() => handleRemoveProject(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          <button type="button" className="button" onClick={handleAddProject}>
            Add Project
          </button>

          <h3 className="edit-student-section-title">Experience:</h3>
          {experiences &&
            experiences.map((experience, index) => (
              <div key={index}>
                <label>
                  Company:
                  <input
                    type="text"
                    name="company"
                    value={experience.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="description"
                    value={experience.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                  />
                </label>
                <button
                  type="button"
                  className="button"
                  onClick={() => handleRemoveExperience(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          <button
            type="button"
            className="button"
            onClick={handleAddExperience}
          >
            Add Experience
          </button>

          <div className="edit-student-buttons">
            <button type="submit" className="edit-student-button">
              Save Changes
            </button>
            <Link to={`/view/${username}`}>
              <button type="button" className="edit-student-button">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
