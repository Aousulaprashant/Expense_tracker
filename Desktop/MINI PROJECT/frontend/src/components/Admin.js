import React from "react";
import Sheader from "./Sheader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { FaEdit, FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";

const Admin = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/students");
      const { data } = response;
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (student) => {
    // handle edit functionality here
    const username = student.username;
    navigate("/EditStudent", { state: { id: username } });
  };

  const handleViewProfile = (student) => {
    // handle view profile functionality here
    // when this function calls it should redirect to studentProfile.js sending username
    const username = student.username;
    navigate("/viewProfile", { state: { id: username } });
  };

  const handleDeleteProfile = async (student) => {
    // handle delete profile functionality here
    const response = await axios.delete(
      `http://localhost:8000/students/${student.username}`
    );

    if (response.status === 200) {
      alert("Deleted sucessfully !! ");
      window.location.reload();
    } else {
      alert("Failed to Delete !");
    }
  };

  return (
    <div className="Admin-main">
      <Sheader />
      <div className="AdminContainer">
        <div className="Home">
          <h3>Home</h3>
        </div>
        <div className="AdminDiv">
          <Link className="AdminAddnew" to="/register">
            <IoPersonAdd /> Add New
          </Link>
          <br />
        </div>
        <div className="AdminDiv">
          <Link className="AdminAddnew" to="/UpdateRequests">
            <MdNotificationAdd size={20} />
            Requests
          </Link>
        </div>
      </div>
      <h1>Students</h1>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name !== "laxmanbabu" && student.username}</td>
                <td>{student.name !== "laxmanbabu" && student.name}</td>
                <td>
                  <div className="btns-div">
                    <button
                      className="edit"
                      onClick={() => handleEdit(student)}
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      className="view"
                      onClick={() => handleViewProfile(student)}
                    >
                      <FaRegEye size={16} />
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDeleteProfile(student)}
                    >
                      <MdDelete size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
