import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
const Registration = () => {
  const [registerD, setregisterD] = useState({
    username: "",
    password: "",
    fatherName: "",
    phoneNumber: "",
    name: "",
    skill: "",
    rollNumber: "",
    projects: [{ name: "", description: "" }],
    experience: [{ company: "", role: "", duration: "" }],
  });

  const handleProjectsinput = (e, index, field) => {
    const { value } = e.target;

    // Update the state accordingly
    if (field === "name") {
      setregisterD((prevData) => ({
        ...prevData,
        projects: prevData.projects.map((project, i) =>
          i === index ? { ...project, name: value } : project
        ),
      }));
    } else if (field === "description") {
      setregisterD((prevData) => ({
        ...prevData,
        projects: prevData.projects.map((project, i) =>
          i === index ? { ...project, description: value } : project
        ),
      }));
    } else if (field === "company") {
      setregisterD((prevData) => ({
        ...prevData,
        experience: prevData.experience.map((exp, i) =>
          i === index ? { ...exp, company: value } : exp
        ),
      }));
    } else if (field === "role") {
      setregisterD((prevData) => ({
        ...prevData,
        experience: prevData.experience.map((exp, i) =>
          i === index ? { ...exp, role: value } : exp
        ),
      }));
    } else if (field === "duration") {
      setregisterD((prevData) => ({
        ...prevData,
        experience: prevData.experience.map((exp, i) =>
          i === index ? { ...exp, duration: value } : exp
        ),
      }));
    }
  };

  const handleRegisterinput = (e) => {
    const { name, value } = e.target;
    setregisterD((prevData) => ({
      ...prevData,
      [name]: value,
      projects: prevData.projects,
      experience: prevData.experience,
    }));
  };

  const handleAddProject = () => {
    setregisterD((prevData) => ({
      ...prevData,
      projects: [...prevData.projects, { name: "", description: "" }],
    }));
  };

  const handleAddExperience = () => {
    setregisterD((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { company: "", role: "", duration: "" },
      ],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(registerD);
    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        registerD
      );

      console.log(response);
      alert("Sucessfully added !!");
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setregisterD({
      username: "",
      password: "",
      fatherName: "",
      skill: "",
      phoneNumber: "",
      name: "",
      rollNumber: "",
      projects: [{ name: "", description: "" }],
      experience: [{ company: "", role: "", duration: "" }],
    });
  };

  return (
    <div className="main-div">
      <h1>Add New Student</h1>
      <Link to="/admin">
        <button className="return">
          <IoHomeSharp size={27} />
        </button>
      </Link>
      <div className="content-div">
        <form onSubmit={handleRegister}>
          <div className="input-Div">
            <label name="username">Roll Number:</label>
            <input
              type="text"
              name="username"
              placeholder="USER NAME..."
              value={registerD.username}
              onChange={handleRegisterinput}
            />
            <br />
            <label name="password">setpassword:</label>
            <input
              type="password"
              name="password"
              placeholder="password NAME..."
              value={registerD.password}
              onChange={handleRegisterinput}
            />
            <br />
            <label name="name">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="NAME..."
              value={registerD.name}
              onChange={handleRegisterinput}
            />
            <br />
            <label name="fatherName">Father name:</label>
            <input
              type="text"
              name="fatherName"
              placeholder="FATHER NAME..."
              value={registerD.fatherName}
              onChange={handleRegisterinput}
            />
            <br />
            <label name="phoneNumber">Phone number:</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="PHONE NUMBER..."
              value={registerD.phoneNumber}
              onChange={handleRegisterinput}
            />
            <label name="skill">Skill:</label>
            <input
              type="text"
              name="skill"
              placeholder="NAME..."
              value={registerD.skill}
              onChange={handleRegisterinput}
            />
            <br />
          </div>

          <hr style={{ borderTop: "1px solid #ccc", margin: "10px 0px" }}></hr>
          <h3>
            <label>Projects:</label>
          </h3>
          <br />
          {registerD.projects.map((project, index) => (
            <>
              <p>Name:</p>
              <input
                type="text"
                name={`projectName-${index}`}
                placeholder="PROJECT NAME..."
                value={project.name}
                onChange={(e) => handleProjectsinput(e, index, "name")}
              />

              <br />
              <p>Description</p>

              <input
                type="text"
                name={`projectDescription-${index}`}
                placeholder="PROJECT DESCRIPTION..."
                value={project.description}
                onChange={(e) => handleProjectsinput(e, index, "description")}
              />
              <hr
                style={{ borderTop: "1px solid #ccc", margin: "10px 0px" }}
              ></hr>
            </>
          ))}
          <button className="Add" type="button" onClick={handleAddProject}>
            Add Project
          </button>
          <br />
          <hr style={{ borderTop: "1px solid #ccc", margin: "10px 0px" }}></hr>
          <h3>
            <label>Experience:</label>
          </h3>
          {registerD.experience.map((experience, index) => (
            <div className="inputs">
              <p>Company :</p>
              <br />
              <input
                type="text"
                name={`company[${index}]`}
                placeholder="COMPANY NAME..."
                value={experience.company}
                onChange={(e) => handleProjectsinput(e, index, "company")}
              />
              <p>Roll :</p>
              <br />
              <input
                type="text"
                name={`role[${index}]`}
                placeholder="ROLE..."
                value={experience.role}
                onChange={(e) => handleProjectsinput(e, index, "role")}
              />
              <p>Duration :</p>
              <br />
              <input
                type="text"
                name={`duration[${index}]`}
                placeholder="DURATION..."
                value={experience.duration}
                onChange={(e) => handleProjectsinput(e, index, "duration")}
              />
              <hr
                style={{ borderTop: "1px solid #ccc", margin: "10px 0px" }}
              ></hr>
            </div>
          ))}
          <div className="buttons">
            <button className="Add" type="button" onClick={handleAddExperience}>
              Add Experience
            </button>

            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
